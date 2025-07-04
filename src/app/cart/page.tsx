import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Minus, Plus, Trash2 } from 'lucide-react';

const cartItems = [
  { productId: '1', quantity: 1 },
  { productId: '5', quantity: 2 },
];
import { products } from '@/lib/data';

export default function CartPage() {
  const items = cartItems.map(item => {
    const product = products.find(p => p.id === item.productId);
    return { ...product, quantity: item.quantity };
  });

  const subtotal = items.reduce((acc, item) => acc + (item.price ?? 0) * item.quantity, 0);
  const shipping = 5.00;
  const total = subtotal + shipping;

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold font-headline mb-8 text-center">Your Shopping Cart</h1>
      <div className="grid md:grid-cols-3 gap-12">
        <div className="md:col-span-2">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-2/4">Product</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {items.map((item) => (
                    item.id && (
                    <TableRow key={item.id}>
                      <TableCell>
                        <div className="flex items-center gap-4">
                          <div className="relative h-16 w-16 rounded-md overflow-hidden">
                             <Image src={item.image ?? ''} alt={item.name ?? ''} fill style={{objectFit: 'cover'}} data-ai-hint="product image" />
                          </div>
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <Button variant="ghost" size="sm" className="text-muted-foreground p-0 h-auto hover:bg-transparent hover:text-destructive">
                                <Trash2 className="h-4 w-4 mr-1"/> Remove
                            </Button>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>${item.price?.toFixed(2)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="icon" className="h-8 w-8"><Minus className="h-4 w-4"/></Button>
                          <Input type="number" value={item.quantity} className="w-14 h-8 text-center" readOnly />
                          <Button variant="outline" size="icon" className="h-8 w-8"><Plus className="h-4 w-4"/></Button>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">${(item.price ?? 0 * item.quantity).toFixed(2)}</TableCell>
                    </TableRow>
                    )
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild size="lg" className="w-full">
                <Link href="/checkout">Proceed to Checkout</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
