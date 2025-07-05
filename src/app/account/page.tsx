
"use client";

import { useAuth } from '@/contexts/auth-context';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, ShoppingBag, Heart } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getProductsBoughtCountForUser } from '@/lib/orders';
import { listenForWishlist } from '@/lib/wishlist';

export default function AccountDashboardPage() {
  const { user, loading } = useAuth();
  const [productsBought, setProductsBought] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);

  useEffect(() => {
    if (user) {
      // Fetch products bought count
      getProductsBoughtCountForUser(user.uid).then(setProductsBought);
      
      // Listen for wishlist count
      const unsubscribe = listenForWishlist(user.uid, (productIds) => {
        setWishlistCount(productIds.length);
      });
      return () => unsubscribe();
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
        <Card>
          <CardContent className="p-6 flex flex-col items-center justify-center text-center gap-4 min-h-[150px]">
            <ShoppingBag className="w-10 h-10 text-muted-foreground" />
            <div>
              <p className="text-2xl font-bold">{productsBought}</p>
              <p className="text-sm text-muted-foreground">Products Bought</p>
            </div>
          </CardContent>
        </Card>
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
