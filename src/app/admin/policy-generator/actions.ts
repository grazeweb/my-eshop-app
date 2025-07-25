'use server';
/**
 * @fileOverview AI policy generation flow.
 *
 * - generatePolicy - A function that handles the policy generation process.
 * - GeneratePolicyInput - The input type for the generatePolicy function.
 * - GeneratePolicyOutput - The return type for the generatePolicy function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneratePolicyInputSchema = z.object({
  policyType: z.enum(['terms', 'privacy', 'returns']),
});
export type GeneratePolicyInput = z.infer<typeof GeneratePolicyInputSchema>;

const GeneratePolicyOutputSchema = z.object({
  policy: z.string(),
});
export type GeneratePolicyOutput = z.infer<typeof GeneratePolicyOutputSchema>;

const policyGeneratorPrompt = ai.definePrompt({
  name: 'policyGeneratorPrompt',
  input: {
    schema: GeneratePolicyInputSchema,
  },
  output: {
    schema: GeneratePolicyOutputSchema,
  },
  prompt: `You are a legal expert specializing in e-commerce.
Generate a comprehensive {{policyType}} policy for an online store called "eShop".
The policy should be professional, easy to understand, and cover all the essential aspects for an online retailer.
Provide the output as a single block of text.
At the end of the policy, include a line that says "This policy was generated on {{currentDate}}."
`,
});

const policyGeneratorFlow = ai.defineFlow(
  {
    name: 'policyGeneratorFlow',
    inputSchema: GeneratePolicyInputSchema,
    outputSchema: GeneratePolicyOutputSchema,
  },
  async (input) => {
    const currentDate = new Date().toLocaleDateString();
    
    const {output} = await policyGeneratorPrompt({
        ...input,
        // @ts-ignore
        currentDate,
    });
    
    return output!;
  }
);


export async function generatePolicy(prevState: any, formData: FormData) {
  const policyType = formData.get('policyType') as 'terms' | 'privacy' | 'returns';

  if (!policyType) {
    return { ...prevState, error: 'Policy type is required.' };
  }

  try {
    const result = await policyGeneratorFlow({ policyType });
    return {
      ...prevState,
      [policyType]: result.policy,
      error: null,
    };
  } catch (error) {
    console.error(error);
    return { ...prevState, error: 'Failed to generate policy. Please try again.' };
  }
}
