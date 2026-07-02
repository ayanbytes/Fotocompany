"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function CTABand() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.85", "start 0.2"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.92, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const headY = useTransform(scrollYProgress, [0, 0.8], [40, 0]);

  return (
    <section ref={sectionRef} className="w-full py-36 bg-ivory relative overflow-hidden">
      {/* Animated grid lines */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,.05) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <motion.div
        style={{ scale, opacity }}
        className="max-w-4xl mx-auto px-6 text-center relative z-10"
      >
        <motion.div
          style={{ y: headY }}
          className="font-mono text-dust text-xs tracking-[0.2em] mb-8 uppercase"
        >
          [Bhopal · All India · Destination]
        </motion.div>

        <motion.h2
          style={{ y: headY }}
          className="font-serif text-[clamp(2.5rem,7vw,5rem)] text-ink leading-tight mb-8"
        >
          Ready to Frame<br />
          <span className="italic">Your Story?</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="font-sans text-ink/60 text-base md:text-lg mb-14 max-w-xl mx-auto leading-relaxed"
        >
          Let's create something timeless. WhatsApp directly to discuss your wedding, pre-wedding, or brand project.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <a
            href="https://wa.me/917000458607"
            target="_blank"
            rel="noopener noreferrer"
            className="px-10 py-5 bg-ink text-ivory font-sans font-semibold text-sm rounded-full
                       hover:bg-dust hover:text-ink transition-all duration-300 shadow-xl
                       w-full sm:w-auto text-center
                       focus:outline-none focus:ring-2 focus:ring-ink focus:ring-offset-2 focus:ring-offset-ivory"
          >
            Chat on WhatsApp →
          </a>
          <a
            href="https://instagram.com/thefotocompany"
            target="_blank"
            rel="noopener noreferrer"
            className="px-10 py-5 border border-ink/20 text-ink font-sans font-semibold text-sm rounded-full
                       hover:bg-ink/5 transition-all duration-300 w-full sm:w-auto text-center
                       focus:outline-none focus:ring-2 focus:ring-ink focus:ring-offset-2 focus:ring-offset-ivory"
          >
            @thefotocompany
          </a>
        </motion.div>

        <p className="font-mono text-ink/30 text-xs mt-12 tracking-widest">
          +91 70004 58607 · instagram.com/thefotocompany · ~91K followers
        </p>
      </motion.div>
    </section>
  );
}
