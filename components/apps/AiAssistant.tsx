import React, { useState, useRef, useEffect } from 'react';
import { sendMessageToGemini } from '../../services/geminiService';
import { Sparkles, Send } from 'lucide-react';
import Loader from '../ui/Loader';

interface Message {
  role: 'user' | 'model';
  text: string;
}

const AiAssistant: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: "Hello! I'm Nimantha's AI assistant powered by Gemini. Ask me about his projects, skills, or experience!" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setLoading(true);

    const response = await sendMessageToGemini(userMsg);
    
    setMessages(prev => [...prev, { role: 'model', text: response }]);
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-full bg-slate-950/50">
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div 
              className={`max-w-[80%] p-3 rounded-lg text-sm ${
                msg.role === 'user' 
                ? 'bg-blue-600 text-white rounded-br-none' 
                : 'bg-white/10 text-gray-200 rounded-bl-none'
              }`}
            >
              {msg.role === 'model' && <Sparkles size={12} className="inline-block mr-1 text-yellow-400 mb-0.5" />}
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
           <div className="flex justify-start w-full h-32 items-center">
             <div className="bg-white/5 p-4 rounded-lg rounded-bl-none w-full max-w-[200px] flex items-center justify-center">
               <Loader />
             </div>
           </div>
        )}
        <div ref={bottomRef} />
      </div>

      <form onSubmit={handleSend} className="p-3 border-t border-white/10 flex gap-2 bg-slate-900/80 backdrop-blur-sm">
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about Nimantha..."
          className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-3 text-sm text-white outline-none focus:border-blue-500 transition-colors"
        />
        <button 
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 p-3 rounded-full text-white disabled:opacity-50 transition-colors"
        >
          <Send size={18} />
        </button>
      </form>
    </div>
  );
};

export default AiAssistant;