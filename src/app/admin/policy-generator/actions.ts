
"use server";

const mockPolicies = {
    terms: `Generated Terms & Conditions:
1.  **Acceptance of Terms**: By accessing and using eShop, you agree to be bound by these Terms and Conditions.
2.  **User Accounts**: To access certain features, you must register for an account. You are responsible for maintaining the confidentiality of your account information.
3.  **Product Information**: We strive to be as accurate as possible in product descriptions. However, we do not warrant that product descriptions are error-free.
4.  **Governing Law**: These terms shall be governed by the laws of the land.`,
    privacy: `Generated Privacy Policy:
1.  **Information Collection**: We collect personal information you provide to us, such as name, email, and shipping address, when you create an account or place an order.
2.  **Use of Information**: Your information is used to process transactions, provide customer service, and personalize your shopping experience.
3.  **Data Security**: We implement security measures to protect your personal information.
4.  **Third-Party Disclosure**: We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties without your consent.`,
    returns: `Generated Return Policy:
1.  **Return Window**: Items can be returned within 30 days of receipt.
2.  **Eligibility**: To be eligible for a return, items must be unused, in the same condition you received them, and in the original packaging.
3.  **Refund Process**: Once we receive and inspect your return, we will process your refund. The refund will be applied to your original method of payment.
4.  **Shipping Costs**: You will be responsible for paying for your own shipping costs for returning your item. Shipping costs are non-refundable.`,
};

export async function generatePolicy(prevState: any, formData: FormData) {
  const policyType = formData.get('policyType') as keyof typeof mockPolicies;

  // Simulate network delay and AI generation time
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  if (policyType && mockPolicies[policyType]) {
    return {
      ...prevState,
      [policyType]: mockPolicies[policyType],
    };
  }

  return prevState;
}
