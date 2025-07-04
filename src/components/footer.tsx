import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Package, Facebook, Twitter, Instagram } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-muted/40 border-t">
      <div className="container py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-2 md:col-span-2">
                <h3 className="text-2xl font-bold font-headline mb-2">Stay in the Loop</h3>
                <p className="text-muted-foreground mb-4">
                    Subscribe for updates, promotions, and new product announcements.
                </p>
                <form className="flex w-full max-w-sm gap-2">
                    <Input
                        type="email"
                        placeholder="Enter your email"
                        aria-label="Email for newsletter"
                    />
                    <Button type="submit">Subscribe</Button>
                </form>
            </div>
            <div>
                <h4 className="font-semibold mb-4">Shop</h4>
                <ul className="space-y-2 text-sm">
                    <li><Link href="/products" className="text-muted-foreground hover:text-foreground">All Products</Link></li>
                    <li><Link href="/products?category=clothing" className="text-muted-foreground hover:text-foreground">Clothing</Link></li>
                    <li><Link href="/products?category=electronics" className="text-muted-foreground hover:text-foreground">Electronics</Link></li>
                    <li><Link href="/products?category=home-goods" className="text-muted-foreground hover:text-foreground">Home Goods</Link></li>
                </ul>
            </div>
            <div>
                <h4 className="font-semibold mb-4">Support</h4>
                <ul className="space-y-2 text-sm">
                    <li><Link href="/contact" className="text-muted-foreground hover:text-foreground">Contact Us</Link></li>
                    <li><Link href="/legal/returns" className="text-muted-foreground hover:text-foreground">Return Policy</Link></li>
                    <li><Link href="/legal/terms" className="text-muted-foreground hover:text-foreground">Terms & Conditions</Link></li>
                    <li><Link href="/legal/privacy" className="text-muted-foreground hover:text-foreground">Privacy Policy</Link></li>
                </ul>
            </div>
        </div>

        <div className="mt-12 border-t pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Link href="/" className="flex items-center space-x-2 text-foreground">
                    <Package className="h-5 w-5" />
                    <span className="font-bold">ShopEase</span>
                </Link>
                <span>&copy; {new Date().getFullYear()}</span>
            </div>
            <div className="flex items-center gap-4">
                <Link href="#" aria-label="Facebook" className="text-muted-foreground hover:text-foreground"><Facebook className="h-5 w-5" /></Link>
                <Link href="#" aria-label="Twitter" className="text-muted-foreground hover:text-foreground"><Twitter className="h-5 w-5" /></Link>
                <Link href="#" aria-label="Instagram" className="text-muted-foreground hover:text-foreground"><Instagram className="h-5 w-5" /></Link>
            </div>
        </div>
      </div>
    </footer>
  );
}
