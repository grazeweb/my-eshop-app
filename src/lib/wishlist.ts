
import { db } from './firebase';
import { doc, getDoc, setDoc, updateDoc, arrayUnion, arrayRemove, Unsubscribe, onSnapshot } from 'firebase/firestore';

// Get a user's wishlist (product IDs)
export async function getWishlist(userId: string): Promise<string[]> {
  const wishlistRef = doc(db, 'wishlists', userId);
  const wishlistSnap = await getDoc(wishlistRef);
  if (wishlistSnap.exists()) {
    return wishlistSnap.data().productIds || [];
  }
  return [];
}

// Add an item to the user's wishlist
export async function addToWishlist(userId: string, productId: string): Promise<void> {
  const wishlistRef = doc(db, 'wishlists', userId);
  const wishlistSnap = await getDoc(wishlistRef);

  if (wishlistSnap.exists()) {
    await updateDoc(wishlistRef, {
      productIds: arrayUnion(productId)
    });
  } else {
    await setDoc(wishlistRef, { productIds: [productId] });
  }
}

// Remove an item from the user's wishlist
export async function removeFromWishlist(userId: string, productId: string): Promise<void> {
  const wishlistRef = doc(db, 'wishlists', userId);
  await updateDoc(wishlistRef, {
    productIds: arrayRemove(productId)
  });
}

// Check if a product is in the user's wishlist
export async function isInWishlist(userId: string, productId: string): Promise<boolean> {
  const wishlist = await getWishlist(userId);
  return wishlist.includes(productId);
}

// Listen for real-time updates on a user's wishlist
export function listenForWishlist(
  userId: string,
  callback: (productIds: string[]) => void
): Unsubscribe {
  const wishlistRef = doc(db, 'wishlists', userId);
  const unsubscribe = onSnapshot(wishlistRef, (docSnap) => {
    if (docSnap.exists()) {
      callback(docSnap.data().productIds || []);
    } else {
      callback([]);
    }
  });
  return unsubscribe;
}
