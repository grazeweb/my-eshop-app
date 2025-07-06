
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Facebook, Twitter, Instagram, Youtube, Send } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-muted/40 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center space-x-2">
              <span className="font-bold text-lg">eShop</span>
            </Link>
            <p className="text-muted-foreground text-sm">
              Elegance in every detail. Curated collections for the modern lifestyle.
            </p>
            <div className="flex items-center gap-4">
              <Link href="#" aria-label="Facebook" className="text-muted-foreground hover:text-foreground inline-block transition-transform active:scale-95"><Facebook className="h-5 w-5" /></Link>
              <Link href="#" aria-label="Twitter" className="text-muted-foreground hover:text-foreground inline-block transition-transform active:scale-95"><Twitter className="h-5 w-5" /></Link>
              <Link href="#" aria-label="Instagram" className="text-muted-foreground hover:text-foreground inline-block transition-transform active:scale-95"><Instagram className="h-5 w-5" /></Link>
              <Link href="#" aria-label="Youtube" className="text-muted-foreground hover:text-foreground inline-block transition-transform active:scale-95"><Youtube className="h-5 w-5" /></Link>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4 uppercase text-sm tracking-wider">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/products" className="text-muted-foreground hover:text-foreground inline-block transition-transform active:scale-95">All Products</Link></li>
              <li><Link href="/products?category=apparel" className="text-muted-foreground hover:text-foreground inline-block transition-transform active:scale-95">Apparel</Link></li>
              <li><Link href="/products?category=accessories" className="text-muted-foreground hover:text-foreground inline-block transition-transform active:scale-95">Accessories</Link></li>
              <li><Link href="/products?category=footwear" className="text-muted-foreground hover:text-foreground inline-block transition-transform active:scale-95">Footwear</Link></li>
              <li><Link href="/cart" className="text-muted-foreground hover:text-foreground inline-block transition-transform active:scale-95">Your Cart</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 uppercase text-sm tracking-wider">ESCALMC</h4>
            <p className="text-muted-foreground text-sm mb-4">
              Our new Minecraft server experience. Coming Soon!
            </p>
            <Button variant="outline" size="sm">Learn More</Button>
          </div>

          <div>
            <h4 className="font-semibold mb-4 uppercase text-sm tracking-wider">Stay Connected</h4>
            <p className="text-muted-foreground text-sm mb-4">
              Subscribe for updates and special offers.
            </p>
            <form className="flex w-full max-w-sm gap-2">
              <Input
                type="email"
                placeholder="Your email"
                aria-label="Email for newsletter"
              />
              <Button type="submit" size="icon">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>

        <div className="mt-12 border-t pt-8 flex justify-center items-center">
          <p className="text-sm text-muted-foreground">
            © 2025 eShop. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
