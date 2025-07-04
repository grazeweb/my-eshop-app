"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, ShoppingCart, User, Search, Sun, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import React from 'react';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const navItems = [
  { href: '/products', label: 'All Products' },
  {
    label: 'Apparel',
    subLinks: [
      { href: '/products?category=clothing', label: 'All Apparel' },
      { href: '/products?category=clothing&subcategory=tops', label: 'Tops' },
      { href: '/products?category=clothing&subcategory=bottoms', label: 'Bottoms' },
      { href: '/products?category=clothing&subcategory=dresses', label: 'Dresses' },
    ],
  },
    {
    label: 'Accessories',
    subLinks: [
      { href: '/products?category=accessories', label: 'All Accessories' },
      { href: '/products?category=accessories&subcategory=bags', label: 'Bags' },
      { href: '/products?category=accessories&subcategory=belts', label: 'Belts' },
      { href: '/products?category=accessories&subcategory=jewelry', label: 'Jewelry' },
    ],
  },
  { href: '/products?category=footwear', label: 'Footwear' },
  { href: '/', label: 'Home' },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        {/* Mobile Header */}
        <div className="flex w-full items-center justify-between lg:hidden">
            <Link href="/" className="flex items-center space-x-2">
                <span className="font-bold text-xl">eShop</span>
            </Link>
            <Sheet>
                <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle Menu</span>
                </Button>
                </SheetTrigger>
                <SheetContent side="right" className="flex flex-col">
                    <Link href="/" className="flex items-center space-x-2 mb-6">
                        <span className="font-bold text-xl">eShop</span>
                    </Link>
                    
                    <div className="flex-grow">
                      <Accordion type="multiple" className="w-full flex flex-col">
                        {navItems.map((item, index) => (
                          item.subLinks ? (
                            <AccordionItem value={`item-${index}`} key={index}>
                              <AccordionTrigger className="text-lg text-muted-foreground hover:text-foreground hover:no-underline">{item.label}</AccordionTrigger>
                              <AccordionContent>
                                <div className="flex flex-col space-y-3 pl-4">
                                  {item.subLinks.map(subLink => (
                                    <SheetClose asChild key={subLink.href}>
                                      <Link
                                        href={subLink.href}
                                        className={cn(
                                          'text-base text-muted-foreground transition-colors hover:text-foreground',
                                          pathname === subLink.href && 'text-foreground font-semibold'
                                        )}
                                      >
                                        {subLink.label}
                                      </Link>
                                    </SheetClose>
                                  ))}
                                </div>
                              </AccordionContent>
                            </AccordionItem>
                          ) : (
                            <SheetClose asChild key={item.href}>
                                <Link
                                    href={item.href!}
                                    className={cn(
                                        'block text-lg text-muted-foreground transition-colors hover:text-foreground py-4 border-b',
                                        pathname === item.href && 'text-foreground font-semibold'
                                    )}
                                >
                                    {item.label}
                                </Link>
                            </SheetClose>
                          )
                        ))}
                      </Accordion>
                    </div>
                    
                    <div className="border-t pt-4 mt-4 space-y-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input type="search" placeholder="Search..." className="w-full bg-muted pl-10" />
                        </div>
                        <div className="flex items-center justify-around">
                            <Button variant="ghost" size="icon" asChild><Link href="/cart"><ShoppingCart className="h-5 w-5" /><span className="sr-only">Cart</span></Link></Button>
                            <Button variant="ghost" size="icon"><Sun className="h-5 w-5" /><span className="sr-only">Toggle Theme</span></Button>
                            <Button variant="ghost" size="icon" asChild><Link href="/account"><User className="h-5 w-5" /><span className="sr-only">Account</span></Link></Button>
                        </div>
                    </div>
                </SheetContent>
            </Sheet>
        </div>

        {/* Desktop Header */}
        <div className="hidden w-full items-center justify-between lg:flex">
            <div className="flex items-center gap-6">
                <Link href="/" className="mr-4">
                    <span className="font-extrabold text-2xl tracking-tight">eShop</span>
                </Link>
                <nav className="flex items-center space-x-6 text-sm font-medium">
                  {navItems.map((item, index) => (
                    item.subLinks ? (
                      <DropdownMenu key={index}>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className={cn(
                            "flex items-center gap-1 text-sm font-medium transition-colors hover:text-foreground/80 hover:bg-transparent px-0",
                            item.subLinks.some(sl => pathname.startsWith(sl.href)) ? 'text-foreground' : 'text-foreground/60'
                          )}>
                            {item.label}
                            <ChevronDown className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          {item.subLinks.map(subLink => (
                            <DropdownMenuItem key={subLink.href} asChild>
                              <Link href={subLink.href}>{subLink.label}</Link>
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    ) : (
                      <Link
                        key={item.href}
                        href={item.href!}
                        className={cn(
                          'transition-colors hover:text-foreground/80',
                          pathname === item.href ? 'text-foreground' : 'text-foreground/60'
                        )}
                      >
                        {item.label}
                      </Link>
                    )
                  ))}
                </nav>
            </div>

            <div className="flex items-center gap-4">
                <div className="relative w-full max-w-xs">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Search..."
                        className="w-full rounded-md bg-muted pl-10"
                    />
                </div>
                <Button variant="ghost" size="icon" asChild>
                    <Link href="/cart">
                      <ShoppingCart className="h-5 w-5" />
                      <span className="sr-only">Shopping Cart</span>
                    </Link>
                </Button>
                 <Button variant="ghost" size="icon">
                    <Sun className="h-5 w-5" />
                    <span className="sr-only">Toggle theme</span>
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
