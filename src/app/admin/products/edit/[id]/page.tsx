
"use client";

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ProductForm, type ProductFormValues } from '../../product-form';
import { getProduct, updateProduct, uploadProductImage } from '@/lib/products';
import { categories } from '@/lib/data'; 
import { useToast } from '@/hooks/use-toast';
import type { Product } from '@/lib/types';
import { Loader2 } from 'lucide-react';

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();
  
  const productId = params.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (productId) {
      getProduct(productId)
        .then(productData => {
          if (productData) {
            setProduct(productData);
          } else {
            toast({ variant: "destructive", title: "Product not found" });
            router.push('/admin/products');
          }
        })
        .finally(() => setLoading(false));
    }
  }, [productId, router, toast]);

  const handleSubmit = async (data: ProductFormValues) => {
    if (!product) return;

    setIsSubmitting(true);
    try {
      let imageUrl = product.image;
      const images = product.images || [product.image];
      if (data.image && data.image.length > 0) {
        const imageFile = data.image[0];
        imageUrl = await uploadProductImage(imageFile);
        
        images[0] = imageUrl;
      }

      const updatedProductData: Partial<Product> = {
          name: data.name,
          description: data.description,
          price: data.price,
          shippingFee: data.shippingFee,
          categoryId: data.categoryId,
          image: imageUrl,
          images: images,
          stock: data.stock,
      };

      await updateProduct(product.id, updatedProductData);
      toast({ title: "Product updated successfully!" });
      router.push('/admin/products');
    } catch (error) {
      console.error("Failed to update product:", error);
      let description = "Something went wrong. Please try again.";
      if (error instanceof Error) {
        description = error.message;
      }
      toast({
        variant: "destructive",
        title: "Error updating product",
        description: description,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-[60vh]"><Loader2 className="h-16 w-16 animate-spin" /></div>;
  }

  if (!product) {
    return null; // or a not found component
  }

  return (
    <ProductForm 
      initialData={product}
      categories={categories}
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
    />
  );
}
