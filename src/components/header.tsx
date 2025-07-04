
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, ShoppingCart, User, Sun, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

const apparelComponents: { title: string; href: string; description: string }[] = [
  {
    title: "Shirts",
    href: "/products?category=apparel&subcategory=shirts",
    description: "Classic button-downs, casual tees, and stylish blouses.",
  },
  {
    title: "Jackets",
    href: "/products?category=apparel&subcategory=jackets",
    description: "From timeless denim jackets to tailored blazers.",
  },
  {
    title: "Dresses",
    href: "/products?category=apparel&subcategory=dresses",
    description: "Elegant dresses for every occasion, from casual to formal.",
  },
  {
    title: "Pants & Jeans",
    href: "/products?category=apparel&subcategory=pants-jeans",
    description: "A wide range of styles from comfortable pants to classic jeans.",
  },
]
const accessoriesComponents: { title: string; href: string; description: string }[] = [
    {
        title: "Bags",
        href: "/products?category=accessories&subcategory=bags",
        description: "Explore our collection of stylish and functional bags for every occasion.",
    },
    {
        title: "Belts",
        href: "/products?category=accessories&subcategory=belts",
        description: "Find the perfect belt to complete your look, from classic leather to modern designs.",
    },
    {
        title: "Jewelry",
        href: "/products?category=accessories&subcategory=jewelry",
        description: "Adorn yourself with our stunning range of jewelry, from delicate necklaces to statement earrings.",
    },
    {
        title: "Hats & Scarves",
        href: "/products?category=accessories&subcategory=hats-scarves",
        description: "Stay warm and stylish with our selection of hats and scarves.",
    },
]

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container mx-auto flex h-16 items-center px-4">
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
                        <AccordionItem value="apparel">
                            <AccordionTrigger className="text-lg text-muted-foreground hover:text-foreground hover:no-underline">Apparel</AccordionTrigger>
                            <AccordionContent>
                                <div className="flex flex-col space-y-3 pl-4">
                                    <SheetClose asChild>
                                        <Link href="/products?category=apparel" className="text-base text-muted-foreground transition-colors hover:text-foreground">All Apparel</Link>
                                    </SheetClose>
                                    {apparelComponents.map(subLink => (
                                        <SheetClose asChild key={subLink.href}>
                                        <Link
                                            href={subLink.href}
                                            className={cn(
                                            'text-base text-muted-foreground transition-colors hover:text-foreground',
                                            pathname === subLink.href && 'text-foreground font-semibold'
                                            )}
                                        >
                                            {subLink.title}
                                        </Link>
                                        </SheetClose>
                                    ))}
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="accessories">
                            <AccordionTrigger className="text-lg text-muted-foreground hover:text-foreground hover:no-underline">Accessories</AccordionTrigger>
                            <AccordionContent>
                                <div className="flex flex-col space-y-3 pl-4">
                                    <SheetClose asChild>
                                        <Link href="/products?category=accessories" className="text-base text-muted-foreground transition-colors hover:text-foreground">All Accessories</Link>
                                    </SheetClose>
                                    {accessoriesComponents.map(subLink => (
                                        <SheetClose asChild key={subLink.href}>
                                        <Link
                                            href={subLink.href}
                                            className={cn(
                                            'text-base text-muted-foreground transition-colors hover:text-foreground',
                                            pathname === subLink.href && 'text-foreground font-semibold'
                                            )}
                                        >
                                            {subLink.title}
                                        </Link>
                                        </SheetClose>
                                    ))}
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                        <SheetClose asChild>
                            <Link href="/products?category=footwear" className="block text-lg text-muted-foreground transition-colors hover:text-foreground py-4 border-b">
                                Footwear
                            </Link>
                        </SheetClose>
                        <SheetClose asChild>
                            <Link href="/" className="block text-lg text-muted-foreground transition-colors hover:text-foreground py-4 border-b">
                                Home
                            </Link>
                        </SheetClose>
                      </Accordion>
                    </div>
                    
                    <div className="border-t pt-4 mt-4 space-y-4">
                        <form onSubmit={handleSearch} className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Search..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-muted pl-10"
                            />
                        </form>
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
        <div className="hidden lg:flex w-full items-center justify-between">
             <div className="flex items-center gap-6">
                <Link href="/" className="mr-4 flex items-center gap-2">
                    <span className="font-extrabold text-2xl tracking-tight">eShop</span>
                </Link>
                <NavigationMenu>
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger>Apparel</NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                          <li className="row-span-3">
                            <NavigationMenuLink asChild>
                              <Link
                                className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                                href="/products?category=apparel"
                              >
                                <Image src="https://placehold.co/400x500.png" width={400} height={500} alt="Apparel Collection" className="mb-4 h-48 w-full object-cover rounded-md" data-ai-hint="fashion apparel" />
                                <div className="mb-2 mt-4 text-lg font-medium">
                                  Apparel Collection
                                </div>
                                <p className="text-sm leading-tight text-muted-foreground">
                                  Stylish and comfortable clothing for every occasion.
                                </p>
                              </Link>
                            </NavigationMenuLink>
                          </li>
                          {apparelComponents.slice(0,3).map((component) => (
                            <ListItem
                              key={component.title}
                              title={component.title}
                              href={component.href}
                            >
                              {component.description}
                            </ListItem>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger>Accessories</NavigationMenuTrigger>
                      <NavigationMenuContent>
                       <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                          <li className="row-span-3">
                            <NavigationMenuLink asChild>
                              <Link
                                className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                                href="/products?category=accessories"
                              >
                                <Image src="https://placehold.co/400x500.png" width={400} height={500} alt="Accessories Collection" className="mb-4 h-48 w-full object-cover rounded-md" data-ai-hint="fashion accessories" />
                                <div className="mb-2 mt-4 text-lg font-medium">
                                  Complete Your Look
                                </div>
                                <p className="text-sm leading-tight text-muted-foreground">
                                   Find the perfect finishing touches with our curated accessories.
                                </p>
                              </Link>
                            </NavigationMenuLink>
                          </li>
                          {accessoriesComponents.slice(0,3).map((component) => (
                            <ListItem
                              key={component.title}
                              title={component.title}
                              href={component.href}
                            >
                              {component.description}
                            </ListItem>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <Link href="/products?category=footwear" legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                          Footwear
                        </NavigationMenuLink>
                      </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <Link href="/" legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                          Home
                        </NavigationMenuLink>
                      </Link>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
            </div>
            <div className="flex items-center gap-2">
                <form onSubmit={handleSearch} className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="h-9 w-48 pl-9"
                    />
                </form>
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

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<typeof Link>
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
