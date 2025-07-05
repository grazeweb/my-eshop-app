
"use client";

import { useEffect, useState } from 'react';
import { useParams, notFound, useRouter } from 'next/navigation';
import { getOrderById, updateOrderStatus } from '@/lib/orders';
import type { Order } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { Loader2, ArrowLeft, User, MapPin } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function AdminOrderDetailsPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { toast } = useToast();

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [statusUpdating, setStatusUpdating] = useState(false);

  useEffect(() => {
    if (params.id) {
      getOrderById(params.id as string)
        .then(orderData => {
          if (orderData) {
            setOrder(orderData);
          } else {
            setOrder(null);
          }
        })
        .finally(() => setLoading(false));
    }
  }, [params.id]);

  const handleStatusChange = async (newStatus: Order['status']) => {
    if (!order) return;
    setStatusUpdating(true);
    try {
        await updateOrderStatus(order.id, newStatus);
        setOrder(prev => prev ? { ...prev, status: newStatus } : null);
        toast({ title: "Order status updated successfully!" });
    } catch (error) {
        console.error("Failed to update status:", error);
        toast({ variant: "destructive", title: "Failed to update status" });
    } finally {
        setStatusUpdating(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-16 w-16 animate-spin" />
      </div>
    );
  }

  if (!order) {
    notFound();
  }

  const orderStatusOptions: Order['status'][] = ['Processing', 'Shipped', 'Delivered', 'Cancelled'];

  return (
    <div className="space-y-6">
        <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => router.back()}>
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Back</span>
            </Button>
            <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                Order Details
            </h1>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="grid auto-rows-max items-start gap-4 lg:col-span-2">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle>Order #{order.id.slice(0, 6)}</CardTitle>
                            <CardDescription>
                                Date: {order.createdAt ? format(order.createdAt.toDate(), 'MMMM d, yyyy') : 'N/A'}
                            </CardDescription>
                        </div>
                        <div className="flex items-center gap-2">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button size="sm" variant="outline" className="h-8 gap-1" disabled={statusUpdating}>
                                        <span>Status: {order.status}</span>
                                        {statusUpdating && <Loader2 className="h-4 w-4 animate-spin" />}
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    {orderStatusOptions.map(status => (
                                        <DropdownMenuItem key={status} onClick={() => handleStatusChange(status)} disabled={order.status === status}>
                                            {status}
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                <TableHead>Product</TableHead>
                                <TableHead>Quantity</TableHead>
                                <TableHead className="text-right">Price</TableHead>
                                <TableHead className="text-right">Total</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {order.items.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell>
                                        <div className="font-medium">{item.name}</div>
                                    </TableCell>
                                    <TableCell>{item.quantity}</TableCell>
                                    <TableCell className="text-right">${item.price.toFixed(2)}</TableCell>
                                    <TableCell className="text-right">${(item.price * item.quantity).toFixed(2)}</TableCell>
                                </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
            <div className="grid auto-rows-max items-start gap-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Customer Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-start gap-3">
                            <User className="h-5 w-5 text-muted-foreground mt-1" />
                            <div>
                                <p className="font-medium">{order.customerName}</p>
                                <p className="text-sm text-muted-foreground">{order.customerEmail}</p>
                            </div>
                        </div>
                         <div className="flex items-start gap-3">
                            <MapPin className="h-5 w-5 text-muted-foreground mt-1" />
                            <div>
                                <p className="font-medium">Shipping Address</p>
                                <address className="text-sm text-muted-foreground not-italic">
                                    {order.shippingAddress.address}<br />
                                    {order.shippingAddress.city}, {order.shippingAddress.zip}
                                </address>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    </div>
  );
}
