import React, { useState, useCallback } from 'react';
import { ContractHealthReport, ChatMessage } from '@/types/legal';
import { answerDocumentQuestion } from '@/lib/legal-engine';
import { 
  Send, 
  Bot, 
  User, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  ArrowUpRight, 
  HelpCircle,
  ShieldCheck
} from 'lucide-react';

interface GroundedChatWidgetProps {
  document: ContractHealthReport;
  onSelectClause: (clauseId: string) => void;
}

export default function GroundedChatWidget({ document, onSelectClause }: GroundedChatWidgetProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-msg',
      sender: 'assistant',
      text: `Hello! I am your **Lexi AI Grounded Document Copilot**. I have analyzed **"${document.title}"**.\n\nI answer questions strictly based on the text of this contract, citing exact clause numbers and verbatim quotes to eliminate hallucinations. What would you like to know?`,
      timestamp: 'Just now',
      suggestedFollowUps: [
        'Can they terminate this agreement without notice?',
        'What are the mandatory payment obligations and late fees?',
        'Who owns intellectual property created under this agreement?',
        'What are the most dangerous clauses in this contract?',
      ],
    },
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = useCallback(async (queryText?: string) => {
    const q = queryText || inputQuery;
    if (!q.trim()) return;

    const userMsg: ChatMessage = {
      id: 'user-' + Date.now(),
      sender: 'user',
      text: q.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMsg]);
    if (!queryText) setInputQuery('');
    setIsTyping(true);

    try {
      // Direct local grounded engine or API call
      const reply = answerDocumentQuestion(q, document);
      setTimeout(() => {
        setMessages(prev => [...prev, reply]);
        setIsTyping(false);
      }, 400);
    } catch (err) {
      console.error(err);
      setIsTyping(false);
    }
  }, [inputQuery, document]);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col h-[750px]">
      
      {/* Header with Anti-Hallucination Stamp */}
      <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-600/15 flex items-center justify-center text-blue-600">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">
              Grounded Legal Document Assistant
            </h3>
            <p className="text-[11px] text-slate-500">
              Querying: <span className="font-medium text-slate-700 dark:text-slate-300">{document.title}</span>
            </p>
          </div>
        </div>

        <div className="inline-flex items-center gap-1 text-[11px] bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 px-2.5 py-1 rounded-full font-medium border border-emerald-500/20">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Strict Citation Anchoring</span>
        </div>
      </div>

      {/* Message Stream */}
      <div 
        role="log" 
        aria-live="polite" 
        aria-label="Conversation with Grounded Legal Assistant"
        className="flex-1 p-4 overflow-y-auto space-y-4 text-xs sm:text-sm"
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.sender === 'assistant' && (
              <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-white shrink-0 mt-0.5 shadow-sm">
                <Bot className="w-4 h-4" />
              </div>
            )}

            <div
              className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 space-y-2.5 ${
                msg.sender === 'user'
                  ? 'bg-blue-600 text-white rounded-tr-none'
                  : 'bg-slate-100 dark:bg-slate-800/80 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700/60 rounded-tl-none'
              }`}
            >
              <div className="whitespace-pre-line leading-relaxed">
                {msg.text}
              </div>

              {/* Citations Box */}
              {msg.citations && msg.citations.length > 0 && (
                <div className="mt-2 pt-2 border-t border-slate-200 dark:border-slate-700/60 space-y-1.5">
                  <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block">
                    Verified Document Citations (Click to jump):
                  </span>
                  <div className="space-y-1">
                    {msg.citations.map((cite, idx) => (
                      <button
                        key={idx}
                        onClick={() => onSelectClause(cite.clauseId)}
                        className="w-full text-left flex items-start justify-between gap-2 p-1.5 rounded bg-white/70 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 hover:border-blue-500 text-slate-800 dark:text-slate-200 text-xs transition group"
                      >
                        <div>
                          <span className="font-bold text-blue-600 dark:text-blue-400 group-hover:underline">
                            {cite.clauseTitle}
                          </span>
                          <p className="text-[11px] text-slate-500 line-clamp-1 italic">
                            &ldquo;{cite.quote}&rdquo;
                          </p>
                        </div>
                        <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-500 shrink-0 mt-0.5" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Follow-up Prompts */}
              {msg.suggestedFollowUps && (
                <div className="mt-3 pt-2 border-t border-slate-200 dark:border-slate-700/60 space-y-1.5">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                    Suggested Inquiries:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {msg.suggestedFollowUps.map((prompt, pIdx) => (
                      <button
                        key={pIdx}
                        onClick={() => handleSend(prompt)}
                        className="text-[11px] font-medium bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 px-2.5 py-1 rounded-full border border-slate-200 dark:border-slate-700 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-slate-800 transition"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <span className="text-[9px] text-slate-400 block text-right">
                {msg.timestamp}
              </span>
            </div>

            {msg.sender === 'user' && (
              <div className="w-7 h-7 rounded-full bg-slate-700 flex items-center justify-center text-white shrink-0 mt-0.5">
                <User className="w-4 h-4" />
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex gap-3 items-center text-xs text-slate-400 pl-10">
            <div className="flex gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-bounce"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-bounce [animation-delay:0.2s]"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-bounce [animation-delay:0.4s]"></span>
            </div>
            <span>Grounding answer against contract clauses...</span>
          </div>
        )}
      </div>

      {/* Input Bar */}
      <div className="p-3 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            aria-label="Ask a question about this legal document"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder="Ask anything about this agreement (e.g. Can I terminate early?)"
            className="flex-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          <button
            type="submit"
            aria-label="Send question"
            disabled={!inputQuery.trim()}
            className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white px-4 py-2.5 rounded-xl font-medium text-xs sm:text-sm flex items-center gap-1.5 transition active:scale-95 shrink-0 shadow-sm"
          >
            <span>Ask</span>
            <Send className="w-3.5 h-3.5" aria-hidden="true" />
          </button>
        </form>
      </div>

    </div>
  );
}
