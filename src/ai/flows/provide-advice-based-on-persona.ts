'use server';
/**
 * @fileOverview An AI agent that provides advice based on a selected persona.
 *
 * - provideAdviceBasedOnPersona - A function that handles the advice providing process.
 * - ProvideAdviceBasedOnPersonaInput - The input type for the provideAdviceBasedOnPersona function.
 * - ProvideAdviceBasedOnnaOutput - The return type for the provideAdviceBasedOnPersona function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProvideAdviceBasedOnPersonaInputSchema = z.object({
  question: z.string().describe('The user question.'),
  pimp: z.enum(['rich', 'poor']).describe('The selected persona (rich or poor).'),
});
export type ProvideAdviceBasedOnPersonaInput = z.infer<typeof ProvideAdviceBasedOnPersonaInputSchema>;

const ProvideAdviceBasedOnPersonaOutputSchema = z.object({
  answer: z.string().describe('The advice tailored to the selected persona.'),
});
export type ProvideAdviceBasedOnPersonaOutput = z.infer<typeof ProvideAdviceBasedOnPersonaOutputSchema>;

export async function provideAdviceBasedOnPersona(input: ProvideAdviceBasedOnPersonaInput): Promise<ProvideAdviceBasedOnPersonaOutput> {
  const result = await provideAdviceBasedOnPersonaFlow(input);
  return result;
}

const prompt = ai.definePrompt({
  name: 'provideAdviceBasedOnPersonaPrompt',
  input: {schema: z.object({
    question: z.string(),
    isRich: z.boolean(),
    isPoor: z.boolean(),
  })},
  output: {schema: ProvideAdviceBasedOnPersonaOutputSchema},
  model: 'googleai/gemini-1.5-pro-latest',
  prompt: `{{#if isRich}}You are the Rich Pimp - a luxury lifestyle advisor. You speak with confidence about high-end brands, luxury experiences, and premium solutions. You assume money is less of a concern and focus on quality, status, and the finer things. Keep responses under 150 words, conversational but sophisticated. Use some slang but stay classy.{{/if}}{{#if isPoor}}You are the Poor Pimp - a street-smart consultant who maximizes value on a budget. You're resourceful, clever, and know all the hacks. You help people look good and live well without breaking the bank. Keep responses under 150 words, conversational and real. Use some slang but stay helpful.{{/if}}\n\nQuestion: {{{question}}}`,
  config: {
    maxOutputTokens: 800,
  },
});

const provideAdviceBasedOnPersonaFlow = ai.defineFlow(
  {
    name: 'provideAdviceBasedOnPersonaFlow',
    inputSchema: ProvideAdviceBasedOnPersonaInputSchema,
    outputSchema: ProvideAdviceBasedOnPersonaOutputSchema,
  },
  async (input) => {
    const {output} = await prompt({
      question: input.question,
      isRich: input.pimp === 'rich',
      isPoor: input.pimp === 'poor',
    });
    if (!output) {
      throw new Error('Failed to generate advice from AI.');
    }
    return output;
  }
);
