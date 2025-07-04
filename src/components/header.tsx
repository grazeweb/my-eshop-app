"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, ShoppingCart, User, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import React from 'react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Products' },
  { href: '/contact', label: 'Contact' },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        {/* Left Part: Logo */}
        <div className="mr-auto flex items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Package className="h-6 w-6" />
            <span className="font-bold">ShopEase</span>
          </Link>
        </div>

        {/* Right Part: Desktop Nav, Icons, and Mobile Menu */}
        <div className="flex items-center space-x-2">
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium mr-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'transition-colors hover:text-foreground/80',
                  pathname === link.href ? 'text-foreground' : 'text-foreground/60'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          
          <Button variant="ghost" size="icon" asChild>
            <Link href="/cart">
              <ShoppingCart className="h-5 w-5" />
              <span className="sr-only">Shopping Cart</span>
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link href="/account">
              <User className="h-5 w-5" />
              <span className="sr-only">User Account</span>
            </Link>
          </Button>
          
          {/* Mobile Nav */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <Link href="/" className="flex items-center space-x-2 mb-6">
                <Package className="h-6 w-6" />
                <span className="font-bold">ShopEase</span>
              </Link>
              <div className="flex flex-col space-y-3">
                {navLinks.map((link) => (
                  <SheetClose asChild key={link.href}>
                    <Link
                      href={link.href}
                      className={cn(
                        'text-lg text-muted-foreground transition-colors hover:text-foreground',
                        pathname === link.href && 'text-foreground font-semibold'
                      )}
                    >
                      {link.label}
                    </Link>
                  </SheetClose>
                ))}
                <div className="border-t pt-4 mt-4 space-y-3">
                  <SheetClose asChild>
                      <Link href="/cart" className="flex items-center gap-3 text-lg text-muted-foreground transition-colors hover:text-foreground">
                          <ShoppingCart className="h-5 w-5" />
                          <span>Cart</span>
                      </Link>
                  </SheetClose>
                  <SheetClose asChild>
                      <Link href="/account" className="flex items-center gap-3 text-lg text-muted-foreground transition-colors hover:text-foreground">
                          <User className="h-5 w-5" />
                          <span>Account</span>
                      </Link>
                  </SheetClose>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
