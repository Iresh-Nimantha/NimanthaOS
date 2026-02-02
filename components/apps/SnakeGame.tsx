import React, { useState, useEffect, useCallback } from 'react';
import { Download, ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';

const GRID_SIZE = 20;
const CELL_SIZE = 15;
const BOARD_WIDTH = 20;
const BOARD_HEIGHT = 20;
// Increased interval to make the game easier (slower)
const GAME_SPEED = 200; 

const SnakeGame: React.FC = () => {
  const [snake, setSnake] = useState<{ x: number; y: number }[]>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState({ x: 15, y: 10 });
  const [direction, setDirection] = useState<'UP' | 'DOWN' | 'LEFT' | 'RIGHT'>('RIGHT');
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const spawnFood = useCallback(() => {
    return {
      x: Math.floor(Math.random() * BOARD_WIDTH),
      y: Math.floor(Math.random() * BOARD_HEIGHT),
    };
  }, []);

  const resetGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setFood(spawnFood());
    setDirection('RIGHT');
    setScore(0);
    setGameOver(false);
    setIsPlaying(true);
  };

  const handleDirectionChange = (newDir: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT') => {
    setDirection(prev => {
      if (prev === 'UP' && newDir === 'DOWN') return prev;
      if (prev === 'DOWN' && newDir === 'UP') return prev;
      if (prev === 'LEFT' && newDir === 'RIGHT') return prev;
      if (prev === 'RIGHT' && newDir === 'LEFT') return prev;
      return newDir;
    });
  };

  useEffect(() => {
    if (!isPlaying || gameOver) return;

    const moveSnake = setInterval(() => {
      setSnake((prev) => {
        const head = { ...prev[0] };

        switch (direction) {
          case 'UP': head.y -= 1; break;
          case 'DOWN': head.y += 1; break;
          case 'LEFT': head.x -= 1; break;
          case 'RIGHT': head.x += 1; break;
        }

        if (
          head.x < 0 || head.x >= BOARD_WIDTH ||
          head.y < 0 || head.y >= BOARD_HEIGHT ||
          prev.some((seg) => seg.x === head.x && seg.y === head.y)
        ) {
          setGameOver(true);
          return prev;
        }

        const newSnake = [head, ...prev];
        if (head.x === food.x && head.y === food.y) {
          setScore((s) => s + 1);
          setFood(spawnFood());
        } else {
          newSnake.pop();
        }
        return newSnake;
      });
    }, GAME_SPEED);

    return () => clearInterval(moveSnake);
  }, [isPlaying, gameOver, direction, food, spawnFood]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!isPlaying) return;
      switch (e.key) {
        case 'ArrowUp': handleDirectionChange('UP'); break;
        case 'ArrowDown': handleDirectionChange('DOWN'); break;
        case 'ArrowLeft': handleDirectionChange('LEFT'); break;
        case 'ArrowRight': handleDirectionChange('RIGHT'); break;
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [direction, isPlaying]);

  return (
    <div className="flex flex-col items-center justify-center h-full relative">
      <div className="flex justify-between w-full max-w-[300px] mb-2 text-sm">
        <span>Score: {score}</span>
        {score >= 10 && (
          <span className="text-green-400 font-bold flex items-center animate-pulse">
            <Download size={12} className="mr-1" /> CV Unlocked!
          </span>
        )}
      </div>

      <div 
        className="bg-black border border-gray-700 relative shadow-lg"
        style={{ width: BOARD_WIDTH * CELL_SIZE, height: BOARD_HEIGHT * CELL_SIZE }}
      >
        {!isPlaying && !gameOver && (
           <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-10">
              <button 
                onClick={resetGame}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded text-white text-sm font-bold"
              >
                Start Game
              </button>
           </div>
        )}
        
        {gameOver && (
           <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 z-10 text-center p-4">
              <p className="text-red-500 font-bold mb-2">Game Over!</p>
              <button 
                onClick={resetGame}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white text-sm mb-3 font-bold"
              >
                Try Again
              </button>
              {score >= 10 ? (
                 <a href="#" className="text-green-400 text-xs hover:underline flex items-center">
                    <Download size={12} className="mr-1" /> Download CV (Mock)
                 </a>
              ) : (
                <p className="text-xs text-gray-400">Score 10 to unlock CV</p>
              )}
           </div>
        )}

        {snake.map((seg, i) => (
          <div
            key={i}
            className="absolute bg-green-500"
            style={{
              left: seg.x * CELL_SIZE,
              top: seg.y * CELL_SIZE,
              width: CELL_SIZE - 1,
              height: CELL_SIZE - 1,
            }}
          />
        ))}
        <div
          className="absolute bg-red-500 rounded-full"
          style={{
            left: food.x * CELL_SIZE,
            top: food.y * CELL_SIZE,
            width: CELL_SIZE - 1,
            height: CELL_SIZE - 1,
          }}
        />
      </div>

      {/* Mobile Controls */}
      {isMobile && (
        <div className="mt-6 grid grid-cols-3 gap-2">
           <div />
           <button 
             className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center active:bg-white/30"
             onTouchStart={() => handleDirectionChange('UP')}
             onClick={() => handleDirectionChange('UP')}
           >
             <ChevronUp className="text-white" />
           </button>
           <div />
           
           <button 
             className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center active:bg-white/30"
             onTouchStart={() => handleDirectionChange('LEFT')}
             onClick={() => handleDirectionChange('LEFT')}
           >
             <ChevronLeft className="text-white" />
           </button>
           <button 
             className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center active:bg-white/30"
             onTouchStart={() => handleDirectionChange('DOWN')}
             onClick={() => handleDirectionChange('DOWN')}
           >
             <ChevronDown className="text-white" />
           </button>
           <button 
             className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center active:bg-white/30"
             onTouchStart={() => handleDirectionChange('RIGHT')}
             onClick={() => handleDirectionChange('RIGHT')}
           >
             <ChevronRight className="text-white" />
           </button>
        </div>
      )}
      
      {!isMobile && <p className="text-xs text-gray-500 mt-4">Use Arrow Keys to move.</p>}
    </div>
  );
};

export default SnakeGame;