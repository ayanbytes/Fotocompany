"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const reels = [
  { id: "REEL_001", src: "/reels/reel-1.mp4" },
  { id: "REEL_002", src: "/reels/reel-2.mp4" },
  { id: "REEL_003", src: "/reels/reel-3.mp4" },
  { id: "REEL_004", src: "/reels/reel-4.mp4" },
  { id: "REEL_005", src: "/reels/reel-5.mp4" },
  { id: "REEL_006", src: "/reels/reel-6.mp4" },
];

function ReelCard({ reel, index, onClick }: { reel: { id: string, views?: string, src?: string }; index: number; onClick: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    if (typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches && videoRef.current) {
      videoRef.current.muted = false;
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.muted = true;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="shrink-0 snap-center will-change-transform"
    >
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        onClick={onClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onContextMenu={(e) => e.preventDefault()}
        style={{ WebkitTouchCallout: "none", userSelect: "none" }}
        className="w-[220px] sm:w-[260px] h-[390px] sm:h-[460px] 
                   bg-film border border-dust/10 relative group overflow-hidden cursor-pointer rounded-xl"
      >
        {/* Gradient vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ink/90 z-10 pointer-events-none transition-opacity duration-500 group-hover:opacity-70" />

        {/* Video or Placeholder */}
        <div className="absolute inset-0 z-0">
          {reel.src ? (
            <video
              ref={videoRef}
              src={reel.src}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex flex-col justify-center items-center text-dust/20 bg-ink">
              <span className="font-mono text-sm tracking-widest">{reel.id}</span>
              <span className="font-mono text-[10px] mt-2 opacity-60">ADD REEL HERE</span>
            </div>
          )}
        </div>



        {/* Reel index */}
        <div className="absolute top-4 right-4 z-20 font-mono text-[10px] text-white/50 bg-ink/40 px-2 py-1 rounded-md backdrop-blur-sm">
          {String(index + 1).padStart(2, "0")}/06
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ReelsShowcase() {
  const [activeReel, setActiveReel] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.85", "start 0.2"],
  });
  const headOpacity = useTransform(scrollYProgress, [0, 0.7], [0, 1]);
  const headY = useTransform(scrollYProgress, [0, 0.7], [30, 0]);


  return (
    <section
      ref={sectionRef}
      className="w-full py-28 bg-ink border-y border-film overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6 mb-12">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
          <motion.h2
            style={{ opacity: headOpacity, y: headY }}
            className="font-serif text-[clamp(2.25rem,5vw,3.5rem)] text-ivory"
          >
            In Motion
          </motion.h2>
          <motion.div
            style={{ opacity: headOpacity }}
            className="font-mono text-dust text-xs flex items-center gap-2"
          >
            <span className="w-2 h-2 rounded-full bg-ivory animate-pulse" />
            [REC]
          </motion.div>
        </div>
      </div>

      {/* Horizontal strip — scrollable on mobile, parallax on desktop */}
      <div
        ref={scrollRef}
        className="w-full overflow-x-auto no-scrollbar snap-x snap-mandatory pb-6"
      >
        <div
          className="flex gap-4 w-max px-6 md:px-[max(1.5rem,calc((100vw-72rem)/2))]"
        >
          {reels.map((reel, index) => (
            <ReelCard
              key={reel.id}
              reel={reel}
              index={index}
              onClick={() => {
                if (typeof window !== "undefined" && window.matchMedia("(hover: none)").matches && reel.src) {
                  setActiveReel(reel.src);
                }
              }}
            />
          ))}
        </div>
      </div>

      <p className="font-mono text-dust/30 text-xs text-center mt-4 px-6 tracking-widest">
        {/*  */}
      </p>

      {/* Fullscreen Video Modal */}
      <AnimatePresence>
        {activeReel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm px-4"
          >
            <button
              onClick={() => setActiveReel(null)}
              className="absolute top-6 right-6 md:top-10 md:right-10 p-3 bg-white/10 rounded-full text-white hover:bg-white/20 transition-colors z-[110]"
            >
              <X className="w-6 h-6" />
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-[400px] aspect-[9/16] bg-ink rounded-2xl overflow-hidden shadow-2xl"
            >
              <video
                src={activeReel}
                autoPlay
                controls
                playsInline
                className="w-full h-full object-cover"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
