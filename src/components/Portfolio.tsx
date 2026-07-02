"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

const placeholders = [
  { id: "FRAME_001", col: "col-span-2", row: "row-span-2", src: "/portfolio/frame-1.png" },
  { id: "FRAME_002", col: "col-span-1", row: "row-span-1", src: "/portfolio/frame-2.png" },
  { id: "FRAME_003", col: "col-span-1", row: "row-span-1", src: "/portfolio/frame-3.png" },
  { id: "FRAME_004", col: "col-span-1", row: "row-span-1", src: "/portfolio/frame-4.png" },
  { id: "FRAME_005", col: "col-span-1", row: "row-span-1", src: "/portfolio/frame-5.png" },
  { id: "FRAME_006", col: "col-span-2", row: "row-span-1", src: "/portfolio/frame-6.png" },
  { id: "FRAME_007", col: "col-span-1", row: "row-span-1", src: "/portfolio/frame-7.png" },
  { id: "FRAME_008", col: "col-span-1", row: "row-span-1", src: "/portfolio/frame-8.jpg" },
];

export default function Portfolio() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.9", "start 0.3"],
  });
  const headX = useTransform(scrollYProgress, [0, 1], [60, 0]);
  const headOpacity = useTransform(scrollYProgress, [0, 0.6], [0, 1]);

  return (
    <section id="portfolio" ref={sectionRef} className="w-full py-28 bg-film overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        {/* Heading */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-16 gap-4">
          <motion.h2
            style={{ x: headX, opacity: headOpacity }}
            className="font-serif text-[clamp(2.25rem,5vw,3.5rem)] text-ivory leading-tight"
          >
            Contact Sheet
          </motion.h2>
          <motion.span
            style={{ opacity: headOpacity }}
            className="font-mono text-dust text-xs tracking-widest"
          >
          </motion.span>
        </div>

        {/* Contact sheet grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[200px] md:auto-rows-[280px] lg:auto-rows-[340px] gap-3 md:gap-4">
          {placeholders.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.93 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.6,
                delay: index * 0.07,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className={`${item.col} ${item.row} bg-ink border border-dust/10 relative group overflow-hidden`}
            >
              {/* Background / Image Layer */}
              <div className="absolute inset-0 z-0">
                {item.src ? (
                  <Image
                    src={item.src}
                    alt={item.id}
                    fill
                    className="object-cover object-center grayscale hover:grayscale-0 transition-all duration-700 opacity-80 hover:opacity-100"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col justify-center items-center text-dust/30 group-hover:text-ivory/50 transition-colors duration-500">
                    <span className="font-mono text-xs tracking-[0.2em]">{item.id}</span>
                  </div>
                )}
              </div>

              {/* Film sprocket holes (Overlay) */}
              <div className="absolute top-2 left-0 w-full flex justify-around px-2 pointer-events-none z-10">
                {Array.from({ length: item.col.includes('2') ? 8 : 4 }).map((_, i) => (
                  <div key={i} className="w-[6px] h-[6px] md:w-2 md:h-2 rounded-sm border border-dust/20 bg-ink/50" />
                ))}
              </div>

              {/* Hover overlay (subtle vignette/tint) */}
              <div className="absolute inset-0 bg-ink/10 group-hover:bg-transparent pointer-events-none transition-colors duration-500 z-10" />

              {/* Bottom label (Overlay) */}
              <div className="absolute bottom-2 right-2 font-mono text-[9px] text-ivory/40 tracking-widest z-10 bg-ink/60 px-2 py-1 rounded-sm backdrop-blur-sm">

              </div>
            </motion.div>
          ))}
        </div>

        <p className="font-mono text-dust/40 text-xs text-center mt-8 tracking-widest">
        </p>
      </div>
    </section>
  );
}
