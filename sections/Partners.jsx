// "use client";
// import { useRef } from "react";
// import { motion, useInView } from "framer-motion";

// export default function Partners({ data }) {
//   const ref = useRef(null);
//   const inView = useInView(ref, { once: true, margin: "-80px" });

//   return (
//     <section className="py-[4.5rem] bg-[#EFF6F6]" ref={ref}>
//       <div className="w-full max-w-[80rem] mx-auto px-6 max-[768px]:px-4">
//         <motion.p
//           className="block text-center text-[0.72rem] font-bold tracking-[0.1em] uppercase text-[var(--teal)] mb-2"
//           initial={{ opacity: 0 }}
//           animate={inView ? { opacity: 1 } : {}}
//           transition={{ duration: 0.5 }}
//         >
//           {data.badge}
//         </motion.p>

//         <motion.h2
//           className="text-center text-[clamp(1.4rem,3vw,1.9rem)] font-extrabold text-[var(--gray-900)] tracking-[-0.02em] mb-10"
//           initial={{ opacity: 0, y: 18 }}
//           animate={inView ? { opacity: 1, y: 0 } : {}}
//           transition={{ duration: 0.5, delay: 0.1 }}
//         >
//           {data.heading}
//         </motion.h2>

//         <div className="grid grid-cols-[repeat(auto-fill,minmax(118px,1fr))] gap-4 max-[500px]:grid-cols-4 max-[500px]:gap-[0.65rem] max-[360px]:grid-cols-3">
//           {data.list.map((p, i) => (
//             <motion.div
//               key={i}
//               className="bg-white rounded-[12px] py-[1.2rem] px-[0.75rem] flex flex-col items-center gap-[0.6rem] shadow-[var(--shadow-sm)] cursor-default [transition:transform_0.2s,box-shadow_0.2s]"
//               initial={{ opacity: 0, y: 20 }}
//               animate={inView ? { opacity: 1, y: 0 } : {}}
//               transition={{ duration: 0.4, delay: 0.1 + i * 0.07 }}
//               whileHover={{ y: -4, boxShadow: "0 10px 28px rgba(0,0,0,0.1)" }}
//             >
//               <div className="w-[42px] h-[42px] rounded-[10px] text-white font-extrabold text-[1rem] flex items-center justify-center" style={{ background: p.color }}>
//                 {p.initial}
//               </div>
//               <span className="text-[0.78rem] font-semibold text-[var(--gray-700)] text-center leading-[1.3]">{p.name}</span>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }


"use client";
import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

export default function Partners({ data }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [itemsPerView, setItemsPerView] = useState(5);

  // Update items per view based on screen size
  useEffect(() => {
    const updateItemsPerView = () => {
      const width = window.innerWidth;
      if (width < 480) {
        setItemsPerView(3); // Mobile: 3 cards
      } else if (width < 768) {
        setItemsPerView(4); // Tablet: 4 cards
      } else {
        setItemsPerView(5); // Desktop: 5 cards
      }
    };

    updateItemsPerView();
    window.addEventListener('resize', updateItemsPerView);
    return () => window.removeEventListener('resize', updateItemsPerView);
  }, []);

  const totalItems = data.list.length;
  const totalSlides = totalItems;

  useEffect(() => {
    if (isHovered || totalItems === 0) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalSlides);
    }, 3000);

    return () => clearInterval(interval);
  }, [isHovered, totalItems, totalSlides]);

  // Get visible cards starting from current index
  const getVisibleCards = () => {
    const cards = [];
    for (let i = 0; i < itemsPerView; i++) {
      const index = (currentIndex + i) % totalItems;
      cards.push({
        ...data.list[index],
        uniqueKey: `${data.list[index].name}-${currentIndex}-${i}`
      });
    }
    return cards;
  };

  return (
    <section className="py-[4.5rem] bg-[#EFF6F6] overflow-hidden" ref={ref}>
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
          className="text-center text-[clamp(1.4rem,3vw,1.9rem)] font-extrabold text-[var(--gray-900)] tracking-[-0.02em] mb-10"
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {data.heading}
        </motion.h2>

        <div 
          className="relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="overflow-hidden px-4">
            <div className="flex justify-center items-center gap-8 max-[768px]:gap-5 max-[500px]:gap-3">
              {getVisibleCards().map((p, index) => (
                <motion.div
                  key={p.uniqueKey}
                  className="bg-white rounded-[16px] w-[160px] h-[160px] flex flex-col items-center justify-center gap-3 shadow-[0_4px_12px_rgba(0,0,0,0.08)] flex-shrink-0 cursor-default hover:shadow-[0_8px_24px_rgba(0,0,0,0.15)] transition-shadow duration-300 max-[768px]:w-[130px] max-[768px]:h-[130px] max-[500px]:w-[95px] max-[500px]:h-[95px]"
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ 
                    duration: 0.5,
                    delay: index * 0.08,
                    ease: "easeInOut"
                  }}
                  whileHover={{ y: -4 }}
                >
                  <div className="w-[100px] h-[60px] flex items-center justify-center max-[768px]:w-[80px] max-[768px]:h-[48px] max-[500px]:w-[55px] max-[500px]:h-[35px]">
                    <img 
                      src={p.logo} 
                      alt={p.name}
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        const parent = e.target.parentElement;
                        if (parent) {
                          parent.innerHTML = `
                            <div class="w-[60px] h-[60px] rounded-[12px] text-white font-extrabold text-[1.5rem] flex items-center justify-center max-[500px]:w-[40px] max-[500px]:h-[40px] max-[500px]:text-[1rem]" style="background: ${p.color}">
                              ${p.initial}
                            </div>
                          `;
                        }
                      }}
                    />
                  </div>
                  <span className="text-[0.75rem] font-semibold text-[var(--gray-700)] text-center leading-[1.2] max-[500px]:text-[0.6rem]">
                    {p.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows - Desktop */}
          {/* <button
            onClick={() => setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides)}
            className="absolute left-0 top-1/2 -translate-y-1/2 -ml-2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors duration-200 max-[768px]:hidden z-10"
            aria-label="Previous"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M15 18l-6-6 6-6" stroke="#0B2537" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button> */}

          {/* <button
            onClick={() => setCurrentIndex((prev) => (prev + 1) % totalSlides)}
            className="absolute right-0 top-1/2 -translate-y-1/2 -mr-2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors duration-200 max-[768px]:hidden z-10"
            aria-label="Next"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M9 18l6-6-6-6" stroke="#0B2537" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button> */}

          {/* Navigation Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {data.list.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'w-8 bg-[var(--teal)]' 
                    : 'w-2 bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}