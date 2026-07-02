"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import Image from "next/image";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Reels", href: "#reels" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("Home");
  const { scrollY } = useScroll();

  // Switch navbar background once user scrolls past hero
  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 60);
  });

  // Track active section on scroll
  useEffect(() => {
    const sections = NAV_LINKS.map(({ href }) => href.slice(1));
    const observers: IntersectionObserver[] = [];

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(NAV_LINKS.find(l => l.href === `#${id}`)?.label ?? ""); },
        { rootMargin: "-40% 0px -55% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // Close menu on resize to desktop
  useEffect(() => {
    const handler = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  const handleLink = (href: string) => {
    setMenuOpen(false);
    const el = document.getElementById(href.slice(1));
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* ── Fixed top bar ──────────────────────────────────────── */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-[100]"
        animate={{
          backgroundColor: scrolled ? "rgba(0,0,0,0.85)" : "rgba(0,0,0,0)",
          backdropFilter: scrolled ? "blur(16px)" : "blur(0px)",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.07)" : "1px solid rgba(255,255,255,0)",
        }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between h-16 md:h-18">

          {/* Logo / Brand */}
          <a
            href="#home"
            onClick={(e) => { e.preventDefault(); handleLink("#home"); }}
            className="flex items-center gap-3 group focus:outline-none"
          >
            <div className="flex items-center">
              <Image
                src="/logo.png"
                alt="The Foto Company"
                width={120}
                height={60}
                className="h-8 w-auto object-contain invert opacity-90 group-hover:opacity-100 transition-opacity duration-300"
              />
            </div>
            <span className="font-[family-name:var(--font-cinzel)] text-white text-xl leading-none tracking-[0.15em] uppercase drop-shadow-sm">
              THE FOTO COMPANY
            </span>
          </a>

          {/* Desktop links */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                onClick={(e) => { e.preventDefault(); handleLink(href); }}
                className="relative font-sans text-sm tracking-wide transition-colors duration-200 focus:outline-none focus:underline"
                style={{
                  color: active === label ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.45)",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.9)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = active === label ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.45)")}
              >
                {label}
                {/* Active underline */}
                {active === label && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-1 left-0 right-0 h-px bg-white"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            ))}

            <a
              href="https://wa.me/917000458607"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-4 px-5 py-2.5 font-sans font-semibold text-sm rounded-full
                         bg-white text-black hover:bg-gray-200 transition-all duration-300
                         focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
            >
              Book Now
            </a>
          </nav>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-[6px] focus:outline-none focus:ring-2 focus:ring-white rounded"
          >
            <motion.span
              animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 8 : 0 }}
              className="block w-6 h-px bg-white origin-center"
              transition={{ duration: 0.3 }}
            />
            <motion.span
              animate={{ opacity: menuOpen ? 0 : 1, scaleX: menuOpen ? 0 : 1 }}
              className="block w-6 h-px bg-white"
              transition={{ duration: 0.2 }}
            />
            <motion.span
              animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -8 : 0 }}
              className="block w-6 h-px bg-white origin-center"
              transition={{ duration: 0.3 }}
            />
          </button>

        </div>
      </motion.header>

      {/* ── Mobile slide-down menu ─────────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="fixed inset-0 z-[99] flex flex-col pt-20 px-6 pb-10 md:hidden"
            style={{ backgroundColor: "rgba(0,0,0,0.97)", backdropFilter: "blur(20px)" }}
          >
            <nav className="flex flex-col gap-1 flex-1" aria-label="Mobile navigation">
              {NAV_LINKS.map(({ label, href }, i) => (
                <motion.a
                  key={label}
                  href={href}
                  onClick={(e) => { e.preventDefault(); handleLink(href); }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-center justify-between py-5 border-b font-serif text-2xl focus:outline-none"
                  style={{
                    borderColor: "rgba(255,255,255,0.08)",
                    color: active === label ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.45)",
                  }}
                >
                  <span>{label}</span>
                  <span className="font-mono text-[10px] tracking-widest"
                    style={{ color: "rgba(255,255,255,0.2)" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </motion.a>
              ))}
            </nav>

            {/* Mobile CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.4 }}
              className="pt-8 flex flex-col gap-4"
            >
              <a
                href="https://wa.me/917000458607"
                target="_blank" rel="noopener noreferrer"
                className="w-full py-4 text-center bg-white text-black font-sans font-semibold rounded-full
                           hover:bg-gray-200 transition-colors duration-200 focus:outline-none"
              >
                Book a Shoot →
              </a>
              <a
                href="https://instagram.com/thefotocompany"
                target="_blank" rel="noopener noreferrer"
                className="w-full py-4 text-center font-sans text-sm rounded-full focus:outline-none"
                style={{ border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.5)" }}
              >
                @thefotocompany
              </a>
            </motion.div>

            {/* Studio info at bottom */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55 }}
              className="pt-6 font-mono text-[10px] tracking-widest"
              style={{ color: "rgba(255,255,255,0.2)" }}
            >
              BHOPAL · ALL INDIA · DESTINATION · EST. 2017
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
