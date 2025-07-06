
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ProductForm, type ProductFormValues } from '../product-form';
import { addProduct, uploadProductImage } from '@/lib/products';
import { categories } from '@/lib/data'; 
import { useToast } from '@/hooks/use-toast';

export default function NewProductPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: ProductFormValues) => {
    setIsSubmitting(true);
    try {
      const imageFile = data.image[0];
      const imageUrl = await uploadProductImage(imageFile);

      const newProductData = {
          name: data.name,
          description: data.description,
          price: data.price,
          shippingFee: data.shippingFee,
          categoryId: data.categoryId,
          image: imageUrl,
          originalPrice: 0,
          badge: '',
          images: [imageUrl],
          featured: false,
          rating: 0,
          stock: data.stock,
          unitsSold: 0,
      };
      await addProduct(newProductData);
      toast({ title: "Product created successfully!" });
      router.push('/admin/products');
    } catch (error) {
      console.error("Failed to create product:", error);
      let description = "Something went wrong. Please try again.";
      if (error instanceof Error) {
        description = error.message;
      }
      toast({
        variant: "destructive",
        title: "Error creating product",
        description: description,
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
