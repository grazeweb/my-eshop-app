import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Product } from '@/lib/types';
import { categories } from '@/lib/data';
import { Star } from 'lucide-react';

export function ProductCard({ product }: { product: Product }) {
  const category = categories.find((c) => c.id === product.categoryId);

  const imageSrc =
    product.image &&
    (product.image.startsWith("http://") || product.image.startsWith("https://"))
      ? product.image
      : "https://placehold.co/400x400.png";

  return (
    <Card className="group w-full overflow-hidden rounded-lg border shadow-sm transition-shadow hover:shadow-md">
      <Link href={`/products/${product.id}`} className="block">
        <div className="relative bg-muted">
          <div className="aspect-square w-full overflow-hidden">
             <Image
              src={imageSrc}
              alt={product.name}
              fill
              style={{ objectFit: 'cover' }}
              data-ai-hint="product image"
              className="transition-transform group-hover:scale-105"
            />
          </div>
          {product.badge && (
            <Badge 
              variant={product.badge.toLowerCase() === 'sale' ? 'destructive' : 'default'} 
              className="absolute top-3 right-3 capitalize"
            >
              {product.badge}
            </Badge>
          )}
        </div>
        <CardContent className="space-y-2 p-4">
          {category && (
            <p className="text-sm font-medium text-primary">{category.name.toUpperCase()}</p>
          )}
          <CardTitle className="h-12 text-base font-semibold leading-tight text-foreground group-hover:text-primary">
            {product.name}
          </CardTitle>
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${i < Math.round(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
              />
            ))}
          </div>
          <div className="flex items-baseline gap-2">
            <p className="text-lg font-bold text-foreground">${product.price.toFixed(2)}</p>
            {product.originalPrice && (
              <p className="text-sm text-muted-foreground line-through">${product.originalPrice.toFixed(2)}</p>
            )}
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}
