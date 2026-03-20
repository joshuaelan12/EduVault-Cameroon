
'use server';

/**
 * @fileOverview AI-powered content moderation flow for identifying copyright violations or miscategorized documents.
 *
 * - moderateContent - A function that handles the content moderation process.
 * - ModerateContentInput - The input type for the moderateContent function.
 * - ModerateContentOutput - The return type for the moderateContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ModerateContentInputSchema = z.object({
  title: z.string().describe('The title of the document.'),
  examType: z.string().describe('The type of exam the document belongs to (e.g., GCE, University of Buea).'),
  subject: z.string().describe('The subject of the document.'),
  year: z.string().describe('The year of the document.'),
  level: z.string().describe('The level of the document (e.g., O Level, A Level).'),
  tags: z.array(z.string()).describe('Keywords associated with the document.'),
  contentSnippet: z.string().describe('A snippet of the document content for analysis.'),
});
export type ModerateContentInput = z.infer<typeof ModerateContentInputSchema>;

const ModerateContentOutputSchema = z.object({
  copyrightViolation: z.boolean().describe('Whether the document content potentially violates copyright.'),
  copyrightViolationExplanation: z.string().describe('Explanation of why the content might violate copyright.'),
  misCategorized: z.boolean().describe('Whether the document is miscategorized based on the metadata and content.'),
  misCategorizedExplanation: z.string().describe('Explanation of why the document might be miscategorized.'),
  flagForReview: z.boolean().describe('Whether the document should be flagged for manual review by an admin.'),
});
export type ModerateContentOutput = z.infer<typeof ModerateContentOutputSchema>;

export async function moderateContent(input: ModerateContentInput): Promise<ModerateContentOutput> {
  return moderateContentFlow(input);
}

const moderateContentPrompt = ai.definePrompt({
  name: 'moderateContentPrompt',
  input: {schema: ModerateContentInputSchema},
  output: {schema: ModerateContentOutputSchema},
  prompt: `You are an AI-powered content moderation tool for Cameroon Past Questions, an educational resource platform.

  Your task is to analyze document metadata and content to identify potential copyright violations or miscategorization.

  Consider the following information about the document:
  Title: {{{title}}}
  Exam Type: {{{examType}}}
  Subject: {{{subject}}}
  Year: {{{year}}}
  Level: {{{level}}}
  Tags: {{#each tags}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
  Content Snippet: {{{contentSnippet}}}

  Determine if the document potentially violates copyright or is miscategorized based on the provided information.
  If there is a strong indication of either issue, set the corresponding boolean flag to true and provide a detailed explanation.
  Also, set the flagForReview flag to true if any potential issues are detected.
  Ensure that copyrightViolationExplanation and misCategorizedExplanation are populated only when the corresponding boolean flag is set to true.

  Output a JSON object with the following fields:
  - copyrightViolation (boolean): Whether the document content potentially violates copyright.
  - copyrightViolationExplanation (string): Explanation of why the content might violate copyright. (Only populate if copyrightViolation is true)
  - misCategorized (boolean): Whether the document is miscategorized based on the metadata and content.
  - misCategorizedExplanation (string): Explanation of why the document might be miscategorized. (Only populate if misCategorized is true)
  - flagForReview (boolean): Whether the document should be flagged for manual review by an admin.
`,
});

const moderateContentFlow = ai.defineFlow(
  {
    name: 'moderateContentFlow',
    inputSchema: ModerateContentInputSchema,
    outputSchema: ModerateContentOutputSchema,
  },
  async input => {
    const {output} = await moderateContentPrompt(input);
    return output!;
  }
);
