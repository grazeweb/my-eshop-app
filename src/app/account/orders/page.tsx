
"use client";

import { useState, useEffect } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Eye, Loader2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/contexts/auth-context';
import { listenForUserOrders } from '@/lib/orders';
import type { Order } from '@/lib/types';
import { format } from 'date-fns';

export default function OrderHistoryPage() {
    const { user } = useAuth();
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            const unsubscribe = listenForUserOrders(
                user.uid,
                (fetchedOrders) => {
                    setOrders(fetchedOrders);
                    setLoading(false);
                },
                (error) => {
                    console.error("Failed to fetch orders:", error);
                    setLoading(false);
                }
            );
            return () => unsubscribe();
        } else {
            setLoading(false);
        }
    }, [user]);

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold font-headline">Order History</h1>
            <p className="text-muted-foreground">Check the status of recent orders.</p>
            <Card>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Order ID</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Total</TableHead>
                                <TableHead></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center h-24">
                                        <Loader2 className="mx-auto h-6 w-6 animate-spin" />
                                    </TableCell>
                                </TableRow>
                            ) : orders.length > 0 ? (
                                orders.map((order) => (
                                    <TableRow key={order.id}>
                                        <TableCell className="font-medium">#{order.id.slice(0, 6)}</TableCell>
                                        <TableCell>{order.createdAt ? format(order.createdAt.toDate(), 'MMMM d, yyyy') : 'N/A'}</TableCell>
                                        <TableCell>{order.status}</TableCell>
                                        <TableCell>${order.totalAmount.toFixed(2)}</TableCell>
                                        <TableCell>
                                            <Button asChild variant="outline" size="sm">
                                                <Link href={`/account/orders/${order.id}`}>
                                                    <Eye className="h-4 w-4 mr-2" /> View
                                                </Link>
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center h-24">
                                        You have no orders yet.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
