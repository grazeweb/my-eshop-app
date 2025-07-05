
'use server';

import { db } from './firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import type { UserProfile, ShippingAddress } from './types';
import type { User } from 'firebase/auth';

// Function to create a user profile document in Firestore
export async function createUserProfile(user: User, displayName: string): Promise<void> {
    const userRef = doc(db, 'users', user.uid);
    const docSnap = await getDoc(userRef);

    if (!docSnap.exists()) {
        await setDoc(userRef, {
            id: user.uid,
            displayName: displayName,
            email: user.email,
        });
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
