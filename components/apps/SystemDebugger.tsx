import React, { useState, useEffect } from 'react';
import { Bug, CheckCircle, Download, AlertTriangle } from 'lucide-react';
import confetti from 'canvas-confetti';

interface BugItem {
  id: number;
  x: number;
  y: number;
  fixed: boolean;
}

const SystemDebugger: React.FC = () => {
  const [bugs, setBugs] = useState<BugItem[]>([]);
  const [score, setScore] = useState(0);
  const [gameWon, setGameWon] = useState(false);

  useEffect(() => {
    // Generate random bugs
    const newBugs = Array.from({ length: 10 }).map((_, i) => ({
      id: i,
      x: Math.random() * 80 + 10, // 10% to 90%
      y: Math.random() * 80 + 10,
      fixed: false,
    }));
    setBugs(newBugs);
  }, []);

  const fixBug = (id: number) => {
    setBugs(prev => prev.map(bug => bug.id === id ? { ...bug, fixed: true } : bug));
    const newScore = score + 1;
    setScore(newScore);

    if (newScore === 10) {
      setGameWon(true);
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  return (
    <div className="h-full bg-slate-900 text-white p-4 relative overflow-hidden font-mono flex flex-col items-center justify-center">
      {!gameWon ? (
        <>
          <div className="absolute top-4 left-4 z-10 bg-slate-800 p-2 rounded border border-red-500/50 flex items-center gap-2">
            <AlertTriangle className="text-red-500 animate-pulse" size={16} />
            <span className="text-sm">Critical System Errors Detected: {10 - score}</span>
          </div>
          
          <div className="text-center mb-8 pointer-events-none z-10 bg-black/50 p-4 rounded-xl backdrop-blur-sm">
             <h2 className="text-xl font-bold text-red-400 mb-2">SYSTEM UNSTABLE</h2>
             <p className="text-xs text-gray-300">Click the bugs to patch the system kernel.</p>
          </div>

          <div className="absolute inset-0">
            {bugs.map(bug => (
              !bug.fixed && (
                <button
                  key={bug.id}
                  onClick={() => fixBug(bug.id)}
                  className="absolute p-2 hover:scale-110 transition-transform cursor-crosshair"
                  style={{ top: `${bug.y}%`, left: `${bug.x}%` }}
                >
                  <Bug className="text-red-500" size={24} />
                </button>
              )
            ))}
          </div>
        </>
      ) : (
        <div className="text-center z-10 animate-in zoom-in duration-500">
          <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-500/50">
            <CheckCircle className="text-green-400" size={48} />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">SYSTEM RESTORED</h2>
          <p className="text-gray-400 mb-6">Kernel patched successfully. Credentials verified.</p>
          
          <div className="bg-slate-800 p-6 rounded-xl border border-blue-500/30 max-w-sm mx-auto">
            <h3 className="font-bold text-blue-300 mb-4">Unlocked Certifications</h3>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-between p-3 bg-white/5 rounded hover:bg-white/10 transition-colors group">
                <span className="text-sm text-left">MERN Stack Development</span>
                <Download size={16} className="text-gray-500 group-hover:text-blue-400" />
              </button>
              <button className="w-full flex items-center justify-between p-3 bg-white/5 rounded hover:bg-white/10 transition-colors group">
                <span className="text-sm text-left">n8n Level 1 Certification</span>
                <Download size={16} className="text-gray-500 group-hover:text-blue-400" />
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Matrix background effect overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-10 bg-[linear-gradient(0deg,rgba(0,0,0,0)_50%,rgba(0,255,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:10px_10px,100%_100%]"></div>
    </div>
  );
};

export default SystemDebugger;