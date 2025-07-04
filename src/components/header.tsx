"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, ShoppingCart, User, Package, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import React from 'react';
import { Input } from '@/components/ui/input';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Products' },
  { href: '/contact', label: 'Contact' },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        {/* Mobile Header: Flex layout, hidden on large screens */}
        <div className="flex w-full items-center justify-between lg:hidden">
            <Link href="/" className="flex items-center space-x-2">
                <Package className="h-6 w-6" />
                <span className="font-bold">eShop</span>
            </Link>
            <Sheet>
                <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle Menu</span>
                </Button>
                </SheetTrigger>
                <SheetContent side="right">
                    <Link href="/" className="flex items-center space-x-2 mb-6">
                        <Package className="h-6 w-6" />
                        <span className="font-bold">eShop</span>
                    </Link>
                    <div className="relative mb-6">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input type="search" placeholder="Search..." className="w-full bg-muted pl-10" />
                    </div>
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
                    </div>
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
                </SheetContent>
            </Sheet>
        </div>

        {/* Desktop Header: 3-column grid, hidden on small screens */}
        <div className="hidden w-full grid-cols-3 items-center lg:grid">
            <div className="flex items-center gap-6 justify-self-start">
                <Link href="/" className="flex items-center space-x-2">
                    <Package className="h-6 w-6" />
                    <span className="font-bold">eShop</span>
                </Link>
                <nav className="flex items-center space-x-6 text-sm font-medium">
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
            </div>

            <div className="relative w-full max-w-sm justify-self-center">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                    type="search"
                    placeholder="Search products..."
                    className="w-full rounded-md bg-muted pl-10"
                />
            </div>

            <div className="flex items-center gap-2 justify-self-end">
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
            </div>
        </div>
      </div>
    </header>
  );
}