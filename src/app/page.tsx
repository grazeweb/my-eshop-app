
import Link from 'next/link';
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
import { featuredProducts, categories as allCategories } from '@/lib/data';
import Image from 'next/image';
import { ProductCard } from '@/components/product-card';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const teamMembers = [
  {
    name: 'Shahzaib',
    role: 'Founder & Owner',
    quote:
      'As the founder, my vision was to create a seamless and elegant shopping experience. Everything you see here started with a passion for quality and style.',
    avatar: 'S',
    avatarImage: '',
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


export default function Home() {
  return (
    <div className="flex flex-col gap-16 md:gap-24 pb-12">
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
            Discover the latest trends and refresh your wardrobe. High-quality
            fashion at unbeatable prices.
          </p>
          <Button size="lg" className="mt-8" asChild>
            <Link href="/products">
              Shop Now <ArrowRight className="ml-2" />
            </Link>
          </Button>
        </div>
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {teamMembers.map((member, index) => (
            <Card key={index} className="p-6">
              <CardContent className="p-0">
                <Quote className="h-8 w-8 text-muted-foreground mb-4" />
                <p className="text-lg text-muted-foreground mb-6">
                  "{member.quote}"
                </p>
                <div className="flex items-center gap-4">
                  <Avatar>
                    {member.avatarImage ? (
                      <AvatarImage
                        src={member.avatarImage}
                        alt={member.name}
                        data-ai-hint="person portrait"
                      />
                    ) : null}
                    <AvatarFallback>{member.avatar}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{member.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {member.role}
                    </p>
                  </div>
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
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-8 gap-x-4">
          {services.map((service, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center gap-2"
            >
              <div className="bg-muted p-4 rounded-full">
                <service.icon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold mt-2 text-sm md:text-base">{service.title}</h3>
              <p className="text-xs md:text-sm text-muted-foreground">
                {service.description}
              </p>
            </div>
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
