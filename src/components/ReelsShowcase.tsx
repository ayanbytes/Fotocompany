"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Play } from "lucide-react";

const reels = [
  { id: "REEL_001", views: "1.2M", src: "/reels/reel-1.mp4" },
  { id: "REEL_002", views: "850K", src: "/reels/reel-2.mp4" },
  { id: "REEL_003", views: "420K", src: "/reels/reel-3.mp4" },
  { id: "REEL_004", views: "310K", src: "/reels/reel-4.mp4" },
  { id: "REEL_005", views: "290K", src: "/reels/reel-5.mp4" },
  { id: "REEL_006", views: "150K", src: "/reels/reel-6.mp4" },
];

function ReelCard({ reel, index }: { reel: { id: string, views: string, src?: string }; index: number }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleInteractionStart = () => {
    if (videoRef.current) {
      videoRef.current.muted = false;
    }
  };

  const handleInteractionEnd = () => {
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
        onMouseEnter={handleInteractionStart}
        onMouseLeave={handleInteractionEnd}
        onTouchStart={handleInteractionStart}
        onTouchEnd={handleInteractionEnd}
        onTouchCancel={handleInteractionEnd}
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

      {/* View count */}
      <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2
                      bg-ink/70 backdrop-blur px-3 py-1.5 rounded-full border border-white/5">
        <Play className="text-ivory/70 w-3 h-3" />
        <span className="font-mono text-[11px] text-ivory/70">{reel.views} Views</span>
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
  const sectionRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.85", "start 0.2"],
  });
  const headOpacity = useTransform(scrollYProgress, [0, 0.7], [0, 1]);
  const headY = useTransform(scrollYProgress, [0, 0.7], [30, 0]);

  // Horizontal auto-scroll driven by page scroll (desktop feel)
  const { scrollYProgress: hScrollProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const x = useTransform(hScrollProgress, [0, 1], ["0%", "-20%"]);

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
        <motion.div
          style={{ x }}
          className="flex gap-4 w-max px-6 md:px-[max(1.5rem,calc((100vw-72rem)/2))]"
        >
          {reels.map((reel, index) => (
            <ReelCard key={reel.id} reel={reel} index={index} />
          ))}
        </motion.div>
      </div>

      <p className="font-mono text-dust/30 text-xs text-center mt-4 px-6 tracking-widest">
        {/*  */}
      </p>
    </section>
  );
}
