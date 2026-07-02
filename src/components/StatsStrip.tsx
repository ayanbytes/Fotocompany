"use client";

import { motion } from "framer-motion";

const stats = [
  { label: "ISO", value: "91K", description: "Followers" },
  { label: "1/250s", value: "10 Yrs", description: "Experience" },
  { label: "M-Mode", value: "All India", description: "+ Destination" },
];

function StatItem({
  stat,
  index,
}: {
  stat: (typeof stats)[0];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.12,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className="flex flex-col items-center text-center group"
    >
      <span className="font-mono text-dust text-[11px] mb-3 tracking-[0.2em] uppercase opacity-60 group-hover:opacity-100 transition-opacity duration-300">
        [{stat.label}]
      </span>
      <span className="font-serif text-[clamp(1.75rem,4vw,2.5rem)] text-ivory font-normal mb-1">
        {stat.value}
      </span>
      <span className="font-sans text-dust text-xs tracking-widest uppercase">
        {stat.description}
      </span>
    </motion.div>
  );
}

export default function StatsStrip() {
  return (
    <section className="w-full py-14 bg-film border-y border-dust/10 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-around gap-10 text-center">
          {stats.map((stat, index) => (
            <StatItem key={stat.label} stat={stat} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
