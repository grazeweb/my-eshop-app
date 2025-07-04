import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowRight, Mail } from 'lucide-react';
import { featuredProducts } from '@/lib/data';
import Image from 'next/image';
import { ProductCard } from '@/components/product-card';

export default function Home() {
  return (
    <div className="flex flex-col gap-12 md:gap-16 lg:gap-24 pb-12">
      <section className="relative h-[60vh] md:h-[70vh] w-full flex items-center justify-center text-center text-white bg-gray-800">
        <Image
          src="https://placehold.co/1600x900.png"
          alt="Promotional background"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 z-0 opacity-40"
          data-ai-hint="fashion clothes"
        />
        <div className="relative z-10 p-4">
          <h1 className="text-4xl md:text-6xl font-headline font-bold drop-shadow-lg">
            Summer Collection is Here
          </h1>
          <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto drop-shadow-md">
            Discover the latest trends and refresh your wardrobe. High-quality fashion at unbeatable prices.
          </p>
          <Button size="lg" className="mt-8" asChild>
            <Link href="/products">
              Shop Now <ArrowRight className="ml-2" />
            </Link>
          </Button>
        </div>
      </section>

      <section className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center font-headline">Featured Products</h2>
        <p className="text-center text-muted-foreground mt-2 mb-8">
          Check out our hand-picked selection of best-selling items.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
