
import { Card } from '@/components/ui/card';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function WishlistPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold font-headline">Wishlist</h1>
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
    </div>
  );
}
