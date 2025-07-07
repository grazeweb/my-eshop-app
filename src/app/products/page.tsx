
"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { categories } from '@/lib/data';
import { ProductCard } from '@/components/product-card';
import { Input } from '@/components/ui/input';
import { Search, Loader2 } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { listenForProducts } from '@/lib/products';
import type { Product } from '@/lib/types';

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = listenForProducts(
      (allProducts) => {
        setProducts(allProducts);
        setLoading(false);
      },
      (error) => {
        console.error("Failed to fetch products:", error);
        setLoading(false);
      }
    );
    
    // Cleanup the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      setSelectedCategories([categoryParam]);
    }
    const searchParam = searchParams.get('search');
    if (searchParam) {
      setSearchTerm(searchParam);
    }
  }, [searchParams]);

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategories.length === 0 || selectedCategories.includes(product.categoryId);
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategories, products]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold font-headline">Our Products</h1>
        <p className="text-muted-foreground mt-2">Browse our collection of high-quality items.</p>
      </div>
      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-1/4 lg:w-1/5">
          <h2 className="text-xl font-semibold mb-4">Filters</h2>
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Accordion type="single" collapsible defaultValue="categories" className="w-full">
            <AccordionItem value="categories">
              <AccordionTrigger className="text-lg font-medium">Categories</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3">
                  {categories.map((category) => (
                    <div key={category.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={category.id}
                        checked={selectedCategories.includes(category.id)}
                        onCheckedChange={() => handleCategoryChange(category.id)}
                      />
                      <Label htmlFor={category.id} className="font-normal cursor-pointer">
                        {category.name}
                      </Label>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </aside>

        <main className="w-full md:w-3/4 lg:w-4/5">
          {loading ? (
             <div className="flex justify-center items-center py-16">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
             </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-2xl font-semibold">No Products Found</h3>
              <p className="text-muted-foreground mt-2">Try adjusting your filters or search term.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
