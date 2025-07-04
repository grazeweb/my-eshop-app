
"use client";

import { useState, useMemo, useEffect, useCallback } from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { products } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Star, ShoppingCart, Heart, Minus, Plus } from 'lucide-react';
import { ProductCard } from '@/components/product-card';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { ProductReviews } from '@/components/product-reviews';
import type { Review } from '@/lib/types';
import { getReviewsForProduct } from '@/lib/reviews';

export default function ProductPage({ params }: { params: { id:string } }) {
  const product = products.find((p) => p.id === params.id);
  
  const [selectedImage, setSelectedImage] = useState(product?.images[0] ?? product?.image ?? '');
  const [quantity, setQuantity] = useState(1);
  const [isWished, setIsWished] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);

  const fetchReviews = useCallback(async () => {
    if (!product) return;
    setReviewsLoading(true);
    try {
        const fetchedReviews = await getReviewsForProduct(product.id);
        setReviews(fetchedReviews);
    } catch (error) {
        console.error("Failed to fetch reviews", error);
    } finally {
        setReviewsLoading(false);
    }
  }, [product]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  if (!product) {
    notFound();
  }

  const relatedProducts = products
    .filter((p) => p.categoryId === product.categoryId && p.id !== product.id)
    .slice(0, 4);

  const { averageRating, totalReviews } = useMemo(() => {
    if (reviews.length === 0) {
        return { averageRating: product.rating, totalReviews: 0 };
    }
    const total = reviews.reduce((acc, review) => acc + review.rating, 0);
    return {
        averageRating: total / reviews.length,
        totalReviews: reviews.length,
    };
  }, [reviews, product.rating]);

  const handleQuantityChange = (amount: number) => {
    setQuantity(prev => {
        const newQuantity = prev + amount;
        if (newQuantity < 1) return 1;
        return newQuantity;
    });
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        <div>
          {/* Main Image */}
          <div className="aspect-square relative rounded-lg overflow-hidden border group mb-4">
            <Image
              src={selectedImage}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
              data-ai-hint="product image"
            />
          </div>
          {/* Thumbnails */}
          <div className="grid grid-cols-5 gap-2">
            {product.images.map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(img)}
                className={cn(
                  'aspect-square relative rounded-md overflow-hidden border-2 transition',
                  selectedImage === img ? 'border-primary' : 'border-transparent'
                )}
              >
                <Image
                  src={img}
                  alt={`${product.name} thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                  data-ai-hint="product image"
                />
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-col">
          <h1 className="text-3xl md:text-4xl font-bold font-headline">{product.name}</h1>
          <div className="flex items-center gap-4 mt-4">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${i < Math.round(averageRating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                />
              ))}
            </div>
            <a href="#reviews" className="text-sm text-muted-foreground hover:underline">
              {totalReviews > 0 ? `${totalReviews} reviews` : 'No reviews yet'}
            </a>
          </div>
          <p className="text-3xl font-bold mt-6">${product.price.toFixed(2)}</p>
          <p className="mt-4 text-muted-foreground leading-relaxed">{product.description}</p>
          
          <Separator className="my-8" />
          
          <div className="flex flex-col gap-6">
            <div>
                <h3 className="text-sm font-medium mb-2">Quantity</h3>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" className="h-9 w-9" onClick={() => handleQuantityChange(-1)}><Minus className="h-4 w-4"/></Button>
                    <Input type="number" value={quantity} className="w-16 h-9 text-center" readOnly />
                    <Button variant="outline" size="icon" className="h-9 w-9" onClick={() => handleQuantityChange(1)}><Plus className="h-4 w-4"/></Button>
                </div>
            </div>

            <div className="flex items-stretch gap-4">
                <Button size="lg" className="flex-grow">
                <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
                </Button>
                <Button variant="outline" size="icon" className="w-12 h-auto" onClick={() => setIsWished(!isWished)}>
                    <Heart className={cn("h-6 w-6 transition-colors", isWished && "fill-destructive text-destructive")} />
                </Button>
            </div>
          </div>

        </div>
      </div>

      <div id="reviews">
        <ProductReviews
          productId={product.id}
          reviews={reviews} 
          averageRating={averageRating} 
          totalReviews={totalReviews} 
          reviewsLoading={reviewsLoading}
          onReviewSubmitted={fetchReviews}
        />
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
