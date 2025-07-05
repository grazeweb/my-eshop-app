
import { db, storage } from './firebase';
import { collection, query, addDoc, getDocs, getDoc, doc, onSnapshot, Unsubscribe, orderBy, where } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import type { Product, NewProduct } from './types';

// Listen for real-time updates on products
export function listenForProducts(
  callback: (products: Product[]) => void,
  onError: (error: Error) => void
): Unsubscribe {
  const productsCol = collection(db, 'products');
  const q = query(productsCol, orderBy('name'));

  const unsubscribe = onSnapshot(q, 
    (querySnapshot) => {
      const products = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Product));
      callback(products);
    },
    (error) => {
      console.error("Error listening for products:", error);
      onError(error);
    }
  );

  return unsubscribe;
}

// Get all products once
export async function getProducts(options?: { featured?: boolean }): Promise<Product[]> {
    const productsCol = collection(db, 'products');
    let q = query(productsCol);
    if (options?.featured) {
        q = query(q, where('featured', '==', true));
    }
    const productSnapshot = await getDocs(q);
    const productList = productSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    } as Product));

    return productList;
}

// Get a single product by ID
export async function getProduct(id: string): Promise<Product | null> {
    if (!id) return null;
    const productDocRef = doc(db, 'products', id);
    const productSnap = await getDoc(productDocRef);

    if (productSnap.exists()) {
        return { id: productSnap.id, ...productSnap.data() } as Product;
    } else {
        console.warn(`Product with id ${id} not found.`);
        return null;
    }
}


// Add a new product
export async function addProduct(productData: NewProduct): Promise<void> {
    const productsCol = collection(db, 'products');
    await addDoc(productsCol, productData);
}

// Upload a product image and return the URL
export async function uploadProductImage(file: File): Promise<string> {
    if (!file) {
        throw new Error("No file provided for upload.");
    }
    const storageRef = ref(storage, `products/${Date.now()}-${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
}
