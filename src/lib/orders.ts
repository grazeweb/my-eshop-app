import { orders } from './data';

// This is a mock function. In a real application, you would query
// your database for orders belonging to the specific userId.
export async function checkIfUserPurchasedProduct(userId: string, productId: string): Promise<boolean> {
    // For demonstration, we assume the mock orders could belong to the current user
    // and check if the product is in a 'Delivered' order.
    // A real implementation would filter orders by userId and check against the database.
    if (!userId) {
        return false;
    }

    return orders.some(order =>
        order.status === 'Delivered' &&
        order.items.some(item => item.product.id === productId)
    );
}
