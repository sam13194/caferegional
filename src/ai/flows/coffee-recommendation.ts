// Coffee Recommendation Flow
'use server';

/**
 * @fileOverview Recommends coffee products to users based on their purchase history and preferences.
 *
 * - coffeeRecommendation - A function that recommends coffee products based on user data.
 * - CoffeeRecommendationInput - The input type for the coffeeRecommendation function.
 * - CoffeeRecommendationOutput - The return type for the coffeeRecommendation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CoffeeRecommendationInputSchema = z.object({
  userPurchaseHistory: z
    .string()
    .describe(
      'A string containing the user purchase history, as a list of product names.'
    ),
  userPreferences: z.string().describe('A string containing user preferences.'),
});
export type CoffeeRecommendationInput = z.infer<typeof CoffeeRecommendationInputSchema>;

const CoffeeRecommendationOutputSchema = z.object({
  recommendedCoffees: z
    .string()
    .describe('A comma-separated list of recommended coffee products.'),
  reasoning: z.string().describe('The reasoning behind the recommendations.'),
});
export type CoffeeRecommendationOutput = z.infer<typeof CoffeeRecommendationOutputSchema>;

export async function coffeeRecommendation(input: CoffeeRecommendationInput): Promise<CoffeeRecommendationOutput> {
  return coffeeRecommendationFlow(input);
}

const coffeeRecommendationPrompt = ai.definePrompt({
  name: 'coffeeRecommendationPrompt',
  input: {schema: CoffeeRecommendationInputSchema},
  output: {schema: CoffeeRecommendationOutputSchema},
  prompt: `You are a coffee expert recommending coffee products to users based on their purchase history and preferences.

  User Purchase History: {{{userPurchaseHistory}}}
  User Preferences: {{{userPreferences}}}

  Based on the user's purchase history and stated preferences, recommend a list of coffee products. The products should be comma separated.  Also explain the reasoning for your choices.
  `,
});

const coffeeRecommendationFlow = ai.defineFlow(
  {
    name: 'coffeeRecommendationFlow',
    inputSchema: CoffeeRecommendationInputSchema,
    outputSchema: CoffeeRecommendationOutputSchema,
  },
  async input => {
    const {output} = await coffeeRecommendationPrompt(input);
    return output!;
  }
);
