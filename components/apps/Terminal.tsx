import React, { useState, useEffect, useRef } from 'react';
import { COMMANDS_HELP, PROFILE_SUMMARY, PROJECTS } from '../../constants';

const Terminal: React.FC = () => {
  const [history, setHistory] = useState<string[]>(['Welcome to NimanthaOS v1.0.0', 'Type "help" to get started.']);
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    const newHistory = [...history, `user@nimantha:~$ ${input}`];

    switch (cmd) {
      case 'help':
        newHistory.push(COMMANDS_HELP);
        break;
      case 'cat summary':
        newHistory.push(PROFILE_SUMMARY);
        break;
      case 'ls':
        newHistory.push('Directories:');
        newHistory.push('drwxr-xr-x  Certifications');
        newHistory.push('drwxr-xr-x  Education');
        newHistory.push('drwxr-xr-x  Activities');
        newHistory.push('drwxr-xr-x  Projects');
        break;
      case 'clear':
        setHistory([]);
        setInput('');
        return;
      case 'whoami':
        newHistory.push('guest_user');
        break;
      default:
        if (cmd) newHistory.push(`Command not found: ${cmd}. Type "help" for available commands.`);
    }

    setHistory(newHistory);
    setInput('');
  };

  return (
    <div className="h-full font-mono text-sm bg-black/50 p-2 rounded text-green-400 overflow-y-auto">
      {history.map((line, i) => (
        <div key={i} className="whitespace-pre-wrap mb-1">{line}</div>
      ))}
      <form onSubmit={handleCommand} className="flex">
        <span className="mr-2 text-blue-400">user@nimantha:~$</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-transparent outline-none text-green-400"
          autoFocus
        />
      </form>
      <div ref={bottomRef} />
    </div>
  );
};

export default Terminal;