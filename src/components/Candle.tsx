import { motion } from 'framer-motion';

export const Candle = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
      transition={{ duration: 0.8 }}
      className="relative flex flex-col items-center justify-center h-56 w-full"
    >
      {/* Flame Container */}
      <motion.div 
        animate={{ 
          scale: [1, 1.05, 0.95, 1.02, 1],
          rotate: [-1, 2, -1.5, 1, 0]
        }}
        transition={{ 
          duration: 0.15, 
          repeat: Infinity, 
          repeatType: "mirror",
          ease: "easeInOut" 
        }}
        className="relative z-10 w-10 h-20 origin-bottom flex justify-center -mb-2"
      >
        {/* Outer Glow */}
        <div className="absolute inset-0 bg-orange-500/30 rounded-[50%_50%_20%_20%] blur-xl scale-150"></div>
        
        {/* Mid Flame (Orange/Yellow) */}
        <div className="absolute bottom-0 w-8 h-16 bg-gradient-to-t from-yellow-400 to-orange-500 rounded-[50%_50%_20%_20%] blur-[2px] shadow-[0_0_20px_rgba(255,165,0,0.8)] mix-blend-screen"></div>
        
        {/* Inner Flame (White/Yellow) */}
        <div className="absolute bottom-2 w-4 h-8 bg-white rounded-[50%_50%_20%_20%] shadow-[0_0_10px_white]"></div>
        
        {/* Flame Base (Blue) */}
        <div className="absolute bottom-0 w-5 h-4 bg-blue-500/60 rounded-full blur-[2px]"></div>
      </motion.div>
      
      {/* Wick */}
      <div className="w-1.5 h-4 bg-gradient-to-t from-gray-900 to-gray-700 rounded-t-full z-0 relative"></div>
      
      {/* Candle Body (3D Cylinder) */}
      <div className="relative w-24 h-32 rounded-b-xl shadow-[-10px_10px_20px_rgba(0,0,0,0.3)] bg-gradient-to-r from-pink-400 via-pink-200 to-pink-500">
        
        {/* Top rim / melted wax interior (3D effect) */}
        <div className="absolute -top-3 w-full h-6 rounded-[50%] bg-gradient-to-br from-pink-200 to-pink-300 shadow-[inset_0_-2px_5px_rgba(0,0,0,0.1)] border border-pink-300">
           {/* Center well for wick */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-3 bg-pink-400/30 rounded-[50%] blur-[1px]"></div>
        </div>
        
        {/* Wax drips on the sides */}
        <div className="absolute top-2 left-2 w-3 h-12 bg-gradient-to-b from-pink-200 to-pink-300 rounded-b-full shadow-sm drop-shadow-md"></div>
        <div className="absolute top-2 right-4 w-2 h-16 bg-gradient-to-b from-pink-200 to-pink-300 rounded-b-full shadow-sm drop-shadow-md"></div>
        <div className="absolute top-2 left-8 w-1.5 h-8 bg-gradient-to-b from-pink-200 to-pink-300 rounded-b-full shadow-sm drop-shadow-md"></div>
        <div className="absolute top-2 left-1/2 w-2 h-10 bg-gradient-to-b from-pink-200 to-pink-300 rounded-b-full shadow-sm drop-shadow-md"></div>
      </div>
      
      {/* Ambient glow on the floor */}
      <div className="absolute -bottom-4 w-32 h-6 bg-yellow-500/20 blur-xl rounded-[50%] scale-150"></div>
    </motion.div>
  );
};
