"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

function DocIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"
        stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points="14,2 14,8 20,8" stroke="white" strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round" />
      <line x1="16" y1="13" x2="8" y2="13" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <line x1="16" y1="17" x2="8" y2="17" stroke="white" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
function ChartIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
      <line x1="18" y1="20" x2="18" y2="10" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="12" y1="20" x2="12" y2="4" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="6" y1="20" x2="6" y2="14" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}
function BadgeIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="8" r="6" stroke="white" strokeWidth="2" />
      <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"
        stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const iconMap = { doc: DocIcon, chart: ChartIcon, badge: BadgeIcon };

export default function HowItWorks({ data }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-20 bg-white" id="how-it-works" ref={ref}>
      <div className="w-full max-w-[80rem] mx-auto px-6 max-[768px]:px-4">
        <motion.p
          className="block text-center text-[0.72rem] font-bold tracking-[0.1em] uppercase text-[var(--teal)] mb-2"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          {data.badge}
        </motion.p>
        <motion.h2
          className="text-center text-[clamp(1.6rem,3.5vw,2.1rem)] font-extrabold text-[var(--gray-900)] tracking-[-0.02em] mb-2"
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {data.heading}
        </motion.h2>
        <motion.p
          className="text-center text-[var(--gray-500)] text-[0.95rem] mb-14"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.18 }}
        >
          {data.subheading}
        </motion.p>

        <div className="grid grid-cols-3 gap-8 relative max-[720px]:grid-cols-1 max-[720px]:gap-10">
          {data.steps.map((step, i) => {
            const Icon = iconMap[step.icon];
            return (
              <motion.div
                key={i}
                className="flex flex-col items-center text-center relative max-[720px]:max-w-[320px] max-[720px]:mx-auto"
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.14 }}
              >
                {/* Connector line */}
                {i < data.steps.length - 1 && (
                  <motion.div
                    className="absolute top-[38px] left-[calc(50%+48px)] w-[calc(100%-28px)] h-[2px] bg-[linear-gradient(to_right,var(--teal),rgba(13,148,136,0.15))] origin-left z-0 max-[720px]:hidden"
                    initial={{ scaleX: 0 }}
                    animate={inView ? { scaleX: 1 } : {}}
                    transition={{ duration: 0.7, delay: 0.5 + i * 0.15 }}
                  />
                )}
                <div className="relative mb-[1.2rem] z-[1]">
                  <span className="absolute top-[-8px] right-[-8px] w-[22px] h-[22px] bg-[var(--orange)] text-white rounded-full text-[0.72rem] font-extrabold flex items-center justify-center z-[2]">{step.num}</span>
                  <motion.div
                    className="w-[78px] h-[78px] bg-[var(--teal)] rounded-[20px] flex items-center justify-center shadow-[0_8px_28px_rgba(13,148,136,0.3)]"
                    animate={inView ? { y: [0, -7, 0] } : {}}
                    transition={{
                      duration: 3,
                      delay: 0.8 + i * 0.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <Icon />
                  </motion.div>
                </div>
                <h3 className="text-[1.05rem] font-bold text-[var(--gray-900)] mb-[0.45rem]">{step.title}</h3>
                <p className="text-[0.86rem] text-[var(--teal-dark)] leading-[1.65] max-w-[200px]">{step.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
