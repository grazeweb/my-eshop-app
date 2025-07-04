import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Product } from '@/lib/types';

export function ProductCard({ product }: { product: Product }) {
  return (
    <Card className="flex flex-col overflow-hidden transition-transform transform hover:-translate-y-1 hover:shadow-xl h-full">
      <CardHeader className="p-0">
        <Link href={`/products/${product.id}`} className="block">
          <div className="relative h-60 w-full">
            <Image
              src={product.image}
              alt={product.name}
              fill
              style={{ objectFit: 'cover' }}
              data-ai-hint="product image"
              className="group-hover:opacity-75 transition-opacity"
            />
          </div>
        </Link>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <Link href={`/products/${product.id}`}>
          <CardTitle className="text-lg font-medium hover:text-primary">{product.name}</CardTitle>
        </Link>
        <p className="text-muted-foreground text-sm mt-1">
          {product.description.substring(0, 80)}...
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <p className="font-semibold text-xl">${product.price.toFixed(2)}</p>
        <Button asChild>
          <Link href={`/products/${product.id}`}>View Item</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
