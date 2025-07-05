
"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { useCart } from '@/contexts/cart-context';
import { useAuth } from '@/contexts/auth-context';
import { createOrder } from '@/lib/orders';
import { useToast } from '@/hooks/use-toast';
import type { ShippingAddress } from '@/lib/types';
import { Loader2 } from 'lucide-react';

export default function CheckoutPage() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    zip: '',
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setShippingAddress(prev => ({ ...prev, [id]: value }));
  };

  const shippingFee = 5.00;
  const totalAmount = cartTotal + shippingFee;

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast({ variant: 'destructive', title: 'Please login to place an order.' });
      router.push('/login');
      return;
    }

    if (cartItems.length === 0) {
      toast({ variant: 'destructive', title: 'Your cart is empty.' });
      return;
    }

    // Basic validation
    if (Object.values(shippingAddress).some(field => field.trim() === '')) {
      toast({ variant: 'destructive', title: 'Please fill out all shipping fields.' });
      return;
    }

    setLoading(true);
    try {
      await createOrder({
        userId: user.uid,
        items: cartItems.map(item => ({...item, shippingFee: 0})),
        totalAmount,
        shippingAddress,
        paymentMethod: 'Cash on Delivery',
      });
      toast({ title: 'Order placed successfully!', description: 'Thank you for your purchase.' });
      clearCart();
      router.push('/account/orders');
    } catch (error) {
      console.error('Failed to place order:', error);
      toast({ variant: 'destructive', title: 'Failed to place order', description: 'Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold font-headline mb-8 text-center">Checkout</h1>
      {cartItems.length > 0 ? (
        <form onSubmit={handlePlaceOrder} className="grid md:grid-cols-3 gap-12">
          <div className="md:col-span-2 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">1. Shipping Information</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" placeholder="John" value={shippingAddress.firstName} onChange={handleInputChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" placeholder="Doe" value={shippingAddress.lastName} onChange={handleInputChange} required />
                </div>
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" placeholder="123 Main St" value={shippingAddress.address} onChange={handleInputChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" placeholder="Anytown" value={shippingAddress.city} onChange={handleInputChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zip">ZIP Code</Label>
                  <Input id="zip" placeholder="12345" value={shippingAddress.zip} onChange={handleInputChange} required />
                </div>
              </CardContent>
            </Card>
             <Card>
              <CardHeader>
                <CardTitle className="text-xl">2. Payment Method</CardTitle>
              </CardHeader>
              <CardContent>
                 <div className="p-4 border rounded-md bg-muted">
                    <p className="font-medium">Cash on Delivery</p>
                    <p className="text-sm text-muted-foreground">Pay with cash upon delivery of your order.</p>
                 </div>
              </CardContent>
            </Card>
          </div>
          <div className="md:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {cartItems.map(item => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>{item.quantity}x {item.name}</span> 
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <div className="border-t my-2"></div>
                <div className="flex justify-between text-sm"><span>Subtotal</span> <span>${cartTotal.toFixed(2)}</span></div>
                <div className="flex justify-between text-sm text-muted-foreground"><span>Shipping</span> <span>${shippingFee.toFixed(2)}</span></div>
                <div className="border-t my-2"></div>
                <div className="flex justify-between font-bold text-lg"><span>Total</span> <span>${totalAmount.toFixed(2)}</span></div>
              </CardContent>
              <CardFooter>
                <Button type="submit" size="lg" className="w-full" disabled={loading}>
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Place Order
                </Button>
              </CardFooter>
            </Card>
          </div>
        </form>
      ) : (
        <div className="text-center">
            <p>Your cart is empty. <Link href="/products" className="text-primary underline">Go shopping</Link>.</p>
        </div>
      )}
    </div>
  );
}
