'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Sparkles } from 'lucide-react';
import { askAiTutor } from '@/ai/flows/ai-tutor-flow';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';

export default function AiTutorPage() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) {
      toast({
        variant: 'destructive',
        title: 'Question is empty',
        description: 'Please enter a question to ask the AI tutor.',
      });
      return;
    }

    setIsGenerating(true);
    setAnswer(''); // Clear previous answer

    try {
      const response = await askAiTutor({ question });
      setAnswer(response.answer);
    } catch (error: any) {
      console.error('AI Tutor error:', error);
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: error.message || 'Could not get an answer from the AI tutor.',
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-y-2">
        <h1 className="text-3xl font-bold tracking-tight">AI Tutor</h1>
        <p className="text-muted-foreground">
          Ask any academic question and get a detailed answer from our AI assistant.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Ask a Question</CardTitle>
            <CardDescription>
              Whether it's a complex math problem or a historical query, our AI is here to help.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid w-full gap-2">
                <Label htmlFor="question">Your Question</Label>
                <Textarea
                  id="question"
                  placeholder="e.g., 'Explain the process of photosynthesis' or 'What were the causes of World War I?'"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  rows={5}
                  disabled={isGenerating}
                />
              </div>
              <Button type="submit" disabled={isGenerating}>
                {isGenerating ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Sparkles className="mr-2 h-4 w-4" />
                )}
                {isGenerating ? 'Getting Answer...' : 'Ask AI'}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>AI's Answer</CardTitle>
            <CardDescription>The response from the AI tutor will appear below.</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            {isGenerating ? (
              <div className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ) : answer ? (
              <div
                className="text-sm text-foreground"
                style={{ whiteSpace: 'pre-wrap' }}
              >
                {answer}
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-sm text-muted-foreground">
                Your answer will be displayed here.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
