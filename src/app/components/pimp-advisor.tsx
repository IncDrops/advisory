"use client";

import { useState } from 'react';
import Link from 'next/link';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Sparkles, Zap, DollarSign, Send, Bot } from 'lucide-react';
import { provideAdviceBasedOnPersona } from '@/ai/flows/provide-advice-based-on-persona';
import { useToast } from "@/hooks/use-toast";
import { streamFlow } from '@genkit-ai/next/client';

type Persona = 'rich' | 'poor';

const RichIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
  </svg>
);
const PoorIcon = () => <Zap className="w-5 h-5" />;

export function PimpAdvisor() {
  const [persona, setPersona] = useState<Persona>('rich');
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { toast } = useToast();

  const handleAsk = () => {
    if (question.trim()) {
      setIsModalOpen(true);
    }
  };

  const handlePayAndAsk = async () => {
    setIsModalOpen(false);
    setIsLoading(true);
    setResponse(''); // Clear previous response and prepare for streaming

    try {
      const stream = streamFlow(provideAdviceBasedOnPersona, { question, pimp: persona });
      for await (const chunk of stream) {
        setResponse(prev => (prev || '') + chunk);
      }
      setQuestion('');
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "An Error Occurred",
        description: "Could not get advice. Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const richMode = persona === 'rich';

  const richBtnClasses = "px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 flex items-center gap-2";
  const poorBtnClasses = "px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 flex items-center gap-2";

  return (
    <>
      <div className={cn(
        "fixed inset-0 transition-all duration-700",
        richMode ? 'bg-gradient-to-br from-amber-950 via-black to-purple-950' : 'bg-gradient-to-br from-cyan-950 via-purple-950 to-fuchsia-950'
      )}>
        <div className="absolute inset-0 opacity-20">
          <div className={cn(
            "absolute inset-0",
            richMode ? 'bg-[radial-gradient(circle_at_50%_50%,rgba(251,191,36,0.1),transparent_50%)]' : 'bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.15),transparent_50%)]'
          )}></div>
        </div>
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <header className="p-6 text-center border-b border-white/10 backdrop-blur-sm bg-black/20">
          <h1 className={cn(
            "text-4xl md:text-6xl font-headline font-bold mb-2 transition-all duration-500 text-transparent bg-clip-text",
            richMode ? 'bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-200' : 'bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-cyan-400'
          )}>
            {richMode ? 'RICH PIMP' : 'POOR PIMP'}
          </h1>
          <p className={cn("text-lg transition-colors duration-500", richMode ? 'text-amber-200/80' : 'text-cyan-300/80')}>
            {richMode ? 'Luxury Lifestyle Advisor' : 'Street Smart Consultant'}
          </p>
        </header>

        <div className="p-6 flex justify-center gap-4">
          <button onClick={() => setPersona('rich')} className={cn(richBtnClasses, richMode ? 'bg-gradient-to-r from-amber-600 to-yellow-600 text-black shadow-lg shadow-amber-500/50 scale-105' : 'bg-white/5 text-white/50 hover:bg-white/10')}>
            <RichIcon /> Rich Pimp
          </button>
          <button onClick={() => setPersona('poor')} className={cn(poorBtnClasses, !richMode ? 'bg-gradient-to-r from-cyan-600 to-fuchsia-600 text-white shadow-lg shadow-cyan-500/50 scale-105' : 'bg-white/5 text-white/50 hover:bg-white/10')}>
            <PoorIcon /> Poor Pimp
          </button>
        </div>

        <div className="flex-1 p-6 max-w-4xl w-full mx-auto flex flex-col">
          {(response || isLoading) && (
            <div className={cn("mb-6 p-6 rounded-lg backdrop-blur-md border transition-all duration-300", richMode ? 'bg-amber-950/30 border-amber-500/30' : 'bg-cyan-950/30 border-cyan-500/30')}>
              <div className="flex items-start gap-4">
                <div className={cn("p-2 rounded-full flex-shrink-0", richMode ? 'bg-amber-500/20 text-amber-400' : 'bg-cyan-500/20 text-cyan-400')}>
                  {richMode ? <RichIcon /> : <PoorIcon />}
                </div>
                <div className="text-white text-lg leading-relaxed flex-1 pt-1">
                  {response}
                  {isLoading && !response && (
                    <div className="flex items-center gap-3">
                      <div className={cn("w-2 h-2 rounded-full animate-pulse", richMode ? 'bg-amber-400' : 'bg-cyan-400')}></div>
                      <div className={cn("w-2 h-2 rounded-full animate-pulse-delay-75", richMode ? 'bg-amber-400' : 'bg-cyan-400')}></div>
                      <div className={cn("w-2 h-2 rounded-full animate-pulse-delay-150", richMode ? 'bg-amber-400' : 'bg-cyan-400')}></div>
                      <p className="text-white/60 ml-2">Thinking...</p>
                    </div>
                  )}
                  {isLoading && response && (
                    <span className={cn("inline-block w-2 h-5 bg-current ml-1 animate-pulse", richMode ? 'text-amber-400' : 'text-cyan-400')}></span>
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="mt-auto">
            <div className={cn("backdrop-blur-md rounded-lg border p-4 transition-all duration-300", richMode ? 'bg-amber-950/20 border-amber-500/30' : 'bg-cyan-950/20 border-cyan-500/30')}>
              <Textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder={richMode ? "Ask about luxury, investments, or the finer things..." : "Ask about budget hacks, hustles, or making it work..."}
                className="w-full bg-transparent text-white placeholder-white/40 resize-none focus:outline-none text-lg p-2 border-none focus-visible:ring-0 focus-visible:ring-offset-0 min-h-[80px]"
                rows={3}
              />
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
                <div className="flex items-center gap-2 text-white/60">
                  <DollarSign className="w-4 h-4" />
                  <span className="text-sm font-medium">$1.00 per question</span>
                </div>
                <Button
                  onClick={handleAsk}
                  disabled={!question.trim() || isLoading}
                  className={cn("px-6 py-3 rounded-lg font-bold transition-all duration-300 flex items-center gap-2 h-auto text-base disabled:opacity-50 disabled:cursor-not-allowed",
                    richMode
                      ? 'bg-gradient-to-r from-amber-600 to-yellow-600 text-black hover:shadow-lg hover:shadow-amber-500/50'
                      : 'bg-gradient-to-r from-cyan-600 to-fuchsia-600 text-white hover:shadow-lg hover:shadow-cyan-500/50'
                  )}
                >
                  Ask <Send className="w-4 h-4" />
                </Button>
              </div>
              <div className="text-xs text-white/40 mt-3 text-center">
                <p className="mb-2">
                  This service is for entertainment and informational purposes only. Responses are AI-generated and should not be considered professional financial, legal, or medical advice. Consult appropriate professionals for serious decisions.
                </p>
                <Link href="/privacy-and-terms" className="underline hover:text-white">Privacy Policy & Terms of Use</Link>
                <p className="mt-2">
                  © 2026 Rich Pimp Poor Pimp. All rights reserved. A service of IncDrops.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className={cn("max-w-md w-full rounded-lg p-8 backdrop-blur-md border transition-all duration-300 border-0", richMode ? 'bg-amber-950/90 border-amber-500/50' : 'bg-cyan-950/90 border-cyan-500/50')}>
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-white mb-4 text-left">Confirm Payment</DialogTitle>
          </DialogHeader>
          <p className="text-white/80 mb-2">You're about to ask:</p>
          <p className={cn("font-medium mb-6 p-3 rounded text-left", richMode ? 'bg-amber-500/10 text-amber-200' : 'bg-cyan-500/10 text-cyan-200')}>"{question}"</p>
          <div className="flex items-center justify-between mb-6 p-4 rounded bg-white/5">
            <span className="text-white font-medium">Total:</span>
            <span className="text-2xl font-bold text-white">$1.00</span>
          </div>
          <p className="text-white/60 text-sm mb-6">
            A payment of $1.00 will be processed to continue. By clicking "Pay & Ask", you acknowledge that you have read, understood, and agree to be bound by our Privacy Policy and Terms of Use.
          </p>
          <DialogFooter className="flex-row gap-3 !justify-between">
            <Button onClick={() => setIsModalOpen(false)} className="flex-1 px-4 py-3 h-auto bg-white/10 text-white hover:bg-white/20 transition-colors font-medium">
              Cancel
            </Button>
            <Button onClick={handlePayAndAsk} className={cn("flex-1 px-4 py-3 h-auto font-bold transition-all duration-300", richMode ? 'bg-gradient-to-r from-amber-600 to-yellow-600 text-black' : 'bg-gradient-to-r from-cyan-600 to-fuchsia-600 text-white')}>
              Pay & Ask
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

    