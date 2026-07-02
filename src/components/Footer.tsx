"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full bg-ink pt-24 pb-10 border-t border-film overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">
          {/* Brand column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-5"
          >
            <div className="mb-6">
              <Image
                src="/logo.png"
                alt="The Foto Company"
                width={200}
                height={100}
                className="h-20 w-auto object-contain brightness-0"
              />
            </div>
            <p className="font-sans text-black text-sm leading-relaxed mb-6 max-w-xs">
              Capturing life's most precious moments with cinematic elegance. Based in Bhopal, India — available all India and for destination shoots.
            </p>
            <div className="font-mono text-black text-xs tracking-widest">
              EST. 2017 · @thefotocompany
            </div>
          </motion.div>

          {/* Nav */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="md:col-span-3"
          >
            <h4 className="font-mono text-black font-semibold text-[11px] tracking-[0.2em] uppercase mb-6">
              Navigate
            </h4>
            <ul className="space-y-4 font-sans text-black text-sm">
              <li>
                <a href="#services" className="hover:text-ivory transition-colors duration-200">
                  Services
                </a>
              </li>
              <li>
                <a href="#portfolio" className="hover:text-ivory transition-colors duration-200">
                  Portfolio
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/thefotocompany"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-ivory transition-colors duration-200"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:col-span-4"
          >
            <h4 className="font-mono text-black font-semibold text-[11px] tracking-[0.2em] uppercase mb-6">
              Contact
            </h4>
            <ul className="space-y-4 font-sans text-black text-sm">
              <li>Bhopal, Madhya Pradesh, India</li>
              <li>+91 70004 58607</li>
              <li>
                <a
                  href="https://wa.me/917000458607"
                  className="text-ivory hover:text-dust transition-colors duration-200"
                >
                  Book via WhatsApp →
                </a>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-film font-mono text-[11px] text-black gap-4">
          <p>&copy; {new Date().getFullYear()} The Foto Company. All rights reserved.</p>
          <div className="tracking-widest">· WE CREATE MEMORIES</div>
        </div>
      </div>
    </footer>
  );
}
