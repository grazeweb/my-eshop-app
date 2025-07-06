
"use client";

import { useState, useMemo, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Star, ShoppingCart, Heart, Minus, Plus, Loader2 } from 'lucide-react';
import { ProductCard } from '@/components/product-card';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { ProductReviews } from '@/components/product-reviews';
import type { Review, Product } from '@/lib/types';
import { listenForReviews } from '@/lib/reviews';
import { getProduct, getProducts } from '@/lib/products';
import { useAuth } from '@/contexts/auth-context';
import { checkIfUserPurchasedProduct, getOrderCountForUser } from '@/lib/orders';
import { useCart } from '@/contexts/cart-context';
import { useToast } from '@/hooks/use-toast';
import { listenForWishlist, addToWishlist, removeFromWishlist } from '@/lib/wishlist';

export default function ProductPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { user } = useAuth();
  const { addToCart } = useCart();
  const { toast } = useToast();

  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  
  const [selectedImage, setSelectedImage] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isWished, setIsWished] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);

  const [hasPurchased, setHasPurchased] = useState(false);
  const [purchaseStatusLoading, setPurchaseStatusLoading] = useState(true);

  const { totalReviews, averageRating } = useMemo(() => {
    const totalReviews = reviews.length;
    if (totalReviews === 0) {
      return { totalReviews: 0, averageRating: 0 };
    }
    const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
    return {
      totalReviews,
      averageRating: totalRating / totalReviews,
    };
  }, [reviews]);

  useEffect(() => {
    async function loadProductData() {
        if (!params.id) return;
        
        const fetchedProduct = await getProduct(params.id);
        
        if (fetchedProduct) {
            setProduct(fetchedProduct);
            setSelectedImage(fetchedProduct.images?.[0] || fetchedProduct.image || '');

            const allProducts = await getProducts();
            const related = allProducts
                .filter((p) => p.categoryId === fetchedProduct.categoryId && p.id !== fetchedProduct.id)
                .slice(0, 4);
            setRelatedProducts(related);
        } else {
            console.error("Product not found");
        }
    }
    loadProductData();
  }, [params.id]);


  useEffect(() => {
    if (!params.id) return;
    
    setReviewsLoading(true);
    const unsubscribe = listenForReviews(
        params.id, 
        (fetchedReviews) => {
            setReviews(fetchedReviews);
            setReviewsLoading(false);
        },
        (error) => {
            console.error("Failed to load reviews:", error);
            setReviewsLoading(false);
        }
    );

    return () => unsubscribe();
  }, [params.id]);

  useEffect(() => {
    if (!user || !product) {
      setIsWished(false);
      return;
    };

    const unsubscribe = listenForWishlist(user.uid, (productIds) => {
        setIsWished(productIds.includes(product.id));
    });

    return () => unsubscribe();
  }, [user, product]);


  useEffect(() => {
    async function checkPurchase() {
      if (user && product) {
        setPurchaseStatusLoading(true);
        const purchased = await checkIfUserPurchasedProduct(user.uid, product.id);
        setHasPurchased(purchased);
        setPurchaseStatusLoading(false);
      } else {
        setHasPurchased(false);
        setPurchaseStatusLoading(false);
      }
    }
    checkPurchase();
  }, [user, product]);

  const handleWishlistToggle = async () => {
    if (!user) {
        toast({
            variant: "destructive",
            title: "Please login",
            description: "You need to be logged in to manage your wishlist.",
        });
        router.push('/login');
        return;
    }
    if (!product) return;

    try {
        if (isWished) {
            await removeFromWishlist(user.uid, product.id);
            toast({ title: "Removed from wishlist" });
        } else {
            await addToWishlist(user.uid, product.id);
            toast({ title: "Added to wishlist" });
        }
    } catch (error) {
        console.error("Failed to update wishlist:", error);
        toast({ variant: "destructive", title: "Something went wrong" });
    }
  }


  const handleQuantityChange = (amount: number) => {
    setQuantity(prev => {
        const newQuantity = prev + amount;
        if (newQuantity < 1) return 1;
        return newQuantity;
    });
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-16 w-16 animate-spin" />
      </div>
    );
  }
  
  const mainImageSrc =
    selectedImage &&
    (selectedImage.startsWith("http://") || selectedImage.startsWith("https://"))
      ? selectedImage
      : "https://placehold.co/600x600.png";

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        <div>
          {/* Main Image */}
          <div className="aspect-square relative rounded-lg overflow-hidden border group mb-4">
            <Image
              src={mainImageSrc}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
              data-ai-hint="product image"
            />
          </div>
          {/* Thumbnails */}
          <div className="grid grid-cols-5 gap-2">
            {(product.images ?? []).map((img, index) => {
              const imageSrc =
                img && (img.startsWith("http://") || img.startsWith("https://"))
                  ? img
                  : "https://placehold.co/100x100.png";
              return (
                <button
                  key={index}
                  onClick={() => setSelectedImage(img)}
                  className={cn(
                    'aspect-square relative rounded-md overflow-hidden border-2 transition-all active:scale-95',
                    selectedImage === img ? 'border-primary' : 'border-transparent'
                  )}
                >
                  <Image
                    src={imageSrc}
                    alt={`${product.name} thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                    data-ai-hint="product image"
                  />
                </button>
              )
            })}
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
            <a href="#reviews" className="text-sm text-muted-foreground hover:underline inline-block transition-transform active:scale-95">
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
                <Button size="lg" className="flex-grow" onClick={() => addToCart(product, quantity)}>
                    <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
                </Button>
                <Button variant="outline" size="icon" className="w-12 h-auto" onClick={handleWishlistToggle}>
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
          reviewsLoading={reviewsLoading}
          hasPurchased={hasPurchased}
          purchaseStatusLoading={purchaseStatusLoading}
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
