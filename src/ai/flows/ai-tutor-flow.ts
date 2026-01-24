'use server';
/**
 * @fileOverview An AI tutor flow for answering student questions.
 *
 * - askAiTutor - A function that handles the question-answering process.
 * - AiTutorInput - The input type for the askAiTutor function.
 * - AiTutorOutput - The return type for the askAiTutor function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiTutorInputSchema = z.object({
  question: z.string().describe('The question the user is asking the AI tutor.'),
});
export type AiTutorInput = z.infer<typeof AiTutorInputSchema>;

const AiTutorOutputSchema = z.object({
  answer: z.string().describe("The AI tutor's answer to the question."),
});
export type AiTutorOutput = z.infer<typeof AiTutorOutputSchema>;

export async function askAiTutor(input: AiTutorInput): Promise<AiTutorOutput> {
  return aiTutorFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiTutorPrompt',
  input: {schema: AiTutorInputSchema},
  output: {schema: AiTutorOutputSchema},
  prompt: `You are an expert AI tutor for students in Cameroon. Your goal is to provide clear, concise, and helpful answers to their academic questions. When relevant, try to use examples that resonate with the Cameroonian curriculum (e.g., GCE, University of Buea/Bamenda).

Answer the following question:
"{{{question}}}"

Provide the answer in a clear and well-formatted way. Use markdown for formatting if necessary (e.g., lists, bold text).`,
});

const aiTutorFlow = ai.defineFlow(
  {
    name: 'aiTutorFlow',
    inputSchema: AiTutorInputSchema,
    outputSchema: AiTutorOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
