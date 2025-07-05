
import type { Product, Category, Order } from './types';

export const categories: Category[] = [
  { id: 'electronics', name: 'Electronics' },
  { id: 'apparel', name: 'Apparel' },
  { id: 'books', name: 'Books' },
  { id: 'home-goods', name: 'Home Goods' },
  { id: 'accessories', name: 'Accessories' },
  { id: 'footwear', name: 'Footwear' },
];

export const orders: Order[] = [
    {
      id: 'ORD001',
      date: '2023-10-26',
      status: 'Delivered',
      total: 119.98,
      items: [
        { product: { id: '1', name: 'Wireless Bluetooth Headphones', description: '', price: 99.99, originalPrice: 129.99, badge: 'Sale', image: 'https://placehold.co/600x600.png', images: ['https://placehold.co/600x600.png'], categoryId: 'electronics', featured: true, rating: 4.5 }, quantity: 1 },
        { product: { id: '2', name: 'Men\'s Classic T-Shirt', description: '', price: 19.99, image: 'https://placehold.co/600x600.png', images: ['https://placehold.co/600x600.png'], categoryId: 'apparel', featured: true, rating: 4.8 }, quantity: 1 },
      ],
    },
    {
      id: 'ORD002',
      date: '2023-10-28',
      status: 'Shipped',
      total: 49.99,
      items: [{ product: { id: '5', name: 'Women\'s Yoga Pants', description: '', price: 49.99, badge: 'New', image: 'https://placehold.co/600x600.png', images: ['https://placehold.co/600x600.png'], categoryId: 'apparel', featured: true, rating: 4.9 }, quantity: 1 }],
    },
    {
      id: 'ORD003',
      date: '2023-11-01',
      status: 'Processing',
      total: 16.99,
      items: [{ product: { id: '7', name: 'Atomic Habits', description: '', price: 16.99, image: 'https://placehold.co/600x600.png', images: ['https://placehold.co/600x600.png'], categoryId: 'books', featured: true, rating: 4.9 }, quantity: 1 }],
    },
  ];
