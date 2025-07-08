
"use client";

import Link from 'next/link';
import React from 'react';
import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  Quote,
  Truck,
  Rocket,
  Headset,
  Undo2,
  CircleDollarSign,
} from 'lucide-react';
import { categories as allCategories } from '@/lib/data';
import Image from 'next/image';
import { ProductCard } from '@/components/product-card';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getProducts } from '@/lib/products';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import type { Product } from '@/lib/types';

const teamMembers = [
  {
    name: 'Shahzaib',
    role: 'Founder & Owner',
    quote:
      'As the founder, my vision was to create a seamless and elegant shopping experience. Everything you see here started with a passion for quality and style.',
    avatar: 'S',
    avatarImage: 'https://placehold.co/100x100.png',
  },
  {
    name: 'Asra',
    role: 'Product Manager',
    quote:
      'My focus is on our products and making sure everything runs smoothly behind the scenes, so your shopping experience is nothing short of perfect.',
    avatar: 'A',
    avatarImage: 'https://placehold.co/100x100.png',
  },
  {
    name: 'Yusra',
    role: 'Support & Coordination',
    quote:
      "I'm here to support our team and you. From organizing tasks to addressing user needs, I help keep everything coordinated and on track.",
    avatar: 'Y',
    avatarImage: 'https://placehold.co/100x100.png',
  },
  {
    name: 'Shammer',
    role: 'Team Member',
    quote:
      'As a dedicated member of the team, I contribute to building and continuously improving the website to make it better for our users every day.',
    avatar: 'S',
    avatarImage: 'https://placehold.co/100x100.png',
  },
];

const services = [
  {
    icon: Truck,
    title: 'Pakistan-wide Delivery',
    description: 'For Orders Across Pakistan',
  },
  {
    icon: Rocket,
    title: 'Next Day Delivery',
    description: 'Major Cities Only',
  },
  {
    icon: Headset,
    title: 'Best Online Support',
    description: 'Hours: 9AM - 11PM',
  },
  {
    icon: Undo2,
    title: 'Return Policy',
    description: 'Easy & Free Return',
  },
  {
    icon: CircleDollarSign,
    title: '30% Money Back',
    description: 'For Order Over $100',
  },
];

const categorySlugs = ['apparel', 'accessories', 'footwear', 'home-goods'];
const shopCategories = allCategories.filter((c) =>
  categorySlugs.includes(c.id)
).sort((a, b) => categorySlugs.indexOf(a.id) - categorySlugs.indexOf(b.id));

const heroSlides = [
  {
    title: "Summer Collection is Here",
    description: "Discover the latest trends and refresh your wardrobe. High-quality fashion at unbeatable prices.",
    image: "https://placehold.co/1600x900.png",
    imageHint: "fashion clothes",
    link: "/products"
  },
  {
    title: "New Tech Gadgets",
    description: "Explore the cutting-edge of technology. Upgrade your life with the latest devices.",
    image: "https://placehold.co/1600x900.png",
    imageHint: "tech gadgets",
    link: "/products?category=electronics"
  },
  {
    title: "Cozy Home Essentials",
    description: "Transform your space with our curated collection of home goods.",
    image: "https://placehold.co/1600x900.png",
    imageHint: "home decor",
    link: "/products?category=home-goods"
  }
];

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = React.useState<Product[]>([]);
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  React.useEffect(() => {
    async function fetchFeaturedProducts() {
      const products = await getProducts({ featured: true });
      setFeaturedProducts(products);
    }
    fetchFeaturedProducts();
  }, []);

  return (
    <div className="flex flex-col gap-16 md:gap-24 pb-12">
      <section className="relative w-full">
        <Carousel
          plugins={[plugin.current]}
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
          className="w-full"
          opts={{ loop: true }}
        >
          <CarouselContent>
            {heroSlides.map((slide, index) => (
              <CarouselItem key={index}>
                <div className="relative h-[60vh] md:h-[70vh] w-full flex items-center justify-center text-center text-white bg-gray-800">
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    style={{ objectFit: 'cover' }}
                    className="absolute inset-0 z-0 opacity-40"
                    data-ai-hint={slide.imageHint}
                  />
                  <div className="relative z-10 p-4">
                    <h1 className="text-4xl md:text-6xl font-headline font-bold drop-shadow-lg">
                      {slide.title}
                    </h1>
                    <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto drop-shadow-md">
                      {slide.description}
                    </p>
                    <Button size="lg" className="mt-8" asChild>
                      <Link href={slide.link}>
                        Shop Now <ArrowRight className="ml-2" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-20 hidden md:flex" />
          <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-20 hidden md:flex" />
        </Carousel>
      </section>

      <section className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center font-headline">
          Featured Products
        </h2>
        <p className="text-center text-muted-foreground mt-2 mb-8">
          Check out our hand-picked selection of best-selling items.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Meet Our Team */}
      <section className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center font-headline mb-12">
          Meet Our Team
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <Card key={index} className="flex flex-col text-center transition-all hover:shadow-lg hover:-translate-y-1">
              <CardContent className="p-8 flex flex-col flex-grow">
                 <Avatar className="w-24 h-24 mx-auto mb-4">
                    {member.avatarImage ? (
                      <AvatarImage
                        src={member.avatarImage}
                        alt={member.name}
                        data-ai-hint="person portrait"
                      />
                    ) : null}
                    <AvatarFallback>{member.avatar}</AvatarFallback>
                  </Avatar>
                <div className="flex-grow">
                   <p className="font-semibold text-lg">{member.name}</p>
                    <p className="text-sm text-primary mb-4">
                      {member.role}
                    </p>
                  <Quote className="h-6 w-6 text-gray-300 dark:text-gray-600 mb-2 mx-auto" />
                  <p className="text-sm text-muted-foreground">
                    "{member.quote}"
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Our Services */}
      <section className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center font-headline mb-12">
          Our Services
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {services.map((service, index) => (
            <Card key={index} className="text-center flex flex-col items-center p-6 transition-all hover:border-primary hover:shadow-lg">
                <div className="bg-muted p-4 rounded-full mb-4">
                  <service.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-base">{service.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {service.description}
                </p>
            </Card>
          ))}
        </div>
      </section>

      {/* Shop by Category */}
      <section className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center font-headline mb-12">
          Shop by Category
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {shopCategories.map((category) => (
            <Link
              key={category.id}
              href={`/products?category=${category.id}`}
              className="group relative block aspect-square overflow-hidden rounded-lg"
            >
              <Image
                src={`https://placehold.co/400x400.png`}
                alt={category.name}
                fill
                style={{ objectFit: 'cover' }}
                className="transition-transform duration-300 group-hover:scale-110"
                data-ai-hint={`${category.name.toLowerCase()} products`}
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <h3 className="text-white text-2xl font-bold">
                  {category.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
