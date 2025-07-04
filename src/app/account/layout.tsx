
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarTrigger,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarInset,
} from '@/components/ui/sidebar';
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
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-16 w-16 animate-spin" />
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-muted/40">
        <Sidebar>
          <SidebarHeader>
             <div className="flex items-center gap-2 p-2">
                <Button variant="ghost" size="icon" asChild>
                    <Link href="/"><BrainCircuit className="text-primary h-8 w-8" /></Link>
                </Button>
             </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href || (item.href !== '/account' && pathname.startsWith(item.href))}
                  >
                    <Link href={item.href}>
                      <item.icon />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={logout}>
                  <LogOut />
                  <span>Logout</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset className="max-w-7xl mx-auto w-full">
            <div className="p-4 sm:p-6 lg:p-8">
                <div className="md:hidden mb-4">
                  <SidebarTrigger />
                </div>
                {children}
            </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
