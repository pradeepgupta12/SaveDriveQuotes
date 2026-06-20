"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function CTASection({ data, site }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative bg-[var(--navy)] py-[5.5rem] overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_60%,rgba(13,148,136,0.22)_0%,transparent_68%)] pointer-events-none" />
      <div className="w-full max-w-[80rem] mx-auto px-6 max-[768px]:px-4">
        <div className="relative z-[1] flex flex-col items-center text-center">
          <motion.div
            className="inline-flex items-center gap-2 bg-[rgba(13,148,136,0.18)] border border-[rgba(13,148,136,0.36)] text-[#5EEAD4] text-[0.78rem] font-semibold py-[0.38rem] px-4 rounded-full mb-6"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <span className="w-[6px] h-[6px] bg-[#5EEAD4] rounded-full animate-[pulse-dot_2s_infinite]" />
            {data.badge}
          </motion.div>

          <motion.h2
            className="text-[clamp(2rem,5vw,3.2rem)] font-black text-white leading-[1.12] tracking-[-0.03em] mb-4"
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.1 }}
          >
            {data.heading1}
            <br />
            <span className="text-[#2DD4BF]">{data.heading2}</span>
          </motion.h2>

          <motion.p
            className="text-[1rem] text-white/[0.62] max-w-[460px] leading-[1.7] mb-10"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {data.subtext}
          </motion.p>

          <motion.div
            className="flex items-center gap-4 flex-wrap justify-center mb-[1.4rem] max-[480px]:flex-col max-[480px]:w-full"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.28 }}
          >
            <a href="#hero-form" className="inline-flex items-center justify-center gap-2 bg-[var(--orange)] text-white font-bold text-[1.02rem] py-[0.95rem] px-[2.25rem] rounded-full tracking-[0.01em] shadow-[0_4px_18px_rgba(249,115,22,0.38)] no-underline [transition:background_0.2s_ease,transform_0.15s_ease,box-shadow_0.2s_ease] hover:bg-[var(--orange-dark)] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(249,115,22,0.45)] active:translate-y-0 max-[480px]:w-full">
              {data.btnPrimary}
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor"
                  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a href={`tel:${site.phone}`} className="inline-flex items-center justify-center gap-2 bg-transparent text-white font-semibold text-[1rem] py-[0.9rem] px-8 rounded-full border-2 border-white/40 cursor-pointer no-underline [transition:border-color_0.2s_ease,background_0.2s_ease] hover:border-white hover:bg-white/[0.08] max-[480px]:w-full">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.64A2 2 0 012 .82h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"
                  stroke="white" strokeWidth="2" strokeLinecap="round" />
              </svg>
              {site.phone}
            </a>
          </motion.div>

          <motion.div
            className="flex items-center gap-6 flex-wrap justify-center max-[480px]:gap-[0.8rem]"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.38 }}
          >
            {data.trust.map((t, i) => (
              <span key={i} className="flex items-center gap-[0.35rem] text-[0.8rem] text-white/[0.55] font-medium">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                  <path d="M20 6L9 17l-5-5" stroke="#2DD4BF"
                    strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {t}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
