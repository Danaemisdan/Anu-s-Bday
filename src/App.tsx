import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { SlideToUnlock } from './components/SlideToUnlock';
import { Candle } from './components/Candle';
import { Heart } from 'lucide-react';

export default function App() {
  const [stage, setStage] = useState(0);

  const handleUnlock = () => {
    setStage(1);
  };

  useEffect(() => {
    if (stage === 1) {
      // Trigger 3D realistic confetti explosion
      const duration = 3000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#ff0000', '#ffc0cb', '#ff69b4', '#8a2be2', '#4169e1']
        });
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#ff0000', '#ffc0cb', '#ff69b4', '#8a2be2', '#4169e1']
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();

      const t1 = setTimeout(() => {
        setStage(2); // Start fade out of birthday message
      }, 4000);
      return () => clearTimeout(t1);

    } else if (stage === 2) {
      const t2 = setTimeout(() => {
        setStage(3); // Show I LOVE YOU and picture
      }, 1500);
      return () => clearTimeout(t2);

    } else if (stage === 3) {
      const t3 = setTimeout(() => {
        setStage(4); // Show final credit
      }, 2500);
      return () => clearTimeout(t3);
    }
  }, [stage]);

  return (
    <div className="flex min-h-[100dvh] w-full flex-col items-center justify-center bg-black p-4 overflow-hidden relative">
      
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/40 via-purple-900/20 to-black"></div>
        {stage > 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-pink-900/30 via-red-900/10 to-transparent"
          />
        )}
      </div>

      <div className="z-10 w-full max-w-md flex flex-col items-center justify-center relative min-h-[400px]">
        <AnimatePresence mode="wait">
          
          {/* Stage 0: Locked with Candle */}
          {stage === 0 && (
            <motion.div
              key="locked"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, y: -50, scale: 0.9 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="flex flex-col items-center w-full gap-8"
            >
              <Candle />
              <SlideToUnlock
                onUnlock={handleUnlock}
                sliderText="Swipe to light up!"
                className="bg-white/5 border-white/10"
              />
            </motion.div>
          )}

          {/* Stage 1 & 2: Happy Birthday Message */}
          {(stage === 1 || stage === 2) && (
            <motion.div
              key="birthday"
              initial={{ opacity: 0, scale: 0.5, y: 50 }}
              animate={{ opacity: stage === 1 ? 1 : 0, scale: stage === 1 ? 1 : 1.1, y: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="text-center absolute inset-0 flex items-center justify-center"
            >
              <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-pink-300 via-purple-300 to-indigo-400 drop-shadow-[0_0_15px_rgba(236,72,153,0.5)] leading-tight px-4">
                Happy Birthday <br/>
                <span className="text-white drop-shadow-[0_0_25px_rgba(255,255,255,0.8)] font-serif italic mt-4 block">Ananya!</span>
              </h1>
            </motion.div>
          )}

          {/* Stage 3 & 4: I LOVE YOU + Picture */}
          {stage >= 3 && (
            <motion.div
              key="loveyou"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5 }}
              className="flex flex-col items-center gap-8 w-full relative z-20"
            >
              <motion.div 
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 2, ease: "easeOut" }}
                className="flex items-center gap-3 text-4xl md:text-5xl font-bold text-white drop-shadow-[0_0_20px_rgba(255,0,128,0.8)] tracking-wider"
              >
                I LOVE YOU ANU
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  <Heart className="w-10 h-10 text-red-500 fill-red-500" />
                </motion.div>
              </motion.div>

              {/* Picture Frame */}
              <motion.div 
                initial={{ opacity: 0, rotate: -5 }}
                animate={{ opacity: 1, rotate: 2 }}
                transition={{ delay: 0.5, duration: 1.5, type: "spring" }}
                className="p-3 bg-white rounded-xl shadow-2xl pb-12 rotate-2 hover:rotate-0 transition-transform duration-500 max-w-[420px] w-full relative"
              >
                <div className="w-full bg-gray-200 rounded-lg overflow-hidden border border-gray-100 relative">
                  
                  {/* Anu's Picture */}
                  <img 
                    src="/724188469_2095981644661154_2593922594389682270_n.jpg" 
                    alt="Anu" 
                    className="w-full h-auto block"
                  />
                  
                  <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-lg pointer-events-none"></div>
                </div>
                
                {/* Decorative tape */}
                <div className="absolute top-[-15px] left-1/2 -translate-x-1/2 w-20 h-8 bg-white/40 backdrop-blur-md -rotate-3 border border-white/50 shadow-sm"></div>
              </motion.div>

            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Stage 4: Credits */}
      <AnimatePresence>
        {stage >= 4 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.5 }}
            className="absolute bottom-6 text-center w-full z-10"
          >
            <p className="text-gray-400 font-light text-sm tracking-widest uppercase flex items-center justify-center gap-2">
              Made with <Heart className="w-3 h-3 text-red-500 fill-red-500" /> from Sanju
            </p>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
