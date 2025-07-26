
"use client";

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, ShoppingCart, User, Sun, Search, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/contexts/auth-context';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useCart } from '@/contexts/cart-context';
import { Badge } from '@/components/ui/badge';

const apparelComponents: { title: string; href: string; description: string }[] = [
  {
    title: 'Shirts',
    href: '/products?category=apparel&subcategory=shirts',
    description: 'Classic button-downs, casual tees, and stylish blouses.',
  },
  {
    title: 'Jackets',
    href: '/products?category=apparel&subcategory=jackets',
    description: 'From timeless denim jackets to tailored blazers.',
  },
  {
    title: 'Dresses',
    href: '/products?category=apparel&subcategory=dresses',
    description: 'Elegant dresses for every occasion, from casual to formal.',
  },
  {
    title: 'Pants & Jeans',
    href: '/products?category=apparel&subcategory=pants',
    description: 'A wide range of styles from comfortable pants to... ',
  },
];

const accessoriesComponents: { title: string; href: string; description: string }[] = [
  {
    title: 'Watches',
    href: '/products?category=accessories&subcategory=watches',
    description: 'Elegant timepieces to complement your style.',
  },
  {
    title: 'Bags',
    href: '/products?category=accessories&subcategory=bags',
    description: 'From backpacks to handbags, find the perfect carryall.',
  },
  {
    title: 'Belts',
    href: '/products?category=accessories&subcategory=belts',
    description: 'Add the finishing touch to your outfit with a stylish belt.',
  },
  {
    title: 'Sunglasses',
    href: '/products?category=accessories&subcategory=sunglasses',
    description: 'Protect your eyes and look cool with our latest collection.',
  },
];

const mobileNavLinks = [
    { href: '/products', label: 'All Products' },
    { href: '/products?category=apparel', label: 'Apparel' },
    { href: '/products?category=accessories', label: 'Accessories' },
    { href: '/products?category=footwear', label: 'Footwear' },
    { href: '/', label: 'Home' },
];

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
      setIsMobileSearchOpen(false); // Close sheet on search
    }
  };
  
  const getAvatarFallback = (name?: string | null) => {
    if (!name) return 'A';
    const parts = name.split(' ').filter(Boolean);
    if (parts.length > 1) {
        return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        
        {/* Left side: Logo & Desktop Nav */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 transition-transform active:scale-95">
            <span className="font-bold text-lg">eShop</span>
          </Link>
          <nav className="hidden lg:flex items-center gap-1">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/products" className={navigationMenuTriggerStyle()}>
                      All Products
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Apparel</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                      <li className="row-span-4">
                        <NavigationMenuLink asChild>
                           <Link
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                            href="/products?category=apparel"
                          >
                            <div className="relative h-[250px] w-full">
                                <Image src="https://placehold.co/400x500.png" alt="Apparel Collection" fill style={{objectFit: 'contain'}} className="mb-4 rounded-md" data-ai-hint="fashion apparel" />
                            </div>
                            <div className="mb-2 mt-4 text-lg font-medium">
                              Apparel Collection
                            </div>
                            <p className="text-sm leading-tight text-muted-foreground">
                              Stylish and comfortable clothing for every occasion.
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      {apparelComponents.map((component) => (
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
                     <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                      {accessoriesComponents.map((component) => (
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
                   <NavigationMenuLink asChild>
                    <Link href="/products?category=footwear" className={navigationMenuTriggerStyle()}>
                      Footwear
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/" className={navigationMenuTriggerStyle()}>
                      Home
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </nav>
        </div>
        
        {/* Right side: Actions */}
        <div className="flex items-center gap-1 md:gap-2">
            {/* Desktop Search */}
            <form onSubmit={handleSearch} className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                    type="search"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="h-9 w-32 sm:w-48 pl-9"
                />
            </form>

            {/* Mobile search */}
            <div className="md:hidden">
                <Sheet open={isMobileSearchOpen} onOpenChange={setIsMobileSearchOpen}>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <Search className="h-5 w-5" />
                            <span className="sr-only">Search</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="top" className="p-4">
                        <form onSubmit={handleSearch} className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Search products..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10"
                            />
                        </form>
                    </SheetContent>
                </Sheet>
            </div>
            
            {/* Cart Icon */}
            <Button variant="ghost" size="icon" asChild>
                <Link href="/cart" className="relative">
                    {cartCount > 0 && (
                        <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 justify-center p-1 text-xs">{cartCount}</Badge>
                    )}
                    <ShoppingCart className="h-5 w-5" />
                    <span className="sr-only">Shopping Cart</span>
                </Link>
            </Button>
            
            {/* User Avatar / Login Button */}
            {user ? (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                            <Avatar className="h-8 w-8">
                                <AvatarImage src={user.photoURL ?? ''} alt={user.displayName ?? ''} />
                                <AvatarFallback>{getAvatarFallback(user.displayName)}</AvatarFallback>
                            </Avatar>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56 mt-2">
                        <DropdownMenuLabel className="font-normal">
                          <div className="flex flex-col space-y-1">
                            <p className="text-sm font-medium leading-none">{user.displayName}</p>
                            <p className="text-xs leading-none text-muted-foreground">
                              {user.email}
                            </p>
                          </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                            <Link href="/account">
                                <User className="mr-2 h-4 w-4" />
                                <span>Profile</span>
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={logout}>
                            <LogOut className="mr-2 h-4 w-4" />
                            <span>Log out</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            ) : (
                <>
                  <Button variant="ghost" asChild className="hidden md:flex">
                      <Link href="/login">
                          Login
                      </Link>
                  </Button>
                  <Button variant="ghost" size="icon" asChild className="md:hidden">
                    <Link href="/login">
                      <User className="h-5 w-5" />
                      <span className="sr-only">Login</span>
                    </Link>
                  </Button>
                </>
            )}

            {/* Mobile Menu Trigger */}
            <div className="lg:hidden">
                <Sheet>
                    <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <Menu className="h-5 w-5" />
                        <span className="sr-only">Toggle Menu</span>
                    </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="flex flex-col">
                        <SheetClose asChild>
                            <Link href="/" className="flex items-center space-x-2 mb-6">
                                <span className="font-bold text-xl">eShop</span>
                            </Link>
                        </SheetClose>
                        <nav className="flex flex-col gap-4">
                            {mobileNavLinks.map(link => (
                                <SheetClose asChild key={link.label}>
                                    <Link href={link.href ?? '#'} className="text-lg text-foreground/80 transition-colors hover:text-foreground">
                                        {link.label}
                                    </Link>
                                </SheetClose>
                            ))}
                        </nav>
                    </SheetContent>
                </Sheet>
            </div>
        </div>
      </div>
    </header>
  );
}


const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-all hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground active:scale-[0.98]',
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
ListItem.displayName = 'ListItem'

    
