
"use client";

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Heart, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useAuth } from '@/contexts/auth-context';
import { listenForWishlist } from '@/lib/wishlist';
import { getProduct } from '@/lib/products';
import type { Product } from '@/lib/types';
import { ProductCard } from '@/components/product-card';

export default function WishlistPage() {
  const { user } = useAuth();
  const [wishlistProducts, setWishlistProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const unsubscribe = listenForWishlist(user.uid, async (productIds) => {
      setLoading(true);
      if (productIds.length === 0) {
        setWishlistProducts([]);
        setLoading(false);
        return;
      }
      const productPromises = productIds.map(id => getProduct(id));
      const products = await Promise.all(productPromises);
      setWishlistProducts(products.filter((p): p is Product => p !== null));
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold font-headline">Wishlist</h1>
      {wishlistProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <Card className="flex flex-col items-center justify-center text-center p-12 gap-4 border-dashed min-h-[300px]">
          <Heart className="w-16 h-16 text-muted-foreground" />
          <h2 className="text-xl font-semibold">Your Wishlist is Empty</h2>
          <p className="text-muted-foreground max-w-sm">
            Looks like you haven't added anything to your wishlist yet. Start exploring and save your favorite items!
          </p>
          <Button asChild className="mt-4">
            <Link href="/products">Browse Products</Link>
          </Button>
        </Card>
      )}
    </div>
  );
}
