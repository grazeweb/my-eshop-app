
"use client";

import { useAuth } from '@/contexts/auth-context';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, Package } from 'lucide-react';
import { useEffect, useState } from 'react';
import { listenForWishlist } from '@/lib/wishlist';
import { listenForUserOrders } from '@/lib/orders';
import Link from 'next/link';

export default function AccountDashboardPage() {
  const { user, loading } = useAuth();
  const [wishlistCount, setWishlistCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);

  useEffect(() => {
    if (user) {
      const unsubscribeWishlist = listenForWishlist(user.uid, (productIds) => {
        setWishlistCount(productIds.length);
      });

      const unsubscribeOrders = listenForUserOrders(
        user.uid,
        (orders) => {
          setOrderCount(orders.length);
        },
        (error) => {
          console.error("Failed to fetch order count:", error);
        }
      );

      return () => {
        unsubscribeWishlist();
        unsubscribeOrders();
      };
    }
  }, [user]);

  if (loading || !user) {
    return null; // The layout handles the main loading and redirect state
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold font-headline">Dashboard</h1>
      <p className="text-muted-foreground">
        Welcome back, <span className="font-medium text-foreground">{user.email}</span>! From here you can manage your account.
      </p>
      <div className="grid gap-6 md:grid-cols-2">
        <Link href="/account/orders" className="transition-transform active:scale-95">
            <Card className="h-full hover:border-primary transition-colors">
              <CardContent className="p-6 flex flex-col items-center justify-center text-center gap-4 min-h-[150px]">
                <Package className="w-10 h-10 text-muted-foreground" />
                <div>
                  <p className="text-2xl font-bold">{orderCount}</p>
                  <p className="text-sm text-muted-foreground">Total Orders</p>
                </div>
              </CardContent>
            </Card>
        </Link>
        <Link href="/account/wishlist" className="transition-transform active:scale-95">
            <Card className="h-full hover:border-primary transition-colors">
              <CardContent className="p-6 flex flex-col items-center justify-center text-center gap-4 min-h-[150px]">
                <Heart className="w-10 h-10 text-muted-foreground" />
                <div>
                  <p className="text-2xl font-bold">{wishlistCount}</p>
                  <p className="text-sm text-muted-foreground">Items in Wishlist</p>
                </div>
              </CardContent>
            </Card>
        </Link>
      </div>
    </div>
  );
}
