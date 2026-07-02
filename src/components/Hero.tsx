"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";

/* ─── Single character — lights up as scroll reaches its range ── */
function ScrollChar({
  char,
  scrollYProgress,
  revealStart,
  revealEnd,
}: {
  char: string;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
  revealStart: number;
  revealEnd: number;
}) {
  const opacity = useTransform(
    scrollYProgress,
    [revealStart, revealEnd],
    [0, 1]
  );
  const y = useTransform(scrollYProgress, [revealStart, revealEnd], [12, 0]);

  if (char === " ") {
    return <span>&nbsp;</span>;
  }

  return (
    <motion.span style={{ opacity, y }} className="inline-block will-change-transform">
      {char}
    </motion.span>
  );
}

/* ─── Scroll-driven word reveal ──────────────────────────────── */
function ScrollRevealText({
  text,
  scrollYProgress,
  scrollStart,
  scrollEnd,
  className = "",
}: {
  text: string;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
  scrollStart: number;
  scrollEnd: number;
  className?: string;
}) {
  const chars = text.split("");
  const nonSpaceCount = chars.filter((c) => c !== " ").length;
  let nonSpaceIndex = 0;

  return (
    <span className={`inline-block ${className}`}>
      {chars.map((char, i) => {
        if (char === " ") {
          return <span key={i}>&nbsp;</span>;
        }
        const idx = nonSpaceIndex++;
        const range = scrollEnd - scrollStart;
        const charStart = scrollStart + (idx / nonSpaceCount) * range;
        const charEnd = charStart + range / nonSpaceCount + 0.04;
        return (
          <ScrollChar
            key={i}
            char={char}
            scrollYProgress={scrollYProgress}
            revealStart={charStart}
            revealEnd={Math.min(charEnd, scrollEnd + 0.02)}
          />
        );
      })}
    </span>
  );
}

