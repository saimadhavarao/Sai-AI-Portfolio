'use client';

import { useEffect, useRef, useState, type RefObject } from 'react';
import { ArrowUpRight, Send, Sparkles, X } from 'lucide-react';

const prompts = ['What is FRIDAY?', 'How does AgentTrace detect failures?', 'How does EscalationIQ prevent data leakage?', 'What is your experience with RAG?'];
interface Answer {
  answer: string;
  mode: 'ai' | 'search';
  links: { href: string; label: string }[];
}
interface Message {
  question: string;
  reply?: Answer;
  error?: string;
}

export function Assistant({ dialog }: { dialog: RefObject<HTMLDialogElement | null> }) {
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const history = useRef<HTMLDivElement>(null);
  const request = useRef<AbortController | null>(null);

  useEffect(() => () => request.current?.abort(), []);
  useEffect(() => {
    const log = history.current;
    if (log) log.scrollTop = log.scrollHeight;
  }, [messages, loading]);

  async function ask(value: string) {
    const trimmed = value.trim();
    if (!trimmed || request.current) return;
    const controller = new AbortController();
    request.current = controller;
    setQuestion('');
    setLoading(true);
    setMessages(previous => [...previous.slice(-7), { question: trimmed }]);
    try {
      const response = await fetch('/api/assistant', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: trimmed }), signal: controller.signal,
      });
      const data = await response.json();
      setMessages(previous => [
        ...previous.slice(0, -1),
        response.ok ? { question: trimmed, reply: data } : { question: trimmed, error: data.error },
      ]);
    } catch {
      if (!controller.signal.aborted) {
        setMessages(previous => [...previous.slice(0, -1), { question: trimmed, error: 'The assistant is temporarily unavailable. You can still browse the case studies.' }]);
      }
    } finally {
      request.current = null;
      setLoading(false);
    }
  }

  return <dialog ref={dialog} className="dialog assistant-dialog" aria-labelledby="assistant-title" onClick={event => { if (event.target === event.currentTarget) event.currentTarget.close(); }}>
    <div className="dialog-body assistant-body">
      <div className="dialog-top"><h2 id="assistant-title"><Sparkles size={21} /> Ask My AI</h2><button className="icon-button" aria-label="Close assistant" onClick={() => dialog.current?.close()}><X size={20} /></button></div>
      <p className="assistant-intro">Ask about Sai’s projects, experience, or engineering stack.</p>
      <div className="chat-history" ref={history} role="log" aria-label="Assistant conversation" aria-live="polite">
        {messages.length === 0 && <div className="suggestions">{prompts.map(prompt => <button type="button" key={prompt} onClick={() => ask(prompt)}>{prompt}<ArrowUpRight size={14} /></button>)}</div>}
        {messages.map((message, index) => <div key={`${index}-${message.question}`} className="chat-turn">
          <p className="chat-question">{message.question}</p>
          {message.reply && <div className="chat-reply">
            <p className="eyebrow">{message.reply.mode === 'search' ? 'KNOWLEDGE SEARCH' : 'AI-SELECTED PORTFOLIO EVIDENCE'}</p>
            <p>{message.reply.answer}</p>
            {message.reply.links.map(link => <a className="text-link" key={link.href} href={link.href} onClick={() => dialog.current?.close()}>{link.label}<ArrowUpRight size={14} /></a>)}
          </div>}
          {message.error && <p className="chat-error">{message.error}</p>}
        </div>)}
        {loading && <p className="muted" role="status">Searching portfolio knowledge…</p>}
      </div>
      <form className="chat-form" onSubmit={event => { event.preventDefault(); void ask(question); }}>
        <input aria-label="Your question" placeholder="Ask a question…" value={question} maxLength={480} onChange={event => setQuestion(event.target.value)} />
        <button type="submit" className="icon-button" aria-label="Send question" disabled={loading || !question.trim()}><Send size={19} /></button>
      </form>
    </div>
  </dialog>;
}
