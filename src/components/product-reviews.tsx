
"use client"

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Star, MessageSquare, Loader2 } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { Review } from '@/lib/types';
import { useAuth } from '@/contexts/auth-context';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { NewReview, addReview } from '@/lib/reviews';
import { formatDistanceToNow } from 'date-fns';


interface ProductReviewsProps {
  productId: string;
  reviews: Review[];
  averageRating: number;
  totalReviews: number;
  reviewsLoading: boolean;
}

const StarRating = ({ rating, size = 'md' }: { rating: number, size?: 'sm' | 'md' }) => {
  const starSize = size === 'sm' ? 'w-4 h-4' : 'w-5 h-5';
  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`${starSize} ${i < Math.round(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
        />
      ))}
    </div>
  );
};

export function ProductReviews({ productId, reviews, averageRating, totalReviews, reviewsLoading }: ProductReviewsProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [newRating, setNewRating] = useState(0);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewContent, setReviewContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const ratingDistribution = [5, 4, 3, 2, 1].map(star => {
    const count = reviews.filter(r => r.rating === star).length;
    return {
      star,
      count,
      percentage: totalReviews > 0 ? (count / totalReviews) * 100 : 0,
    };
  });

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
        toast({ variant: 'destructive', title: 'Authentication required', description: 'You must be logged in to submit a review.' });
        return;
    }
    if (newRating === 0 || !reviewTitle.trim() || !reviewContent.trim()) {
        toast({ variant: 'destructive', title: 'Incomplete review', description: 'Please provide a rating, title, and content.' });
        return;
    }

    setIsSubmitting(true);
    try {
        const reviewData: NewReview = {
            authorId: user.uid,
            authorName: user.displayName || 'Anonymous User',
            authorAvatar: user.photoURL,
            productId,
            rating: newRating,
            title: reviewTitle,
            content: reviewContent,
        };

        await addReview(reviewData);

        toast({ title: 'Review submitted!', description: 'Thank you for your feedback.' });
        
        // Reset form and close dialog. The snapshot listener will update the list.
        setNewRating(0);
        setReviewTitle('');
        setReviewContent('');
        setIsDialogOpen(false);

    } catch (error) {
        console.error(error);
        toast({ variant: 'destructive', title: 'Submission Failed', description: 'Could not submit your review. Please try again later.' });
    } finally {
        setIsSubmitting(false);
    }
  };


  return (
    <div className="mt-16 md:mt-24">
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <h3 className="text-xl font-semibold mb-4">Customer Reviews</h3>
          <div className="flex items-center gap-2 mb-2">
            <StarRating rating={averageRating} />
            <span className="font-bold text-lg">{averageRating.toFixed(1)}</span>
          </div>
          <p className="text-sm text-muted-foreground mb-4">Based on {totalReviews} reviews</p>
          <div className="space-y-2">
            {ratingDistribution.map(item => (
              <div key={item.star} className="flex items-center gap-2 text-sm">
                <span className="w-12">{item.star} star</span>
                <Progress value={item.percentage} className="w-full h-2" />
                <span className="w-8 text-right">{item.count}</span>
              </div>
            ))}
          </div>
          <Separator className="my-6" />
          <h4 className="font-semibold mb-2">Share your thoughts</h4>
          <p className="text-sm text-muted-foreground mb-4">If you've used this product, share your thoughts with other customers.</p>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full">Write a customer review</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Write a review</DialogTitle>
              </DialogHeader>
              {user ? (
                <form onSubmit={handleReviewSubmit} className="space-y-4">
                  <div>
                    <Label>Your rating</Label>
                    <div className="flex items-center gap-1 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <button key={i} type="button" onClick={() => setNewRating(i + 1)}>
                          <Star className={cn("w-6 h-6 cursor-pointer transition-colors", i < newRating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 hover:text-yellow-300')} />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="review-title">Review title</Label>
                    <Input id="review-title" placeholder="Give your review a title" value={reviewTitle} onChange={e => setReviewTitle(e.target.value)} required />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="review-content">Your review</Label>
                    <Textarea id="review-content" placeholder="Write your thoughts here..." rows={5} value={reviewContent} onChange={e => setReviewContent(e.target.value)} required />
                  </div>
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Submit Review
                  </Button>
                </form>
              ) : (
                <div className="text-center py-4">
                  <p className="mb-4">You must be logged in to write a review.</p>
                  <Button asChild><Link href="/login">Login</Link></Button>
                </div>
              )}
            </DialogContent>
          </Dialog>

        </div>
        <div className="md:col-span-2">
          {reviewsLoading ? (
            <div className="flex flex-col items-center justify-center text-center p-12 border border-dashed rounded-lg min-h-[300px]">
                <Loader2 className="w-12 h-12 text-muted-foreground animate-spin" />
                <h3 className="text-xl font-semibold mt-4">Loading Reviews...</h3>
            </div>
          ) : reviews.length > 0 ? (
            <div className="space-y-8">
              {reviews.map(review => (
                <div key={review.id} className="flex gap-4">
                  <Avatar>
                    <AvatarImage src={review.authorAvatar ?? ''} alt={review.authorName} data-ai-hint="person portrait"/>
                    <AvatarFallback>{review.authorName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-grow">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold">{review.authorName}</p>
                      <span className="text-xs text-muted-foreground">
                        {review.createdAt ? formatDistanceToNow(review.createdAt.toDate(), { addSuffix: true }) : ''}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 my-1">
                      <StarRating rating={review.rating} size="sm" />
                      <h4 className="font-medium">{review.title}</h4>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{review.content}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center p-12 border border-dashed rounded-lg min-h-[300px]">
              <MessageSquare className="w-12 h-12 text-muted-foreground" />
              <h3 className="text-xl font-semibold mt-4">No Reviews Yet</h3>
              <p className="text-muted-foreground mt-1">Be the first to share your thoughts on this product.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
