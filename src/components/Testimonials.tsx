"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    quote:
      "The level of professionalism and punctuality was unmatched. They captured the most candid moments without ever feeling intrusive. A masterpiece.",
    author: "Priya & Rahul",
    role: "Bride & Groom",
    event: "Wedding",
    fStop: "f/1.4",
    initials: "PR",
  },
  {
    quote:
      "Working with Saad and his team was a breeze. The final cinematic edit exceeded all our expectations. True artists in every sense.",
    author: "Ananya S.",
    role: "Client",
    event: "Pre-Wedding",
    fStop: "f/2.8",
    initials: "AS",
  },
  {
    quote:
      "Their eye for detail and ability to direct the shoot made our editorial campaign stand out. Highly recommended for any brand work.",
    author: "Label Studio",
    role: "Fashion Brand",
    event: "Campaign",
    fStop: "f/4.0",
    initials: "LS",
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.85", "start 0.2"],
  });
  const headOpacity = useTransform(scrollYProgress, [0, 0.6], [0, 1]);
  const headY = useTransform(scrollYProgress, [0, 0.6], [30, 0]);

  return (
    <section ref={sectionRef} className="w-full py-32 bg-ink overflow-hidden relative">
      {/* Background ambient light */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[400px] bg-ivory/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          style={{ opacity: headOpacity, y: headY }}
          className="text-center mb-24"
        >
          <span className="font-mono text-dust/60 text-xs tracking-[0.2em] uppercase mb-4 block">Client Stories</span>
          <h2 className="font-serif text-[clamp(2.5rem,5vw,4rem)] text-ivory leading-tight">
            Words from the Frame
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.8,
                delay: index * 0.2,
                ease: [0.21, 0.47, 0.32, 0.98],
              }}
              className="group relative bg-film p-10 border border-dust/10 hover:border-ivory/20 transition-all duration-700 ease-out flex flex-col justify-between"
            >
              {/* Subtle gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-ivory/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

              <div>
                <div className="flex items-center gap-1 mb-8">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-ivory/80 text-ivory/80" />
                  ))}
                </div>

                <p className="font-serif text-ivory/90 text-lg sm:text-xl leading-relaxed mb-10 relative z-10">
                  <span className="absolute -top-4 -left-4 text-5xl text-dust/20 font-serif leading-none select-none">"</span>
                  {item.quote}
                  <span className="absolute -bottom-4 -right-2 text-5xl text-dust/20 font-serif leading-none select-none">"</span>
                </p>
              </div>

              <div className="flex items-center justify-between mt-auto pt-8 border-t border-dust/10 group-hover:border-dust/30 transition-colors duration-500">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-ink border border-dust/20 flex items-center justify-center font-serif text-ivory group-hover:scale-110 group-hover:border-ivory/40 transition-all duration-500 shrink-0">
                    {item.initials}
                  </div>
                  <div>
                    <h4 className="font-sans font-semibold text-ivory text-sm tracking-wide">{item.author}</h4>
                    <span className="font-mono text-[10px] text-dust/60 uppercase tracking-widest block mt-1">
                      {item.role}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1 shrink-0">
                  <div className="font-mono text-[10px] text-dust/40 bg-ink px-2 py-1 rounded border border-dust/10">
                    {item.fStop}
                  </div>
                  <span className="font-mono text-[9px] text-dust/30 uppercase tracking-widest mt-1">
                    {item.event}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
