
import { db } from './firebase';
import { doc, getDoc, setDoc, collection, onSnapshot, Unsubscribe, query } from 'firebase/firestore';
import type { UserProfile, ShippingAddress } from './types';

// Function to create a user profile document in Firestore
export async function createUserProfile(userId: string, profileData: Omit<UserProfile, 'address'>): Promise<void> {
    const userRef = doc(db, 'users', userId);
    const docSnap = await getDoc(userRef);

    if (!docSnap.exists()) {
        await setDoc(userRef, profileData);
    }
}

// Get a user's profile
export async function getUserProfile(userId: string): Promise<UserProfile | null> {
    if (!userId) return null;
    const userRef = doc(db, 'users', userId);
    const docSnap = await getDoc(userRef);

    if (docSnap.exists()) {
        return docSnap.data() as UserProfile;
    } else {
        return null;
    }
}

// Save or update a user's shipping address
export async function saveUserAddress(userId: string, address: ShippingAddress): Promise<void> {
    if (!userId) return;
    const userRef = doc(db, 'users', userId);
    // Use set with merge:true to create doc if it doesn't exist, or update if it does.
    await setDoc(userRef, { address }, { merge: true });
}

// Listen for all user profiles (for admin)
export function listenForAllUserProfiles(
  callback: (profiles: UserProfile[]) => void,
  onError: (error: Error) => void
): Unsubscribe {
  const usersCol = collection(db, 'users');
  const q = query(usersCol);

  const unsubscribe = onSnapshot(q,
    (querySnapshot) => {
      const profiles = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as UserProfile));
      callback(profiles);
    },
    (error) => {
      console.error("Error listening for user profiles:", error);
      onError(error);
    }
  );

  return unsubscribe;
}
