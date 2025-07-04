
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import {
  LayoutGrid,
  Package,
  Heart,
  Palette,
  Settings,
  LogOut,
  BrainCircuit,
  Loader2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  const menuItems = [
    { href: '/account', label: 'Dashboard', icon: LayoutGrid },
    { href: '/account/orders', label: 'Order History', icon: Package },
    { href: '/account/wishlist', label: 'Wishlist', icon: Heart },
    { href: '/account/appearance', label: 'Appearance', icon: Palette },
    { href: '/account/settings', label: 'Settings', icon: Settings },
  ];
  
  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-16 w-16 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-[250px_1fr] gap-12">
            <aside className="flex flex-col justify-between">
                <nav className="flex flex-col gap-2">
                    {menuItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                            "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                            (pathname === item.href || (item.href !== '/account' && pathname.startsWith(item.href))) && "bg-muted text-primary"
                        )}
                    >
                        <item.icon className="h-4 w-4" />
                        {item.label}
                    </Link>
                    ))}
                     <button
                        onClick={logout}
                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                    >
                        <LogOut className="h-4 w-4" />
                        Logout
                    </button>
                </nav>
                 <div className="flex items-center justify-center mt-8">
                    <Button variant="ghost" size="icon" asChild>
                        <Link href="/"><BrainCircuit className="text-primary h-8 w-8" /></Link>
                    </Button>
                </div>
            </aside>
            <main>{children}</main>
        </div>
    </div>
  );
}
