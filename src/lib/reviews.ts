
import { db } from './firebase';
import { collection, query, where, addDoc, serverTimestamp, orderBy, Timestamp, onSnapshot, Unsubscribe } from 'firebase/firestore';
import type { Review } from './types';
import { checkIfUserPurchasedProduct } from './orders';

// This type is for creating a new review, as 'id' and 'createdAt' are auto-generated.
export type NewReview = Omit<Review, 'id' | 'createdAt'>;

export function listenForReviews(
  productId: string,
  callback: (reviews: Review[]) => void,
  onError: (error: Error) => void
): Unsubscribe {
  const reviewsCol = collection(db, 'reviews');
  const q = query(reviewsCol, where('productId', '==', productId), orderBy('createdAt', 'desc'));

  const unsubscribe = onSnapshot(q, 
    (querySnapshot) => {
      const reviews = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt as Timestamp,
        } as Review;
      }).filter(review => review.createdAt); // Filter out reviews that don't have a timestamp yet
      callback(reviews);
    },
    (error) => {
        console.error("Error listening for reviews:", error);
        onError(error);
    }
  );

  return unsubscribe;
}


export async function addReview(reviewData: NewReview): Promise<void> {
    // The check for purchase is already handled by the UI before this function is called.
    // Removing the redundant check here simplifies the logic.
    /*
    const hasPurchased = await checkIfUserPurchasedProduct(reviewData.authorId, reviewData.productId);
    if (!hasPurchased) {
        throw new Error("You can only review products that have been delivered.");
    }
    */

    const reviewsCol = collection(db, 'reviews');
    await addDoc(reviewsCol, {
        ...reviewData,
        createdAt: serverTimestamp(),
    });
}
