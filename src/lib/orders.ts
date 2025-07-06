
import { db } from './firebase';
import { collection, query, where, getDocs, addDoc, serverTimestamp, doc, getDoc, orderBy, Timestamp, onSnapshot, Unsubscribe, updateDoc } from 'firebase/firestore';
import type { Order } from './types';
import { updateProductStock, updateProductUnitsSold } from './products';

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

  // Update stock for each item in the order
  for (const item of orderData.items) {
    await updateProductStock(item.id, item.quantity);
  }

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

// Listen for all orders for a specific user
export function listenForUserOrders(
  userId: string,
  callback: (orders: Order[]) => void,
  onError: (error: Error) => void
): Unsubscribe {
  const ordersCol = collection(db, 'orders');
  const q = query(ordersCol, where('userId', '==', userId), orderBy('createdAt', 'desc'));

  const unsubscribe = onSnapshot(q, 
    (querySnapshot) => {
      const orders = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Order));
      callback(orders);
    },
    (error) => {
      console.error("Error listening for user orders:", error);
      onError(error);
    }
  );

  return unsubscribe;
}

// Listen for all orders (for admin)
export function listenForAllOrders(
  callback: (orders: Order[]) => void,
  onError: (error: Error) => void
): Unsubscribe {
  const ordersCol = collection(db, 'orders');
  const q = query(ordersCol, orderBy('createdAt', 'desc'));

  const unsubscribe = onSnapshot(q, 
    (querySnapshot) => {
      const orders = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Order));
      callback(orders);
    },
    (error) => {
      console.error("Error listening for orders:", error);
      onError(error);
    }
  );

  return unsubscribe;
}

// Update an order's status (for admin)
export async function updateOrderStatus(orderId: string, status: Order['status']): Promise<void> {
    const orderRef = doc(db, 'orders', orderId);
    await updateDoc(orderRef, { status });

    // If order is delivered, update the unitsSold for each product
    if (status === 'Delivered') {
        const order = await getOrderById(orderId);
        if (order) {
            for (const item of order.items) {
                await updateProductUnitsSold(item.id, item.quantity);
            }
        }
    }
}
