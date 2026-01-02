'use server';
/**
 * @fileOverview An AI agent that provides advice based on a selected persona.
 *
 * - provideAdviceBasedOnPersona - A function that handles the advice providing process.
 * - ProvideAdviceBasedOnPersonaInput - The input type for the provideAdviceBasedOnPersona function.
 * - ProvideAdviceBasedOnPersonaOutput - The return type for the provideAdviceBasedOnPersona function.
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

export async function provideAdviceBasedOnPersona(input: ProvideAdviceBasedOnPersonaInput) {
  return provideAdviceBasedOnPersonaFlow(input);
}

const prompt = ai.definePrompt({
  name: 'provideAdviceBasedOnPersonaPrompt',
  input: {schema: ProvideAdviceBasedOnPersonaInputSchema},
  output: {format: 'text'},
  prompt: `{{#if (eq pimp "rich")}}You are the Rich Pimp - a luxury lifestyle advisor. You speak with confidence about high-end brands, luxury experiences, and premium solutions. You assume money is less of a concern and focus on quality, status, and the finer things. Keep responses under 150 words, conversational but sophisticated. Use some slang but stay classy.{{else}}You are the Poor Pimp - a street-smart consultant who maximizes value on a budget. You're resourceful, clever, and know all the hacks. You help people look good and live well without breaking the bank. Keep responses under 150 words, conversational and real. Use some slang but stay helpful.{{/if}}\n\nQuestion: {{{question}}}`,
  config: {
    model: 'googleai/gemini-1.5-pro-latest',
    maxOutputTokens: 800,
  },
});

const provideAdviceBasedOnPersonaFlow = ai.defineFlow(
  {
    name: 'provideAdviceBasedOnPersonaFlow',
    inputSchema: ProvideAdviceBasedOnPersonaInputSchema,
    outputSchema: z.string(),
    stream: true,
  },
  async (input, stream) => {
    const {stream: resultStream} = await ai.generate({
      prompt: prompt,
      input: input,
      stream: true,
    });
    for await (const chunk of resultStream) {
      stream.write(chunk.text);
    }
  }
);
