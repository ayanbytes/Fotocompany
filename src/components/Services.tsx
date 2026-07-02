"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const services = [
  {
    title: "Wedding Films",
    label: "35mm",
    description:
      "Cinematic storytelling that captures raw emotion and beauty across every frame of your wedding day.",
  },
  {
    title: "Pre-Wedding",
    label: "50mm",
    description:
      "Stylised, intimate shoots designed to showcase your unique connection before the big day.",
  },
  {
    title: "Fashion & Editorial",
    label: "85mm",
    description:
      "High-impact visual narratives for brands, models, and designers — made to stop the scroll.",
  },
  {
    title: "Cinematography",
    label: "24fps",
    description:
      "Professional-grade film production for campaigns, reels, and brand stories.",
  },
];

function ServiceCard({
  service,
  index,
}: {
  service: (typeof services)[0];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 14;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -14;
    cardRef.current.style.transform = `perspective(900px) rotateY(${x}deg) rotateX(${y}deg) translateZ(6px)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current)
      cardRef.current!.style.transform =
        "perspective(900px) rotateY(0deg) rotateX(0deg) translateZ(0px)";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.65, delay: index * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="bg-film p-8 border border-dust/10 relative group cursor-crosshair
                 transition-all duration-300 ease-out hover:border-ivory/30 hover:shadow-2xl
                 will-change-transform flex flex-col"
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Number */}
      <div className="absolute top-6 right-6 font-mono text-dust/20 text-5xl font-bold select-none z-0">
        0{index + 1}
      </div>

      {/* Make this inner container flex-grow so it actually fills the card's height */}
      <div className="relative z-10 flex flex-col flex-grow">
        <div className="font-mono text-dust text-[11px] tracking-[0.2em] mb-8 inline-flex items-center gap-2">
          <span className="w-1 h-1 rounded-full bg-dust inline-block" />
          {service.label}
        </div>

        {/* Title flex-grow pushes the divider and description to the bottom */}
        <h3 className="font-serif text-[clamp(1rem,1.5vw,1.35rem)] text-ivory mb-6 leading-tight flex-grow break-all sm:break-words">
          {service.title}
        </h3>

        {/* Divider that grows on hover */}
        <div className="w-8 h-px bg-dust/30 mb-4 group-hover:w-full transition-all duration-700 ease-out" />

        <p className="font-sans text-dust text-sm leading-relaxed">{service.description}</p>
      </div>
    </motion.div>
  );
}

export default function Services() {
  const headingRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: headingRef,
    offset: ["start 0.85", "end 0.5"],
  });
  const headX = useTransform(scrollYProgress, [0, 1], [-40, 0]);
  const headOpacity = useTransform(scrollYProgress, [0, 0.6], [0, 1]);

  return (
    <section id="services" className="w-full py-28 bg-ink overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        {/* Heading row */}
        <div ref={headingRef} className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-16 gap-4">
          <motion.h2
            style={{ x: headX, opacity: headOpacity }}
            className="font-serif text-[clamp(2.25rem,5vw,3.5rem)] text-ivory leading-tight"
          >
            Our<br className="sm:hidden" /> Expertise
          </motion.h2>
          <motion.span
            style={{ opacity: headOpacity }}
            className="font-mono text-dust text-xs tracking-widest"
          >
          
          </motion.span>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((s, i) => (
            <ServiceCard key={s.title} service={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
