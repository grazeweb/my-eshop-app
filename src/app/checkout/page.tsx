import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { CreditCard, Landmark } from 'lucide-react';

export default function CheckoutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold font-headline mb-8 text-center">Checkout</h1>
      <div className="grid md:grid-cols-3 gap-12">
        <div className="md:col-span-2">
          <Accordion type="multiple" defaultValue={['shipping', 'payment']} className="w-full">
            <AccordionItem value="shipping">
              <AccordionTrigger className="text-xl font-semibold">1. Shipping Information</AccordionTrigger>
              <AccordionContent>
                <form className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="John" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Doe" />
                  </div>
                  <div className="col-span-2 space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" placeholder="123 Main St" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" placeholder="Anytown" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zip">ZIP Code</Label>
                    <Input id="zip" placeholder="12345" />
                  </div>
                </form>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="payment">
              <AccordionTrigger className="text-xl font-semibold">2. Payment Method</AccordionTrigger>
              <AccordionContent>
                <RadioGroup defaultValue="card" className="mt-4 space-y-4">
                  <Label>
                    <Card className="flex items-center p-4 cursor-pointer hover:border-primary">
                      <RadioGroupItem value="card" id="card" className="mr-4" />
                      <CreditCard className="mr-4 h-6 w-6" />
                      <div className="flex-grow">
                        <p className="font-medium">Credit/Debit Card</p>
                        <p className="text-sm text-muted-foreground">Pay with Visa, Mastercard, etc.</p>
                      </div>
                    </Card>
                  </Label>
                  <Label>
                    <Card className="flex items-center p-4 cursor-pointer hover:border-primary">
                      <RadioGroupItem value="bank" id="bank" className="mr-4" />
                       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-4 h-6 w-6"><path d="M12.22 2h-4.44a2 2 0 0 0-2 2v.4a2 2 0 0 1-2 2v11.2a2 2 0 0 0 2 2h12.44a2 2 0 0 0 2-2v-1.2a2 2 0 0 1 2-2V8.4a2 2 0 0 0-2-2h-4.44Z"/><path d="M18 13.2V22"/><path d="m15 13-3 5-3-5"/></svg>
                      <div className="flex-grow">
                        <p className="font-medium">JazzCash</p>
                        <p className="text-sm text-muted-foreground">Pay from your JazzCash account.</p>
                      </div>
                    </Card>
                  </Label>
                  <Label>
                    <Card className="flex items-center p-4 cursor-pointer hover:border-primary">
                      <RadioGroupItem value="easypaisa" id="easypaisa" className="mr-4" />
                       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-4 h-6 w-6"><path d="m12 19-7-7 7-7 7 7-7 7Z"/><path d="M19 5 5 19"/></svg>
                      <div className="flex-grow">
                        <p className="font-medium">Easypaisa</p>
                        <p className="text-sm text-muted-foreground">Pay from your Easypaisa account.</p>
                      </div>
                    </Card>
                  </Label>
                   <Label>
                    <Card className="flex items-center p-4 cursor-pointer hover:border-primary">
                      <RadioGroupItem value="banktransfer" id="banktransfer" className="mr-4" />
                      <Landmark className="mr-4 h-6 w-6" />
                      <div className="flex-grow">
                        <p className="font-medium">Bank Transfer</p>
                        <p className="text-sm text-muted-foreground">Directly transfer from your bank.</p>
                      </div>
                    </Card>
                  </Label>
                </RadioGroup>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between text-sm"><span>1x Wireless Headphones</span> <span>$99.99</span></div>
              <div className="flex justify-between text-sm"><span>2x Women's Yoga Pants</span> <span>$99.98</span></div>
              <div className="border-t my-2"></div>
              <div className="flex justify-between text-sm"><span>Subtotal</span> <span>$199.97</span></div>
              <div className="flex justify-between text-sm text-muted-foreground"><span>Shipping</span> <span>$5.00</span></div>
              <div className="border-t my-2"></div>
              <div className="flex justify-between font-bold text-lg"><span>Total</span> <span>$204.97</span></div>
            </CardContent>
            <CardFooter>
              <Button size="lg" className="w-full">Place Order</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
