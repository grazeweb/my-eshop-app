import { notFound } from 'next/navigation';
import { orders } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { Progress } from '@/components/ui/progress';

export default function OrderDetailsPage({ params }: { params: { id: string } }) {
  const order = orders.find((o) => o.id === params.id);

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

  return (
    <div className="container mx-auto px-4 py-12">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
            <div>
              <CardTitle className="text-2xl font-headline">Order Details</CardTitle>
              <p className="text-muted-foreground mt-1">Order ID: {order.id}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Order Placed</p>
              <p className="font-medium">{order.date}</p>
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
                      <Image src={item.product.image} alt={item.product.name} fill style={{objectFit:'cover'}} data-ai-hint="product image"/>
                    </div>
                    <div className="flex-grow">
                      <p className="font-medium">{item.product.name}</p>
                      <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-medium">${(item.product.price * item.quantity).toFixed(2)}</p>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Shipping Address</h3>
                <div className="text-sm text-muted-foreground">
                  <p>John Doe</p>
                  <p>123 Main St</p>
                  <p>Anytown, USA 12345</p>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Order Summary</h3>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${order.total.toFixed(2)}</span>
                  </div>
                   <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>$5.00</span>
                  </div>
                  <Separator className="my-2"/>
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>${(order.total + 5.00).toFixed(2)}</span>
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
