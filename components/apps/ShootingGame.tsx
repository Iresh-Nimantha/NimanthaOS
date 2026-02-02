import React, { useRef, useEffect, useState } from 'react';
import { Rocket, Trophy, RotateCcw, Crosshair } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

const ShootingGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Game State Refs (for animation loop)
  const playerRef = useRef({ x: 0, width: 40, height: 40, speed: 5 });
  const bulletsRef = useRef<{ x: number; y: number; width: number; height: number; speed: number }[]>([]);
  const enemiesRef = useRef<{ x: number; y: number; width: number; height: number; speed: number; id: number }[]>([]);
  const controlsRef = useRef({ left: false, right: false, fire: false });
  const frameRef = useRef<number>(0);
  const lastEnemySpawnRef = useRef<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const initGame = () => {
    if (!canvasRef.current || !containerRef.current) return;
    
    // Set Canvas Size
    const { clientWidth, clientHeight } = containerRef.current;
    canvasRef.current.width = clientWidth;
    canvasRef.current.height = clientHeight;

    // Reset State
    playerRef.current.x = clientWidth / 2 - 20;
    bulletsRef.current = [];
    enemiesRef.current = [];
    setScore(0);
    setGameOver(false);
    setGameStarted(true);
    lastEnemySpawnRef.current = 0;

    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    loop();
  };

  const spawnEnemy = (canvasWidth: number) => {
    const size = isMobile ? 30 : 40;
    enemiesRef.current.push({
      x: Math.random() * (canvasWidth - size),
      y: -size,
      width: size,
      height: size,
      speed: isMobile ? 1.5 : 2, 
      id: Date.now() + Math.random()
    });
  };

  const update = (canvas: HTMLCanvasElement) => {
    if (gameOver) return;

    // Move Player
    if (controlsRef.current.left && playerRef.current.x > 0) {
      playerRef.current.x -= playerRef.current.speed;
    }
    if (controlsRef.current.right && playerRef.current.x < canvas.width - playerRef.current.width) {
      playerRef.current.x += playerRef.current.speed;
    }

    // Fire Bullet
    if (controlsRef.current.fire && frameRef.current % 15 === 0) {
       bulletsRef.current.push({
         x: playerRef.current.x + playerRef.current.width / 2 - 2,
         y: canvas.height - playerRef.current.height,
         width: 4,
         height: 10,
         speed: 7
       });
    }

    // Move Bullets
    bulletsRef.current.forEach(b => b.y -= b.speed);
    bulletsRef.current = bulletsRef.current.filter(b => b.y > 0);

    // Spawn Enemies
    if (Date.now() - lastEnemySpawnRef.current > (isMobile ? 1500 : 1200)) {
      spawnEnemy(canvas.width);
      lastEnemySpawnRef.current = Date.now();
    }

    // Move Enemies & Collision
    enemiesRef.current.forEach(enemy => {
      enemy.y += enemy.speed;

      // Check Collision with Player
      if (
        playerRef.current.x < enemy.x + enemy.width &&
        playerRef.current.x + playerRef.current.width > enemy.x &&
        canvas.height - playerRef.current.height < enemy.y + enemy.height &&
        canvas.height > enemy.y
      ) {
        endGame();
      }
    });

    // Check Bullet hits
    bulletsRef.current.forEach(bullet => {
      enemiesRef.current.forEach(enemy => {
        if (
          bullet.x < enemy.x + enemy.width &&
          bullet.x + bullet.width > enemy.x &&
          bullet.y < enemy.y + enemy.height &&
          bullet.y + bullet.height > enemy.y
        ) {
          // Hit
          setScore(s => s + 10);
          // Mark for deletion
          enemy.y = canvas.height + 100; // Move off screen
          bullet.y = -100;
        }
      });
    });

    // Cleanup Enemies
    enemiesRef.current = enemiesRef.current.filter(e => e.y < canvas.height);
  };

  const draw = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw Player (Ship)
    ctx.fillStyle = '#3b82f6';
    ctx.beginPath();
    ctx.moveTo(playerRef.current.x + playerRef.current.width / 2, canvas.height - playerRef.current.height);
    ctx.lineTo(playerRef.current.x + playerRef.current.width, canvas.height);
    ctx.lineTo(playerRef.current.x, canvas.height);
    ctx.fill();

    // Draw Bullets
    ctx.fillStyle = '#ef4444'; // Red lasers
    bulletsRef.current.forEach(b => {
      ctx.fillRect(b.x, b.y, b.width, b.height);
    });

    // Draw Enemies
    enemiesRef.current.forEach(e => {
      ctx.fillStyle = '#10b981'; // Green aliens
      ctx.fillRect(e.x, e.y, e.width, e.height);
      
      // Eyes
      ctx.fillStyle = '#000';
      ctx.fillRect(e.x + 5, e.y + 10, 5, 5);
      ctx.fillRect(e.x + e.width - 10, e.y + 10, 5, 5);
    });
  };

  const loop = () => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    update(canvasRef.current);
    draw(ctx, canvasRef.current);

    if (!gameOver) {
      frameRef.current = requestAnimationFrame(loop);
    }
  };

  const endGame = () => {
    setGameOver(true);
    setGameStarted(false);
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    if (score > 100) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  // Input Handlers
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'ArrowLeft') controlsRef.current.left = true;
      if (e.code === 'ArrowRight') controlsRef.current.right = true;
      if (e.code === 'Space') controlsRef.current.fire = true;
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === 'ArrowLeft') controlsRef.current.left = false;
      if (e.code === 'ArrowRight') controlsRef.current.right = false;
      if (e.code === 'Space') controlsRef.current.fire = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return (
    <div ref={containerRef} className="h-full w-full bg-slate-900 relative overflow-hidden font-mono select-none">
      
      {/* Background Starfield Effect */}
      <div className="absolute inset-0 z-0 opacity-50" 
        style={{ backgroundImage: 'radial-gradient(white 1px, transparent 1px)', backgroundSize: '30px 30px' }} 
      />

      {/* Header / Score HUD */}
      <div className="absolute top-0 w-full p-4 flex justify-between items-center z-20 text-white">
         <div className="flex items-center gap-2">
            <Rocket className="text-blue-400" />
            <span className="font-bold hidden sm:inline">SpaceDefender</span>
         </div>
         <div className="bg-slate-800/80 px-4 py-2 rounded-full border border-white/10 flex gap-4">
             <div className="flex items-center gap-2">
               <Trophy size={16} className="text-yellow-400"/>
               <span className="font-bold text-xl">{score}</span>
             </div>
         </div>
      </div>

      <canvas ref={canvasRef} className="absolute inset-0 z-10 block" />

      {/* START SCREEN */}
      <AnimatePresence>
        {!gameStarted && !gameOver && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 z-30 bg-black/80 flex flex-col items-center justify-center p-6 text-center"
          >
             <div className="mb-6 p-6 bg-blue-500/20 rounded-full animate-pulse">
                <Crosshair size={64} className="text-blue-400" />
             </div>
             <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">Space Defender</h1>
             <p className="text-gray-400 mb-8 max-w-md">
               Defend the system from bugs and glitches. <br/>
               {isMobile ? 'Use controls below to move & fire.' : 'Use Arrow Keys to Move, Space to Shoot.'}
             </p>
             <button 
               onClick={initGame}
               className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-xl font-bold text-lg shadow-[0_0_20px_rgba(37,99,235,0.5)] transition-transform active:scale-95"
             >
               Launch Mission
             </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* GAME OVER SCREEN */}
      <AnimatePresence>
        {gameOver && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 z-30 bg-red-900/90 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center"
          >
             <h2 className="text-3xl font-bold text-white mb-2">Mission Failed</h2>
             <div className="text-5xl font-bold text-yellow-400 mb-6">{score}</div>
             <button 
               onClick={initGame}
               className="bg-white text-red-600 px-8 py-3 rounded-xl font-bold text-lg shadow-xl flex items-center gap-2 transition-transform active:scale-95 hover:bg-gray-100"
             >
               <RotateCcw size={20} />
               Retry
             </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MOBILE CONTROLS */}
      {isMobile && (
        <div className="absolute bottom-0 w-full h-48 z-40 pb-6 px-6 flex justify-between items-end bg-gradient-to-t from-black/90 to-transparent">
           {/* D-PAD */}
           <div className="flex gap-4 mb-2">
              <button 
                className="w-20 h-20 bg-white/10 border-2 border-white/20 rounded-full flex items-center justify-center active:bg-blue-500/50 active:scale-90 transition-all backdrop-blur-md"
                onTouchStart={(e) => { e.preventDefault(); controlsRef.current.left = true; }}
                onTouchEnd={(e) => { e.preventDefault(); controlsRef.current.left = false; }}
              >
                <span className="text-4xl text-white font-bold">←</span>
              </button>
              <button 
                className="w-20 h-20 bg-white/10 border-2 border-white/20 rounded-full flex items-center justify-center active:bg-blue-500/50 active:scale-90 transition-all backdrop-blur-md"
                onTouchStart={(e) => { e.preventDefault(); controlsRef.current.right = true; }}
                onTouchEnd={(e) => { e.preventDefault(); controlsRef.current.right = false; }}
              >
                <span className="text-4xl text-white font-bold">→</span>
              </button>
           </div>

           {/* FIRE BUTTON */}
           <button 
              className="w-24 h-24 mb-2 bg-red-500/20 border-4 border-red-500/50 rounded-full flex items-center justify-center active:bg-red-500 active:scale-90 transition-all shadow-[0_0_30px_rgba(239,68,68,0.3)] backdrop-blur-md"
              onTouchStart={(e) => { e.preventDefault(); controlsRef.current.fire = true; }}
              onTouchEnd={(e) => { e.preventDefault(); controlsRef.current.fire = false; }}
           >
              <Crosshair size={48} className="text-white" />
           </button>
        </div>
      )}

    </div>
  );
};

export default ShootingGame;