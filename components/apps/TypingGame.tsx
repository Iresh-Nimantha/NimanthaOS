import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw, Trophy, Code, Type, Keyboard, Clock, Zap, Play, Terminal as TerminalIcon, Cpu, Fingerprint } from 'lucide-react';
import confetti from 'canvas-confetti';
import { TYPING_SNIPPETS } from '../../constants';

type GameMode = 'text' | 'code';
type GameState = 'idle' | 'playing' | 'finished';

interface Score {
  wpm: number;
  accuracy: number;
  date: string;
}

const TypingGame: React.FC = () => {
  // System State
  const [isMobile, setIsMobile] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  // Game State
  const [mode, setMode] = useState<GameMode>('code');
  const [gameState, setGameState] = useState<GameState>('idle');
  const [snippet, setSnippet] = useState('');
  const [input, setInput] = useState('');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [leaderboard, setLeaderboard] = useState<Score[]>([]);
  
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // 1️⃣ Platform Detection & Splash Logic
  useEffect(() => {
    const mobileCheck = window.innerWidth < 768;
    setIsMobile(mobileCheck);
    
    // Desktop animation is longer (cinematic), Mobile is snappy
    const splashDuration = mobileCheck ? 2000 : 3500; 
    const timer = setTimeout(() => setShowSplash(false), splashDuration);
    return () => clearTimeout(timer);
  }, []);

  // 2️⃣ Game Logic (Shared)
  useEffect(() => {
    resetGame();
  }, [mode]);

  useEffect(() => {
    let interval: any;
    if (gameState === 'playing' && startTime) {
      interval = setInterval(() => {
        const durationInMinutes = (Date.now() - startTime) / 60000;
        const currentWpm = Math.round((input.length / 5) / Math.max(durationInMinutes, 0.01));
        setWpm(currentWpm);
      }, 500);
    }
    return () => clearInterval(interval);
  }, [gameState, startTime, input.length]);

  // Auto-scroll for mobile visibility
  useEffect(() => {
    if (gameState === 'playing' && scrollRef.current) {
      const cursor = scrollRef.current.querySelector('.cursor-active');
      if (cursor) cursor.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [input, gameState]);

  const resetGame = () => {
    const snippets = TYPING_SNIPPETS[mode];
    setSnippet(snippets[Math.floor(Math.random() * snippets.length)]);
    setInput('');
    setGameState('idle');
    setStartTime(null);
    setWpm(0);
    setAccuracy(100);
    if (!isMobile) setTimeout(() => inputRef.current?.focus(), 50);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    if (gameState === 'finished') return;
    
    if (gameState === 'idle' && val.length === 1) {
      setGameState('playing');
      setStartTime(Date.now());
    }

    setInput(val);

    let correct = 0;
    for (let i = 0; i < val.length; i++) {
      if (val[i] === snippet[i]) correct++;
    }
    setAccuracy(val.length > 0 ? Math.round((correct / val.length) * 100) : 100);

    if (val === snippet) finishGame();
  };

  const finishGame = () => {
    setGameState('finished');
    const duration = (Date.now() - (startTime || Date.now())) / 60000;
    const finalWpm = Math.round((snippet.length / 5) / duration);
    setWpm(finalWpm);
    setLeaderboard(prev => [{ wpm: finalWpm, accuracy, date: new Date().toLocaleTimeString() }, ...prev].slice(0, 5));
    
    // Platform-specific celebration scaling
    confetti({
      particleCount: isMobile ? 80 : 200, // Less particles on mobile
      spread: isMobile ? 60 : 120,
      origin: { y: 0.6 },
      colors: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'],
    });
  };

  const renderSnippet = () => {
    return snippet.split('').map((char, index) => {
      let color = 'text-gray-600';
      let bg = 'bg-transparent';
      let isCursor = index === input.length;
      
      if (index < input.length) {
        color = input[index] === char ? 'text-gray-100' : 'text-red-400';
        if (input[index] !== char) bg = 'bg-red-500/10';
      }

      return (
        <span key={index} className={`${color} ${bg} ${isCursor ? 'cursor-active bg-blue-500/50 animate-pulse text-white' : ''} rounded-[1px] relative`}>
          {char}
        </span>
      );
    });
  };

  // --- SPLASH SCREENS ---

  const MobileSplash = () => (
    <motion.div 
      className="absolute inset-0 z-50 bg-slate-900 flex flex-col items-center justify-center p-6"
      exit={{ y: '-100%', transition: { duration: 0.5, ease: "easeInOut" } }}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1, rotate: [0, -10, 10, 0] }}
        transition={{ duration: 0.6, type: "spring" }}
        className="w-24 h-24 bg-blue-600 rounded-3xl flex items-center justify-center shadow-xl mb-6"
      >
        <Fingerprint size={48} className="text-white" />
      </motion.div>
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-3xl font-bold text-white tracking-tight"
      >
        DevType
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 0.5 }}
        className="text-blue-300 mt-2 text-sm"
      >
        Tap. Type. Dominate.
      </motion.p>
    </motion.div>
  );

  const DesktopSplash = () => (
    <motion.div 
      className="absolute inset-0 z-50 bg-black flex flex-col items-center justify-center overflow-hidden"
      exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)", transition: { duration: 0.8 } }}
    >
      {/* Matrix Grid Background */}
      <div className="absolute inset-0 opacity-20" 
           style={{ backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(37, 99, 235, .3) 25%, rgba(37, 99, 235, .3) 26%, transparent 27%, transparent 74%, rgba(37, 99, 235, .3) 75%, rgba(37, 99, 235, .3) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(37, 99, 235, .3) 25%, rgba(37, 99, 235, .3) 26%, transparent 27%, transparent 74%, rgba(37, 99, 235, .3) 75%, rgba(37, 99, 235, .3) 76%, transparent 77%, transparent)', backgroundSize: '50px 50px' }} 
      />
      
      <div className="relative z-10 flex flex-col items-center">
        <motion.div 
          initial={{ width: 0 }} 
          animate={{ width: '100%' }} 
          transition={{ duration: 1.5, ease: "linear" }}
          className="overflow-hidden whitespace-nowrap border-r-4 border-green-500 pr-1 mb-4"
        >
          <span className="text-4xl font-mono text-green-500 font-bold">Initializing DevType...</span>
        </motion.div>
        
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 1.8, duration: 0.5 }}
           className="flex gap-4"
        >
           <div className="flex items-center gap-2 text-blue-400 bg-blue-900/20 px-4 py-2 rounded-full border border-blue-500/30">
              <Cpu size={16} /> 
              <span className="text-xs font-mono">SYSTEM_READY</span>
           </div>
           <div className="flex items-center gap-2 text-purple-400 bg-purple-900/20 px-4 py-2 rounded-full border border-purple-500/30">
              <TerminalIcon size={16} /> 
              <span className="text-xs font-mono">KERNEL_LOADED</span>
           </div>
        </motion.div>
      </div>
    </motion.div>
  );

  return (
    <div className="h-full w-full bg-slate-900 relative overflow-hidden font-sans text-slate-200">
      <AnimatePresence>
        {showSplash && (isMobile ? <MobileSplash /> : <DesktopSplash />)}
      </AnimatePresence>

      {!showSplash && (
        <motion.div
          initial={isMobile ? { y: 100, opacity: 0 } : { scale: 0.95, opacity: 0 }}
          animate={{ y: 0, scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="h-full w-full flex flex-col md:grid md:grid-cols-[240px_1fr] md:grid-rows-1"
        >
          
          {/* --- LEFT PANEL (Desktop Sidebar / Mobile Header) --- */}
          <div className={`${isMobile ? 'h-auto p-3 flex justify-between items-center bg-slate-800/80 border-b border-slate-700' : 'h-full bg-slate-950 p-6 border-r border-slate-800 flex flex-col'}`}>
            
            {/* Logo area */}
            <div className={`flex items-center gap-3 ${isMobile ? '' : 'mb-8'}`}>
              <div className="bg-blue-600 p-2 rounded-lg text-white shadow-lg shadow-blue-900/20">
                <Keyboard size={isMobile ? 20 : 24} />
              </div>
              <h1 className={`${isMobile ? 'text-lg' : 'text-2xl'} font-bold text-white tracking-tight`}>DevType</h1>
            </div>

            {/* Mode Selectors */}
            <div className={`${isMobile ? 'flex gap-2' : 'flex flex-col gap-3'}`}>
              {(['text', 'code'] as const).map(m => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className={`
                    relative overflow-hidden transition-all duration-300
                    ${isMobile ? 'px-3 py-1.5 text-xs rounded-full' : 'w-full p-4 rounded-xl text-left hover:translate-x-1'}
                    ${mode === m 
                      ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg' 
                      : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'}
                  `}
                >
                  <div className="flex items-center gap-3 relative z-10">
                    {m === 'text' ? <Type size={16} /> : <Code size={16} />}
                    <span className="font-semibold capitalize">{m}</span>
                  </div>
                  {/* Desktop Glow Effect */}
                  {!isMobile && mode === m && (
                    <div className="absolute -right-4 -bottom-4 w-12 h-12 bg-white/20 blur-xl rounded-full" />
                  )}
                </button>
              ))}
            </div>

            {/* Desktop Stats (Moved to sidebar for desktop) */}
            {!isMobile && (
              <div className="mt-auto space-y-4">
                 <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800">
                    <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Session Best</div>
                    <div className="text-2xl font-mono text-green-400 font-bold">{Math.max(...leaderboard.map(s => s.wpm), 0)} WPM</div>
                 </div>
                 <div className="text-xs text-slate-600 text-center">v1.0.4 • Stable Build</div>
              </div>
            )}
          </div>

          {/* --- MAIN GAME AREA --- */}
          <div className="relative flex-1 flex flex-col overflow-hidden">
            
            {/* Mobile Stats Bar (Only on mobile) */}
            {isMobile && (
              <div className="bg-slate-900/50 p-2 flex justify-around border-b border-slate-800/50 backdrop-blur-sm z-10">
                 <div className="flex flex-col items-center">
                    <span className="text-[10px] text-slate-400 uppercase">WPM</span>
                    <span className="text-xl font-bold text-blue-400 leading-none">{wpm}</span>
                 </div>
                 <div className="flex flex-col items-center">
                    <span className="text-[10px] text-slate-400 uppercase">ACC</span>
                    <span className="text-xl font-bold text-green-400 leading-none">{accuracy}%</span>
                 </div>
              </div>
            )}

            {/* Typing Container */}
            <div 
              className="flex-1 overflow-y-auto custom-scrollbar flex flex-col items-center p-4 md:p-10 md:justify-center"
              onClick={() => inputRef.current?.focus()}
            >
              {/* Desktop Live Stats (Floating Header) */}
              {!isMobile && (
                 <div className="absolute top-6 right-8 flex gap-8">
                    <div className="flex items-end gap-2">
                       <span className="text-4xl font-bold text-slate-100">{wpm}</span>
                       <span className="text-sm text-slate-500 font-medium mb-1.5">WPM</span>
                    </div>
                    <div className="flex items-end gap-2">
                       <span className={`text-4xl font-bold ${accuracy > 90 ? 'text-green-400' : 'text-yellow-400'}`}>{accuracy}</span>
                       <span className="text-sm text-slate-500 font-medium mb-1.5">% ACC</span>
                    </div>
                 </div>
              )}

              {/* Code/Text Display */}
              <div className="relative w-full max-w-4xl min-h-[200px] md:min-h-[300px]">
                 
                 {/* The Text */}
                 <div 
                    ref={scrollRef}
                    className={`
                      font-mono leading-relaxed break-words whitespace-pre-wrap select-none pointer-events-none relative z-10
                      ${isMobile ? 'text-lg' : 'text-2xl lg:text-3xl'}
                      ${gameState === 'idle' ? 'opacity-50 blur-[1px]' : 'opacity-100 blur-0'}
                      transition-all duration-500
                    `}
                 >
                    {renderSnippet()}
                 </div>

                 {/* Input Overlay */}
                 <textarea
                    ref={inputRef}
                    value={input}
                    onChange={handleInputChange}
                    className="absolute inset-0 w-full h-full opacity-0 z-20 cursor-default resize-none"
                    autoComplete="off"
                    autoCapitalize="off"
                    spellCheck="false"
                    disabled={gameState === 'finished'}
                 />

                 {/* Idle Overlay Prompt */}
                 <AnimatePresence>
                   {gameState === 'idle' && (
                     <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 flex items-center justify-center z-10"
                     >
                        {isMobile ? (
                          <div className="flex flex-col items-center animate-pulse">
                             <div className="bg-blue-600/20 p-4 rounded-full mb-2">
                                <Fingerprint size={32} className="text-blue-400" />
                             </div>
                             <span className="text-blue-300 font-medium">Tap to Start</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-3 text-slate-400">
                             <span className="bg-slate-800 px-3 py-1 rounded border border-slate-700 text-sm">Type</span>
                             <span>to start...</span>
                          </div>
                        )}
                     </motion.div>
                   )}
                 </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Results Overlay */}
      <AnimatePresence>
        {gameState === 'finished' && (
           <motion.div 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             className="absolute inset-0 z-40 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4"
           >
              <motion.div 
                 initial={{ scale: 0.8, y: 50 }}
                 animate={{ scale: 1, y: 0 }}
                 className={`
                   bg-slate-900 border border-slate-700 shadow-2xl overflow-hidden
                   ${isMobile ? 'w-full rounded-2xl p-6' : 'w-[500px] rounded-3xl p-8'}
                 `}
              >
                 <div className="flex flex-col items-center text-center">
                    <div className="bg-yellow-500/10 p-4 rounded-full mb-4 border border-yellow-500/20">
                       <Trophy size={isMobile ? 32 : 48} className="text-yellow-400" />
                    </div>
                    
                    <h2 className="text-3xl font-bold text-white mb-2">Run Complete</h2>
                    <p className="text-slate-400 text-sm mb-8">Data synced to local session.</p>

                    <div className="grid grid-cols-2 gap-4 w-full mb-8">
                       <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700">
                          <div className="text-xs text-slate-500 uppercase font-bold mb-1">Speed</div>
                          <div className="text-3xl font-bold text-blue-400">{wpm}</div>
                       </div>
                       <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700">
                          <div className="text-xs text-slate-500 uppercase font-bold mb-1">Accuracy</div>
                          <div className="text-3xl font-bold text-green-400">{accuracy}%</div>
                       </div>
                    </div>

                    <button 
                       onClick={resetGame}
                       className={`
                         w-full font-bold flex items-center justify-center gap-2 transition-all active:scale-95
                         ${isMobile ? 'py-4 text-lg bg-blue-600 rounded-xl text-white' : 'py-3 bg-white text-slate-900 rounded-xl hover:bg-slate-200'}
                       `}
                    >
                       <RotateCcw size={20} />
                       Play Again
                    </button>
                 </div>
              </motion.div>
           </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TypingGame;