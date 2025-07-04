import Link from 'next/link';
import { Package } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-muted/40 border-t">
      <div className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <Package className="h-6 w-6" />
              <span className="font-bold text-lg">ShopEase</span>
            </Link>
            <p className="text-muted-foreground text-sm">
              Your one-stop shop for everything you need. Quality products, amazing prices.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Shop</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/products" className="text-muted-foreground hover:text-foreground">All Products</Link></li>
              <li><Link href="/products?category=clothing" className="text-muted-foreground hover:text-foreground">Clothing</Link></li>
              <li><Link href="/products?category=electronics" className="text-muted-foreground hover:text-foreground">Electronics</Link></li>
              <li><Link href="/products?category=home-goods" className="text-muted-foreground hover:text-foreground">Home Goods</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/contact" className="text-muted-foreground hover:text-foreground">Contact Us</Link></li>
              <li><Link href="/account/orders" className="text-muted-foreground hover:text-foreground">Order Tracking</Link></li>
              <li><Link href="/legal/returns" className="text-muted-foreground hover:text-foreground">Return Policy</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/legal/terms" className="text-muted-foreground hover:text-foreground">Terms & Conditions</Link></li>
              <li><Link href="/legal/privacy" className="text-muted-foreground hover:text-foreground">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} ShopEase. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
