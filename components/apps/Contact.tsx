import React, { useState } from 'react';
import { Send, Mail, CheckCircle } from 'lucide-react';

const Contact: React.FC = () => {
  const [sent, setSent] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    // In a real app, you would send this to a backend
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <div className="flex flex-col h-full max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4 text-red-400">
            <Mail size={32} />
        </div>
        <h2 className="text-2xl font-bold text-gray-100">Get in Touch</h2>
        <p className="text-gray-400">Send me a message for collaborations or opportunities.</p>
        <p className="text-sm text-blue-400 mt-2">ireshnimantha608@gmail.com</p>
      </div>

      {sent ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center animate-in fade-in duration-500">
            <CheckCircle size={64} className="text-green-400 mb-4" />
            <h3 className="text-xl font-bold text-gray-200">Message Sent!</h3>
            <p className="text-gray-400">Thanks for reaching out. I'll get back to you soon.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                    <label className="text-xs text-gray-400 uppercase font-semibold">Name</label>
                    <input required type="text" className="w-full bg-white/5 border border-white/10 rounded p-2 text-white outline-none focus:border-blue-500 transition-colors" placeholder="Your Name" />
                </div>
                <div className="space-y-1">
                    <label className="text-xs text-gray-400 uppercase font-semibold">Email</label>
                    <input required type="email" className="w-full bg-white/5 border border-white/10 rounded p-2 text-white outline-none focus:border-blue-500 transition-colors" placeholder="your@email.com" />
                </div>
            </div>
            
            <div className="space-y-1">
                <label className="text-xs text-gray-400 uppercase font-semibold">Subject</label>
                <input required type="text" className="w-full bg-white/5 border border-white/10 rounded p-2 text-white outline-none focus:border-blue-500 transition-colors" placeholder="Project Inquiry" />
            </div>

            <div className="space-y-1">
                <label className="text-xs text-gray-400 uppercase font-semibold">Message</label>
                <textarea required rows={4} className="w-full bg-white/5 border border-white/10 rounded p-2 text-white outline-none focus:border-blue-500 transition-colors" placeholder="Hello Nimantha..." />
            </div>

            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded flex items-center justify-center space-x-2 transition-colors">
                <Send size={16} />
                <span>Send Message</span>
            </button>
        </form>
      )}
    </div>
  );
};

export default Contact;