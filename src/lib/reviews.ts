import { db } from './firebase';
import { collection, query, where, getDocs, addDoc, serverTimestamp, orderBy, Timestamp } from 'firebase/firestore';
import type { Review } from './types';

// This type is for creating a new review, as 'id' and 'createdAt' are auto-generated.
export type NewReview = Omit<Review, 'id' | 'createdAt'>;

export async function getReviewsForProduct(productId: string): Promise<Review[]> {
  const reviewsCol = collection(db, 'reviews');
  const q = query(reviewsCol, where('productId', '==', productId), orderBy('createdAt', 'desc'));
  const querySnapshot = await getDocs(q);
  
  const reviews = querySnapshot.docs.map(doc => {
    const data = doc.data();
    return {
      id: doc.id,
      ...data,
      // Ensure createdAt is a Timestamp object, which it should be from Firestore
      createdAt: data.createdAt as Timestamp,
    } as Review;
  });

  return reviews;
}

export async function addReview(reviewData: NewReview): Promise<void> {
    const reviewsCol = collection(db, 'reviews');
    await addDoc(reviewsCol, {
        ...reviewData,
        createdAt: serverTimestamp(),
    });
}
