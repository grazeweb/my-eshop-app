
"use client";

import { useState, useEffect } from "react";
import Link from 'next/link';
import Image from 'next/image';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, MoreHorizontal, Loader2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { listenForProducts, deleteProduct } from "@/lib/products";
import type { Product } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribe = listenForProducts(
      (products) => {
        setProducts(products);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    );
    return () => unsubscribe();
  }, []);

  const handleDeleteClick = (product: Product) => {
    setSelectedProduct(product);
    setIsDeleteAlertOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedProduct) return;
    try {
      await deleteProduct(selectedProduct.id);
      toast({ title: `"${selectedProduct.name}" has been deleted.` });
    } catch (error) {
      toast({ variant: "destructive", title: "Error deleting product", description: "Something went wrong." });
      console.error("Failed to delete product:", error);
    } finally {
      setIsDeleteAlertOpen(false);
      setSelectedProduct(null);
    }
  };


  return (
    <div>
       <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Products</h1>
          <Button asChild>
              <Link href="/admin/products/new">
                  <PlusCircle className="h-4 w-4 mr-2" /> Add Product
              </Link>
          </Button>
      </div>
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Product Catalog</CardTitle>
          <CardDescription>Manage your products here.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden w-[100px] sm:table-cell">Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center h-24">
                    <Loader2 className="mx-auto h-6 w-6 animate-spin" />
                  </TableCell>
                </TableRow>
              ) : products.length > 0 ? (
                products.map((product) => {
                  const imageSrc =
                    product.image &&
                    (product.image.startsWith("http://") || product.image.startsWith("https://"))
                      ? product.image
                      : "https://placehold.co/64x64.png";
                  
                  return (
                    <TableRow key={product.id}>
                      <TableCell className="hidden sm:table-cell">
                        <Image
                          alt={product.name}
                          className="aspect-square rounded-md object-cover"
                          height="64"
                          src={imageSrc}
                          width="64"
                          data-ai-hint="product image"
                        />
                      </TableCell>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{product.categoryId}</Badge>
                      </TableCell>
                      <TableCell>${product.price.toFixed(2)}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button aria-haspopup="true" size="icon" variant="ghost">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Toggle menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem asChild>
                                <Link href={`/admin/products/edit/${product.id}`}>Edit</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-destructive focus:text-destructive focus:bg-destructive/10"
                              onClick={() => handleDeleteClick(product)}
                            >
                                Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                 <TableRow>
                  <TableCell colSpan={5} className="text-center h-24">No products found.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <AlertDialog open={isDeleteAlertOpen} onOpenChange={setIsDeleteAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the product
              "{selectedProduct?.name}" from your store.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90 focus-visible:ring-destructive"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
