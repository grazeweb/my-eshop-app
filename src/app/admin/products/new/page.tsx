
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ProductForm } from '../product-form';
import { addProduct } from '@/lib/products';
import { categories } from '@/lib/data'; 
import { useToast } from '@/hooks/use-toast';

type ProductFormData = {
  name: string;
  description: string;
  price: number;
  categoryId: string;
  image: string;
};


export default function NewProductPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: ProductFormData) => {
    setIsSubmitting(true);
    try {
      const newProductData = {
          ...data,
          originalPrice: 0,
          badge: '',
          images: [data.image],
          featured: false,
          rating: 0,
      };
      await addProduct(newProductData);
      toast({ title: "Product created successfully!" });
      router.push('/admin/products');
    } catch (error) {
      console.error("Failed to create product:", error);
      toast({
        variant: "destructive",
        title: "Error creating product",
        description: "Something went wrong. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ProductForm 
      categories={categories}
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
    />
  );
}