/* ─── Infinite marquee ───────────────────────────────────────── */
const TICKER = ["Wedding Films", "Pre-Wedding", "Fashion & Editorial", "Cinematography", "Bhopal · All India"];
function Marquee() {
  const items = [...TICKER, ...TICKER, ...TICKER];
  return (
    <div className="w-full overflow-hidden whitespace-nowrap select-none">
      <motion.div
        animate={{ x: [0, "-33.33%"] }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        className="inline-flex gap-12"
      >
        {items.map((item, i) => (
          <span key={i} className="font-mono text-[11px] tracking-[0.22em] uppercase shrink-0 text-white">
            {item}<span className="mx-5 text-white/50">·</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* ─── Hero ────────────────────────────────────────────────────── */
export default function Hero() {
  const [loaded, setLoaded] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);


  // ── Scroll gates ─────────────────────────────────────────────
  // "We Create Memories" — chars light up across scroll 0.04 → 0.48
  // Sub-copy + CTAs appear after heading is fully lit
  const lineH = useTransform(scrollYProgress, [0.04, 0.70], ["0%", "100%"]);
  const subOpacity = useTransform(scrollYProgress, [0.48, 0.64], [0, 1]);
  const subY_raw = useTransform(scrollYProgress, [0.48, 0.64], [20, 0]);
  const subY = useSpring(subY_raw, { stiffness: 80, damping: 22 });
  const ctaOpacity = useTransform(scrollYProgress, [0.56, 0.72], [0, 1]);
  const ctaY_raw = useTransform(scrollYProgress, [0.56, 0.72], [20, 0]);
  const ctaY = useSpring(ctaY_raw, { stiffness: 80, damping: 22 });
  const tickerOp = useTransform(scrollYProgress, [0.10, 0.28], [0, 1]);
  const tagOpacity = useTransform(scrollYProgress, [0.35, 0.52], [0, 1]);
  const heroOp = useTransform(scrollYProgress, [0.86, 1.0], [1, 0]);
  const heroSc = useTransform(scrollYProgress, [0.86, 1.0], [1, 0.96]);


  return (
    <div ref={wrapperRef} style={{ height: "260vh" }}>
      <div className="sticky top-0 h-screen overflow-hidden relative" style={{ backgroundColor: "#000" }}>

        {/* ── Gradient background ───────────────────────────────── */}
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            background: [
              "radial-gradient(ellipse 80% 65% at 18% 12%, rgba(255,255,255,0.10) 0%, transparent 65%)",
              "radial-gradient(ellipse 45% 45% at 82% 65%, rgba(255,255,255,0.04) 0%, transparent 60%)",
              "#000000",
            ].join(", "),
          }}
        />

        {/* Animated rings */}
        {loaded && [350, 700, 1050, 1400].map((size, i) => (
          <motion.div key={size}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: [0, 0.06, 0], scale: [0.7, 1.5] }}
            transition={{ duration: 5.5, delay: i * 1.3, repeat: Infinity, ease: "easeOut" }}
            className="absolute rounded-full border border-white pointer-events-none"
            style={{ width: size, height: size, left: "50%", top: "50%", x: "-50%", y: "-50%" }}
          />
        ))}

        {/* Grid */}
        <div className="absolute inset-0 z-[1] pointer-events-none" style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.018) 1px,transparent 1px)",
          backgroundSize: "72px 72px",
        }} />

        {/* Drawing line */}
        <motion.div
          style={{ height: lineH, background: "rgba(255,255,255,0.15)" }}
          className="absolute left-8 md:left-12 top-0 w-px z-10 origin-top"
        />

        {/* ── Logo image ──────────────────────────────────────────
            Desktop (md+): pinned to the right half, large, full opacity
            Mobile:        centered behind text, blurred + dimmed so text stays readable  */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: loaded ? 1 : 0 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="pointer-events-none select-none"
        >
          {/* Mobile background version — blurred, dimmed */}
          <div
            className="md:hidden absolute inset-0 z-[2] flex items-center justify-center"
            style={{ filter: "blur(3px)", opacity: 0.20 }}
          >
            <Image
              src="/logo.png"
              alt=""
              width={500}
              height={500}
              className="w-[90vw] h-auto object-contain brightness-0 invert"
              aria-hidden
            />
          </div>

          {/* Desktop right-side version — sharp, prominent */}
          <div
            className="hidden md:flex absolute right-0 top-0 h-full w-1/2 z-[2] items-center justify-center pr-12 lg:pr-20"
            style={{ opacity: 0.88 }}
          >
            <Image
              src="/logo.png"
              alt="The Foto Company logo"
              width={520}
              height={520}
              className="w-[42vw] max-w-[480px] h-auto object-contain brightness-0 invert drop-shadow-2xl"
              priority
            />
          </div>
        </motion.div>

        {/* ── Foreground ────────────────────────────────────────── */}
        <motion.div
          style={{ opacity: heroOp, scale: heroSc }}
          className="relative z-10 h-full flex flex-col justify-between py-10 px-6 md:px-14 will-change-transform md:w-1/2"
        >
          {/* Top row */}
          <div className="flex items-start justify-end">
            <motion.span
              initial={{ opacity: 0 }} animate={{ opacity: loaded ? 1 : 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="font-mono text-[10px] tracking-widest hidden sm:block"
              style={{ color: "rgba(255,255,255,0.18)" }}
            >
              
            </motion.span>
          </div>

          {/* ── HEADING — each letter lights up on scroll ─────────── */}
          <div className="-mt-8">
            {/* Ghost prompt before scrolling starts */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: loaded ? 1 : 0 }}
              transition={{ delay: 0.8, duration: 1 }}
            >
              <div
                className="font-serif font-normal leading-[0.88]"
                style={{ fontSize: "clamp(3.8rem, 12vw, 10.5rem)" }}
              >
                {/* Line 1: "We Create" */}
                <div>
                  <ScrollRevealText
                    text="We Create"
                    scrollYProgress={scrollYProgress}
                    scrollStart={0.04}
                    scrollEnd={0.30}
                    className="text-white"
                  />
                </div>

                {/* Line 2: "Memories." — staggered after line 1 */}
                <div className="flex items-baseline gap-4">
                  <span
                    className="font-mono text-xs tracking-widest self-end pb-2 hidden md:inline-block"
                    style={{ color: "rgba(255,255,255,0.12)" }}
                  >
                    ——
                  </span>
                  <ScrollRevealText
                    text="Memories."
                    scrollYProgress={scrollYProgress}
                    scrollStart={0.22}
                    scrollEnd={0.48}
                    className="italic text-white"
                  />
                </div>
              </div>
            </motion.div>

            {/* Sub-copy */}
            <motion.p
              style={{ opacity: subOpacity, y: subY, color: "rgba(255,255,255,0.45)" }}
              className="font-sans text-sm md:text-base max-w-md leading-relaxed mt-7 will-change-transform"
            >
              Wedding films, pre-wedding shoots, fashion &amp; cinematography —{" "}
               <span style={{ color: "rgba(255,255,255,0.85)" }} className="font-medium"></span> Bhopal, India.
            </motion.p>

            {/* CTAs */}
            <motion.div
              style={{ opacity: ctaOpacity, y: ctaY }}
              className="flex flex-wrap gap-4 mt-8 will-change-transform"
            >
              <a
                href="https://wa.me/917000458607"
                target="_blank" rel="noopener noreferrer"
                className="px-7 py-3.5 font-sans font-semibold text-sm rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white"
                style={{ backgroundColor: "#ffffff", color: "#000000" }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#e5e5e5")}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#ffffff")}
              >
                Book a Shoot →
              </a>
              <a
                href="#portfolio"
                className="px-7 py-3.5 font-sans text-sm rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white"
                style={{ border: "1px solid rgba(255,255,255,0.22)", color: "rgba(255,255,255,0.65)" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.7)"; e.currentTarget.style.color = "#fff"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.22)"; e.currentTarget.style.color = "rgba(255,255,255,0.65)"; }}
              >
                View the Work
              </a>
            </motion.div>
          </div>

          {/* Bottom row */}
          <div className="flex items-end justify-between gap-8">
            <motion.div style={{ opacity: tickerOp }} className="flex-1 min-w-0">
              <Marquee />
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: loaded ? 1 : 0 }}
              transition={{ delay: 2.0, duration: 1 }}
              className="flex flex-col items-center gap-2 shrink-0"
            >
              <motion.div
                animate={{ scaleY: [1, 0.2, 1] }}
                transition={{ repeat: Infinity, duration: 1.9, ease: "easeInOut" }}
                className="w-px h-10 origin-top"
                style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0.3), transparent)" }}
              />
              <span className="font-mono text-[9px] tracking-[0.22em] uppercase"
                style={{ color: "rgba(255,255,255,0.2)" }}>scroll</span>
            </motion.div>
          </div>
        </motion.div>

        {/* Right edge tag */}
        <motion.div style={{ opacity: tagOpacity }}
          className="absolute right-6 top-1/2 -translate-y-1/2 z-20 hidden lg:flex flex-col items-center gap-4">
          <div className="w-px h-14" style={{ background: "rgba(255,255,255,0.1)" }} />
          <span className="font-mono text-[9px] tracking-[0.2em] uppercase"
            style={{ writingMode: "vertical-rl", color: "rgba(255,255,255,0.18)" }}>
            @thefotocompany · 91K
          </span>
          <div className="w-px h-14" style={{ background: "rgba(255,255,255,0.1)" }} />
        </motion.div>

      </div>
    </div>
  );
}
