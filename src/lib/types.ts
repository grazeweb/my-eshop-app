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

export interface Category {
  id: string;
  name: string;
}

export interface Order {
  id: string;
  date: string;
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  total: number;
  items: {
    product: Product;
    quantity: number;
  }[];
}
