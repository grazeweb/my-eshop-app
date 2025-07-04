import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ArrowRight, Mail } from 'lucide-react';
import { featuredProducts } from '@/lib/data';
import { Product } from '@/lib/types';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';

function ProductCard({ product }: { product: Product }) {
  return (
    <Card className="flex flex-col overflow-hidden transition-transform transform hover:-translate-y-1 hover:shadow-xl">
      <CardHeader className="p-0">
        <Link href={`/products/${product.id}`} className="block">
          <div className="relative h-48 w-full">
            <Image
              src={product.image}
              alt={product.name}
              fill
              style={{ objectFit: 'cover' }}
              data-ai-hint="product image"
            />
          </div>
        </Link>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <Link href={`/products/${product.id}`}>
          <CardTitle className="text-lg font-medium hover:text-primary">{product.name}</CardTitle>
        </Link>
        <p className="text-muted-foreground text-sm mt-1">
          {product.description.substring(0, 60)}...
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <p className="font-semibold text-xl">${product.price.toFixed(2)}</p>
        <Button asChild>
          <Link href={`/products/${product.id}`}>View</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

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

      <section className="container mx-auto px-4">
        <div className="bg-card rounded-lg shadow-md p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <h3 className="text-2xl md:text-3xl font-bold font-headline">Stay in the Loop</h3>
            <p className="text-muted-foreground mt-2">
              Subscribe to our newsletter for the latest updates, deals, and more.
            </p>
          </div>
          <form className="w-full md:w-auto md:max-w-md flex gap-2">
            <Input
              type="email"
              placeholder="Enter your email"
              className="flex-grow"
              aria-label="Email for newsletter"
            />
            <Button type="submit">
              <Mail className="md:hidden" />
              <span className="hidden md:block">Subscribe</span>
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
}
