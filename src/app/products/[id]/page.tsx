import { notFound } from 'next/navigation';
import Image from 'next/image';
import { products } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Star, ShoppingCart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { ProductCard } from '@/components/product-card';

export async function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }));
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = products.find((p) => p.id === params.id);

  if (!product) {
    notFound();
  }

  const relatedProducts = products
    .filter((p) => p.categoryId === product.categoryId && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        <div>
          <Carousel className="w-full">
            <CarouselContent>
              {product.images.map((img, index) => (
                <CarouselItem key={index}>
                  <div className="aspect-square relative rounded-lg overflow-hidden border">
                    <Image
                      src={img}
                      alt={`${product.name} image ${index + 1}`}
                      fill
                      style={{ objectFit: 'cover' }}
                      data-ai-hint="product image"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </Carousel>
        </div>
        <div className="flex flex-col justify-center">
          <h1 className="text-3xl md:text-4xl font-bold font-headline">{product.name}</h1>
          <div className="flex items-center gap-4 mt-4">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${i < Math.round(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                />
              ))}
            </div>
            <span className="text-muted-foreground">{product.rating.toFixed(1)} stars</span>
          </div>
          <p className="text-3xl font-bold mt-6">${product.price.toFixed(2)}</p>
          <p className="mt-4 text-muted-foreground leading-relaxed">{product.description}</p>
          
          <div className="mt-8">
            <Button size="lg" className="w-full md:w-auto">
              <ShoppingCart className="mr-2" /> Add to Cart
            </Button>
          </div>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <div className="mt-16 md:mt-24">
          <h2 className="text-2xl font-bold text-center font-headline mb-8">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
