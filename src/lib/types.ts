
import type { Timestamp } from 'firebase/firestore';

export interface Review {
  id: string; // Firestore document ID
  authorId: string;
  authorName: string;
  authorAvatar?: string | null;
  productId: string;
  rating: number;
  title: string;
  content: string;
  createdAt: Timestamp;
}

export interface Product {
  id:string;
  name: string;
  description: string;
  price: number;
  shippingFee: number;
  originalPrice?: number;
  badge?: string;
  image: string;
  images: string[];
  categoryId: string;
  featured: boolean;
  rating: number;
}

export type NewProduct = Omit<Product, 'id'>;

export interface Category {
  id: string;
  name: string;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  shippingFee: number;
}

export interface ShippingAddress {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    zip: string;
}

export interface UserProfile {
    id: string; // Corresponds to Firebase Auth UID
    displayName: string;
    email: string;
    address?: ShippingAddress;
}
  
export interface Order {
  id: string; // Firestore document ID
  userId: string;
  customerName: string;
  customerEmail: string;
  items: CartItem[];
  totalAmount: number;
  shippingAddress: ShippingAddress;
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  paymentMethod: 'Cash on Delivery';
  createdAt: Timestamp;
}
