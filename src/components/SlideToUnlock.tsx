import { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';

interface SlideToUnlockProps {
  children?: React.ReactNode;
  onUnlock: () => void;
  sliderText?: string;
  className?: string;
  shimmer?: boolean;
}

export const SlideToUnlock = ({
  children,
  onUnlock,
  sliderText = 'Swipe to open the gift',
  className,
  shimmer = true,
}: SlideToUnlockProps) => {
  const [unlocked, setUnlocked] = useState(false);
  const [dragConstraint, setDragConstraint] = useState(0);
  const x = useMotionValue(0);

  const sliderRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sliderWidth = sliderRef.current?.offsetWidth || 0;
    const handleWidth = handleRef.current?.offsetWidth || 0;
    setDragConstraint(sliderWidth - handleWidth);
  }, []);

  const onDragEnd = (_event: any, info: any) => {
    // Unlock if dragged more than 55% OR if swiped quickly to the right
    if (info.offset.x > dragConstraint * 0.55 || info.velocity.x > 500) {
      setUnlocked(true);
      onUnlock();
    } else {
      x.set(0);
    }
  };

  const textOpacity = useTransform(x, [0, 50], [1, 0]);

  return (
    <div className={cn("relative w-full max-w-xs overflow-hidden rounded-2xl border bg-card/80 p-6 text-card-foreground shadow-sm backdrop-blur-sm transition-all duration-500", unlocked ? "opacity-0 scale-95 pointer-events-none" : "opacity-100 scale-100", className)}>
      {children}
      <div className="relative mt-6">
        <div ref={sliderRef} className="relative h-14 w-full rounded-full bg-secondary overflow-hidden shadow-inner border border-white/20">
          <motion.div
            ref={handleRef}
            drag="x"
            dragConstraints={{ left: 0, right: dragConstraint }}
            dragElastic={0.1}
            style={{ x }}
            onDragEnd={onDragEnd}
            className="absolute left-0 top-0 z-10 flex h-14 w-14 cursor-grab items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-purple-500 shadow-md active:cursor-grabbing hover:scale-105 transition-transform touch-none"
          >
            <ChevronRight className="h-6 w-6 text-white" />
          </motion.div>
          <motion.span
            style={{ opacity: textOpacity }}
            className={cn(
              "absolute inset-0 flex items-center justify-center pl-8 text-sm font-medium text-muted-foreground",
              shimmer && "animate-shimmer bg-[linear-gradient(110deg,#9ca3af,45%,#e5e7eb,55%,#9ca3af)] bg-[length:200%_100%] bg-clip-text text-transparent"
            )}
          >
            {sliderText}
          </motion.span>
        </div>
      </div>
    </div>
  );
};
