
import { db } from './firebase';
import { collection, query, where, getDocs, addDoc, serverTimestamp, doc, getDoc, orderBy, limit, Timestamp } from 'firebase/firestore';
import type { Order } from './types';

// This type is for creating a new order, as 'id' and 'createdAt' are auto-generated.
export type NewOrder = Omit<Order, 'id' | 'createdAt' | 'status'>;

// Create a new order
export async function createOrder(orderData: NewOrder): Promise<string> {
  const ordersCol = collection(db, 'orders');
  const docRef = await addDoc(ordersCol, {
    ...orderData,
    status: 'Processing',
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

// Get all orders for a specific user
export async function getOrdersForUser(userId: string): Promise<Order[]> {
    if (!userId) return [];
    const ordersCol = collection(db, 'orders');
    const q = query(ordersCol, where('userId', '==', userId), orderBy('createdAt', 'desc'));
    const orderSnapshot = await getDocs(q);
    return orderSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    } as Order));
}

// Get a single order by ID
export async function getOrderById(orderId: string): Promise<Order | null> {
    if (!orderId) return null;
    const orderDocRef = doc(db, 'orders', orderId);
    const orderSnap = await getDoc(orderDocRef);

    if (orderSnap.exists()) {
        return { id: orderSnap.id, ...orderSnap.data() } as Order;
    } else {
        console.warn(`Order with id ${orderId} not found.`);
        return null;
    }
}

// Check if a user has purchased a specific product and it has been delivered
export async function checkIfUserPurchasedProduct(userId: string, productId: string): Promise<boolean> {
    if (!userId || !productId) return false;

    const ordersCol = collection(db, 'orders');
    const q = query(
        ordersCol,
        where('userId', '==', userId),
        where('status', '==', 'Delivered'),
        // Firestore doesn't support array-contains-any with multiple fields, so we fetch and filter in code
    );
    
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
        return false;
    }

    for (const doc of querySnapshot.docs) {
        const order = doc.data() as Order;
        if (order.items.some(item => item.id === productId)) {
            return true;
        }
    }

    return false;
}

// Get total number of orders for a user
export async function getOrderCountForUser(userId: string): Promise<number> {
    if (!userId) return 0;
    const ordersCol = collection(db, 'orders');
    const q = query(ordersCol, where('userId', '==', userId));
    const snapshot = await getDocs(q);
    return snapshot.size;
}

// Get total number of products bought by a user
export async function getProductsBoughtCountForUser(userId: string): Promise<number> {
    if (!userId) return 0;
    const orders = await getOrdersForUser(userId);
    return orders.reduce((acc, order) => acc + order.items.reduce((itemAcc, item) => itemAcc + item.quantity, 0), 0);
}
