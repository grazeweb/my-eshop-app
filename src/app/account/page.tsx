
"use client";

import { useAuth } from '@/contexts/auth-context';
import { Card, CardContent } from '@/components/ui/card';
import { Heart } from 'lucide-react';
import { useEffect, useState } from 'react';
import { listenForWishlist } from '@/lib/wishlist';

export default function AccountDashboardPage() {
  const { user, loading } = useAuth();
  const [wishlistCount, setWishlistCount] = useState(0);

  useEffect(() => {
    if (user) {
      // Listen for wishlist count
      const unsubscribeWishlist = listenForWishlist(user.uid, (productIds) => {
        setWishlistCount(productIds.length);
      });

      // Cleanup listeners on component unmount
      return () => {
        unsubscribeWishlist();
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
      <div className="grid gap-6">
        <Card>
          <CardContent className="p-6 flex flex-col items-center justify-center text-center gap-4 min-h-[150px]">
            <Heart className="w-10 h-10 text-muted-foreground" />
            <div>
              <p className="text-2xl font-bold">{wishlistCount}</p>
              <p className="text-sm text-muted-foreground">Items in Wishlist</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
