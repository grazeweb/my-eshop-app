
"use client";

import { useState, useEffect, useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DollarSign, Package, Activity, BarChart as BarChartIcon } from "lucide-react";
import { listenForAllOrders } from "@/lib/orders";
import { listenForProducts } from "@/lib/products";
import type { Order, Product } from "@/lib/types";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { format, getMonth } from 'date-fns';

const chartConfig = {
  sales: {
    label: "Sales",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export default function AdminDashboard() {
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [deliveredOrderCount, setDeliveredOrderCount] = useState(0);
  const [productCount, setProductCount] = useState(0);
  const [chartData, setChartData] = useState<{ month: string, sales: number }[]>([]);

  useEffect(() => {
    const unsubscribeOrders = listenForAllOrders(
      (orders: Order[]) => {
        const deliveredOrders = orders.filter(
          (order) => order.status === "Delivered"
        );
        const revenue = deliveredOrders.reduce(
          (acc, order) => acc + order.totalAmount,
          0
        );
        setTotalRevenue(revenue);
        setDeliveredOrderCount(deliveredOrders.length);

        // Process data for the chart
        const monthlySales = deliveredOrders.reduce((acc, order) => {
          if (order.createdAt) {
            const date = order.createdAt.toDate();
            const monthName = format(date, 'MMM');
            const year = date.getFullYear();
            const key = `${year}-${monthName}`;
            
            acc[key] = (acc[key] || 0) + order.totalAmount;
          }
          return acc;
        }, {} as Record<string, number>);

        const allMonths = Array.from({ length: 12 }, (_, i) => format(new Date(0, i), 'MMM'));
        
        const formattedChartData = allMonths.map(monthName => {
            const currentYear = new Date().getFullYear();
            const key = `${currentYear}-${monthName}`;
            return {
                month: monthName,
                sales: monthlySales[key] || 0,
            };
        });

        setChartData(formattedChartData);
      },
      (error) => {
        console.error("Error fetching orders:", error);
      }
    );

    const unsubscribeProducts = listenForProducts(
      (products: Product[]) => {
        setProductCount(products.length);
      },
      (error) => {
        console.error("Error fetching products:", error);
      }
    );

    return () => {
      unsubscribeOrders();
      unsubscribeProducts();
    };
  }, []);

  const hasSalesData = useMemo(() => chartData.some(d => d.sales > 0), [chartData]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-2 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Revenue
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              Based on {deliveredOrderCount} delivered orders
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Products
            </CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{productCount}</div>
            <p className="text-xs text-muted-foreground">
              Total products in store
            </p>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Sales Overview</CardTitle>
          <CardDescription>Your sales performance for the current year.</CardDescription>
        </CardHeader>
        <CardContent>
            {hasSalesData ? (
                <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
                    <BarChart accessibilityLayer data={chartData}>
                    <CartesianGrid vertical={false} />
                    <XAxis
                        dataKey="month"
                        tickLine={false}
                        tickMargin={10}
                        axisLine={false}
                    />
                    <YAxis
                        tickLine={false}
                        axisLine={false}
                        tickMargin={10}
                        tickFormatter={(value) => `$${value}`}
                    />
                    <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent formatter={(value) => `$${(value as number).toFixed(2)}`} />}
                    />
                    <Bar dataKey="sales" fill="var(--color-sales)" radius={8} />
                    </BarChart>
                </ChartContainer>
            ) : (
                <div className="flex flex-col items-center justify-center text-center p-12 border border-dashed rounded-lg min-h-[250px]">
                    <BarChartIcon className="w-12 h-12 text-muted-foreground" />
                    <h3 className="text-xl font-semibold mt-4">No Sales Data Yet</h3>
                    <p className="text-muted-foreground mt-1">As soon as you get delivered orders, your sales chart will appear here.</p>
                </div>
            )}
        </CardContent>
      </Card>
    </div>
  );
}
