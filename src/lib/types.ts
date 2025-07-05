
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
  id: string;
  name: string;
  description: string;
  price: number;
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

export interface Order {
  id:string;
  date: string;
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  total: number;
  items: {
    product: Product;
    quantity: number;
  }[];
}
