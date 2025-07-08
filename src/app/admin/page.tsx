
"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DollarSign, Package, Activity } from "lucide-react";
import { listenForAllOrders } from "@/lib/orders";
import { listenForProducts } from "@/lib/products";
import type { Order, Product } from "@/lib/types";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

const chartData = [
  { month: "January", sales: 186 },
  { month: "February", sales: 305 },
  { month: "March", sales: 237 },
  { month: "April", sales: 173 },
  { month: "May", sales: 209 },
  { month: "June", sales: 214 },
]

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
          <CardDescription>A look at your sales over the past few months.</CardDescription>
        </CardHeader>
        <CardContent>
           <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
            <BarChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar dataKey="sales" fill="var(--color-sales)" radius={8} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
