
"use client";

import { useEffect, useState } from 'react';
import { useParams, notFound } from 'next/navigation';
import { getOrderById } from '@/lib/orders';
import type { Order } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { Progress } from '@/components/ui/progress';
import { Loader2 } from 'lucide-react';
import { format } from 'date-fns';

export default function OrderDetailsPage() {
  const params = useParams<{ id: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      getOrderById(params.id)
        .then(orderData => {
          if (orderData) {
            setOrder(orderData);
          } else {
            // This will trigger notFound() outside of the promise chain
            setOrder(null);
          }
        })
        .finally(() => setLoading(false));
    }
  }, [params.id]);

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

  const getStatusStep = (status: string) => {
    switch (status) {
      case 'Processing': return 25;
      case 'Shipped': return 66;
      case 'Delivered': return 100;
      default: return 0;
    }
  };
  
  const shippingFee = 5.00; // Assuming a fixed shipping fee as in checkout

  return (
    <div className="container mx-auto px-4 py-12">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
            <div>
              <CardTitle className="text-2xl font-headline">Order Details</CardTitle>
              <p className="text-muted-foreground mt-1">Order ID: #{order.id.slice(0, 6)}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Order Placed</p>
              <p className="font-medium">{order.createdAt ? format(order.createdAt.toDate(), 'MMMM d, yyyy') : 'N/A'}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-8">
            <h3 className="font-semibold mb-4">Order Status: <Badge>{order.status}</Badge></h3>
            <div className="relative">
              <Progress value={getStatusStep(order.status)} className="h-2" />
              <div className="grid grid-cols-4 mt-2 text-xs text-center text-muted-foreground">
                <span>Ordered</span>
                <span>Processing</span>
                <span>Shipped</span>
                <span>Delivered</span>
              </div>
            </div>
          </div>
          
          <Separator className="my-8" />
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <h3 className="text-lg font-semibold mb-4">Items in this Order</h3>
              <ul className="space-y-4">
                {order.items.map((item, index) => (
                  <li key={index} className="flex items-center gap-4">
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden border">
                      <Image src={item.image} alt={item.name} fill style={{objectFit:'cover'}} data-ai-hint="product image"/>
                    </div>
                    <div className="flex-grow">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Shipping Address</h3>
                <div className="text-sm text-muted-foreground">
                  <p>{order.shippingAddress.firstName} {order.shippingAddress.lastName}</p>
                  <p>{order.shippingAddress.address}</p>
                  <p>{order.shippingAddress.city}, {order.shippingAddress.zip}</p>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Order Summary</h3>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${(order.totalAmount - shippingFee).toFixed(2)}</span>
                  </div>
                   <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>${shippingFee.toFixed(2)}</span>
                  </div>
                  <Separator className="my-2"/>
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>${order.totalAmount.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
