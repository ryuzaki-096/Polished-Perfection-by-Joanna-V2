import React, { useRef, useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Reveal, InteractiveDottedBackground } from './Blocks';
import { useAdaptiveParallax } from '../hooks/useParallax';

const categories = [
  { id: 0, name: 'Featured', tagline: 'Salon favourites & best-sellers', details: 'Experience our most popular treatments, curated to deliver exceptional results and ultimate relaxation. Perfect for first-time visitors.', img: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 1, name: 'Facials', tagline: 'Advanced skin treatments', details: 'Revitalize your complexion with bespoke facials designed to deeply cleanse, gently exfoliate, and deeply hydrate your unique skin type.', img: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 2, name: 'Body Sculpting', tagline: 'Targeted toning & sculpting', details: 'Non-invasive contouring treatments that help refine your silhouette, reduce stubborn fluid, and promote natural skin tightness.', img: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 3, name: 'Massage', tagline: 'Relaxing full-body care', details: 'Melt away tension with therapeutic touch. Our massages improve circulation, relieve muscle stiffness, and restore mental clarity.', img: 'https://images.unsplash.com/photo-1600334129128-68505d48fc36?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 4, name: 'Make up', tagline: 'Occasion-ready glam', details: 'From soft, natural radiance to full event glam, our makeup artists create flawless, long-lasting looks tailored to your features.', img: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 5, name: 'Nails', tagline: 'BIAB, gel & classic finishes', details: 'Enjoy meticulous cuticle care and shaping, finished with premium polishes or durable gels for stunning, healthy nails.', img: 'https://images.unsplash.com/photo-1519014816548-bf5fe059e98b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 6, name: 'Beauty', tagline: 'Waxing, tans & more', details: 'Complete your polished look with our essential beauty services, including gentle waxing and flawless, streak-free tanning.', img: 'https://images.unsplash.com/photo-1560944527-a4a429848866?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 7, name: 'Brows', tagline: 'Shape, tint & lamination', details: 'Define and frame your face beautifully with customized brow design, including precision tinting and transformative lamination.', img: 'https://images.unsplash.com/photo-1587778082149-bd5b11b51e06?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' }
];

const SakuraBurst = ({ active, wheelPos }: { active: boolean, wheelPos: number }) => {
  const petals = useMemo(() => Array.from({ length: 40 }).map((_, i) => {
    const angle = Math.random() * Math.PI * 2;
    const distance = 250 + Math.random() * 450; // spread distance
    return {
      id: i,
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance,
      r: Math.random() * 360,
      s: Math.random() * 0.5 + 0.3,
      delay: Math.random() * 0.3
    };
  }), []);

  return (
    <motion.div 
      className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[600px] pointer-events-none z-0 flex items-center justify-center overflow-visible"
      animate={{ rotate: wheelPos * -15 }}
      transition={{ type: "spring", stiffness: 60, damping: 20 }}
    >
      {petals.map(p => (
        <motion.div
          key={p.id}
          initial={{ opacity: 0, x: 0, y: 0, scale: 0, rotate: p.r }}
          animate={active ? { 
            opacity: 0.5, 
            x: p.x, 
            y: p.y, 
            scale: p.s, 
            rotate: p.r + 360 
          } : {
            opacity: 0, 
            x: 0, 
            y: 0, 
            scale: 0, 
            rotate: p.r
          }}
          transition={{ 
            duration: active ? 0.4 : 0.8, 
            ease: active ? "easeOut" : "easeIn", 
            delay: active ? p.delay * 0.3 : 0, 
            opacity: { duration: active ? 0.3 : 0.5 }
          }}
          className="absolute text-[#c2185b]"
        >
          <svg width="24" height="24" viewBox="-20 -50 40 50">
            <path d="M 0,0 C -12,-18 -18,-35 -8,-45 C -4,-48 0,-43 0,-38 C 0,-43 4,-48 8,-45 C 18,-35 12,-18 0,0 Z" fill="currentColor" />
          </svg>
        </motion.div>
      ))}
    </motion.div>
  );
};

export const Services = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHoveringWheel, setIsHoveringWheel] = useState(false);
  const [activeCategoryId, setActiveCategoryId] = useState<number | null>(null);
  const [flippedCardId, setFlippedCardId] = useState<number | null>(null);
  const activeOffset = useAdaptiveParallax(0.8);
  
  const wheelTarget = useRef(3.5);
  const currentWheel = useRef(3.5);
  const [, setRenderTrigger] = useState(0);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      // Only allow scrolling the wheel if hovering the area AND not explicitly hovering a tapped active card
      if (isHoveringWheel && flippedCardId === null) {
        e.preventDefault();
        wheelTarget.current += e.deltaY * 0.0035;
        if (wheelTarget.current < 0) wheelTarget.current = 0;
        if (wheelTarget.current > categories.length - 1) wheelTarget.current = categories.length - 1;
      }
    };
    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [isHoveringWheel, flippedCardId]);

  useEffect(() => {
    let animationFrameId: number;
    const renderLoop = () => {
      const diff = wheelTarget.current - currentWheel.current;
      if (Math.abs(diff) > 0.001) {
        currentWheel.current += diff * 0.1;
        setRenderTrigger(t => t + 1);
      }
      animationFrameId = requestAnimationFrame(renderLoop);
    };
    animationFrameId = requestAnimationFrame(renderLoop);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const handlePointerEnter = (id: number, idx: number) => {
    if (flippedCardId !== null) return; // Don't track hover if a card is flipped
    setIsHoveringWheel(true);
    setActiveCategoryId(id);
    wheelTarget.current = idx;
  };

  const handlePointerLeave = () => {
    if (flippedCardId !== null) return;
    setIsHoveringWheel(false);
    setActiveCategoryId(null);
  };

  const handleCardClick = (id: number, idx: number) => {
    if (flippedCardId === id) {
      setFlippedCardId(null);
    } else {
      setFlippedCardId(id);
      setActiveCategoryId(id);
      wheelTarget.current = idx;
    }
  };

  return (
    <section className="pt-16 md:pt-24 pb-16 md:pb-24 bg-background overflow-hidden transition-colors duration-500 relative" id="services">
      {/* Interactive Background Pattern */}
      <InteractiveDottedBackground multiplier={0.8} opacity="opacity-[0.06] dark:opacity-[0.04]" />

      {/* Background Sakura Branch Illustrations */}
      <motion.div 
        className="absolute top-0 left-0 pointer-events-none select-none text-[#c2185b] opacity-[0.12] z-0 scale-x-[-1]"
        animate={{ x: activeOffset.x * -0.8, y: activeOffset.y * 0.8 }}
        transition={{ type: "spring", stiffness: 75, damping: 15 }}
      >
        <svg className="w-[280px] md:w-[380px] h-[280px] md:h-[380px]" viewBox="0 0 200 200" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M200,0 C160,40 120,45 80,75 C60,90 40,92 10,110" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" opacity="0.4"/>
          <path d="M120,45 C100,50 90,40 70,35" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.4"/>
          <path d="M80,75 C70,85 64,80 50,82" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.4"/>
          <g transform="translate(160, 25) scale(0.6)">
            <path d="M0,0 C-6,-9 -9,-17 -4,-22 C-2,-24 0,-21 0,-19 C0,-21 2,-24 4,-22 C9,-17 6,-9 0,0 Z" />
            <path d="M0,0 C-6,-9 -9,-17 -4,-22 C-2,-24 0,-21 0,-19 C0,-21 2,-24 4,-22 C9,-17 6,-9 0,0 Z" transform="rotate(72)"/>
            <path d="M0,0 C-6,-9 -9,-17 -4,-22 C-2,-24 0,-21 0,-19 C0,-21 2,-24 4,-22 C9,-17 6,-9 0,0 Z" transform="rotate(144)"/>
            <path d="M0,0 C-6,-9 -9,-17 -4,-22 C-2,-24 0,-21 0,-19 C0,-21 2,-24 4,-22 C9,-17 6,-9 0,0 Z" transform="rotate(216)"/>
            <path d="M0,0 C-6,-9 -9,-17 -4,-22 C-2,-24 0,-21 0,-19 C0,-21 2,-24 4,-22 C9,-17 6,-9 0,0 Z" transform="rotate(288)"/>
          </g>
          <g transform="translate(120, 45) scale(0.8)">
            <path d="M0,0 C-6,-9 -9,-17 -4,-22 C-2,-24 0,-21 0,-19 C0,-21 2,-24 4,-22 C9,-17 6,-9 0,0 Z" />
            <path d="M0,0 C-6,-9 -9,-17 -4,-22 C-2,-24 0,-21 0,-19 C0,-21 2,-24 4,-22 C9,-17 6,-9 0,0 Z" transform="rotate(72)"/>
            <path d="M0,0 C-6,-9 -9,-17 -4,-22 C-2,-24 0,-21 0,-19 C0,-21 2,-24 4,-22 C9,-17 6,-9 0,0 Z" transform="rotate(144)"/>
            <path d="M0,0 C-6,-9 -9,-17 -4,-22 C-2,-24 0,-21 0,-19 C0,-21 2,-24 4,-22 C9,-17 6,-9 0,0 Z" transform="rotate(216)"/>
            <path d="M0,0 C-6,-9 -9,-17 -4,-22 C-2,-24 0,-21 0,-19 C0,-21 2,-24 4,-22 C9,-17 6,-9 0,0 Z" transform="rotate(288)"/>
          </g>
          <g transform="translate(80, 75) scale(0.7)">
            <path d="M0,0 C-6,-9 -9,-17 -4,-22 C-2,-24 0,-21 0,-19 C0,-21 2,-24 4,-22 C9,-17 6,-9 0,0 Z" />
            <path d="M0,0 C-6,-9 -9,-17 -4,-22 C-2,-24 0,-21 0,-19 C0,-21 2,-24 4,-22 C9,-17 6,-9 0,0 Z" transform="rotate(72)"/>
            <path d="M0,0 C-6,-9 -9,-17 -4,-22 C-2,-24 0,-21 0,-19 C0,-21 2,-24 4,-22 C9,-17 6,-9 0,0 Z" transform="rotate(144)"/>
            <path d="M0,0 C-6,-9 -9,-17 -4,-22 C-2,-24 0,-21 0,-19 C0,-21 2,-24 4,-22 C9,-17 6,-9 0,0 Z" transform="rotate(216)"/>
            <path d="M0,0 C-6,-9 -9,-17 -4,-22 C-2,-24 0,-21 0,-19 C0,-21 2,-24 4,-22 C9,-17 6,-9 0,0 Z" transform="rotate(288)"/>
          </g>
        </svg>
      </motion.div>
      <motion.div 
        className="absolute bottom-0 right-0 pointer-events-none select-none text-[#c2185b] opacity-[0.12] z-0 scale-y-[-1]"
        animate={{ x: activeOffset.x * 0.8, y: activeOffset.y * -0.8 }}
        transition={{ type: "spring", stiffness: 75, damping: 15 }}
      >
        <svg className="w-[280px] md:w-[380px] h-[280px] md:h-[380px]" viewBox="0 0 200 200" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M200,0 C160,40 120,45 80,75 C60,90 40,92 10,110" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" opacity="0.4"/>
          <path d="M120,45 C100,50 90,40 70,35" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.4"/>
          <path d="M80,75 C70,85 64,80 50,82" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.4"/>
          <g transform="translate(160, 25) scale(0.6)">
            <path d="M0,0 C-6,-9 -9,-17 -4,-22 C-2,-24 0,-21 0,-19 C0,-21 2,-24 4,-22 C9,-17 6,-9 0,0 Z" />
            <path d="M0,0 C-6,-9 -9,-17 -4,-22 C-2,-24 0,-21 0,-19 C0,-21 2,-24 4,-22 C9,-17 6,-9 0,0 Z" transform="rotate(72)"/>
            <path d="M0,0 C-6,-9 -9,-17 -4,-22 C-2,-24 0,-21 0,-19 C0,-21 2,-24 4,-22 C9,-17 6,-9 0,0 Z" transform="rotate(144)"/>
            <path d="M0,0 C-6,-9 -9,-17 -4,-22 C-2,-24 0,-21 0,-19 C0,-21 2,-24 4,-22 C9,-17 6,-9 0,0 Z" transform="rotate(216)"/>
            <path d="M0,0 C-6,-9 -9,-17 -4,-22 C-2,-24 0,-21 0,-19 C0,-21 2,-24 4,-22 C9,-17 6,-9 0,0 Z" transform="rotate(288)"/>
          </g>
          <g transform="translate(120, 45) scale(0.8)">
            <path d="M0,0 C-6,-9 -9,-17 -4,-22 C-2,-24 0,-21 0,-19 C0,-21 2,-24 4,-22 C9,-17 6,-9 0,0 Z" />
            <path d="M0,0 C-6,-9 -9,-17 -4,-22 C-2,-24 0,-21 0,-19 C0,-21 2,-24 4,-22 C9,-17 6,-9 0,0 Z" transform="rotate(72)"/>
            <path d="M0,0 C-6,-9 -9,-17 -4,-22 C-2,-24 0,-21 0,-19 C0,-21 2,-24 4,-22 C9,-17 6,-9 0,0 Z" transform="rotate(144)"/>
            <path d="M0,0 C-6,-9 -9,-17 -4,-22 C-2,-24 0,-21 0,-19 C0,-21 2,-24 4,-22 C9,-17 6,-9 0,0 Z" transform="rotate(216)"/>
            <path d="M0,0 C-6,-9 -9,-17 -4,-22 C-2,-24 0,-21 0,-19 C0,-21 2,-24 4,-22 C9,-17 6,-9 0,0 Z" transform="rotate(288)"/>
          </g>
        </svg>
      </motion.div>

      <Reveal className="max-w-[1280px] mx-auto px-[20px] md:px-[64px] text-center mb-8 relative z-10">
        <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-4">Every treatment. Precision delivered.</h2>
        <p className="text-[11px] md:text-xs italic text-on-surface-variant/50 max-w-[500px] mx-auto font-sans">Scroll to browse, and click to reveal details.</p>
      </Reveal>
      
      <Reveal className="w-full relative py-2 md:py-4 min-h-[440px] md:min-h-[500px] flex justify-center items-start pt-2 md:pt-6 relative z-10">
        <div 
          ref={containerRef}
          className="relative w-full max-w-[1000px] h-full flex justify-center items-start overflow-visible touch-pan-y animate-fade-in"
          onMouseEnter={() => setIsHoveringWheel(true)}
          onMouseLeave={handlePointerLeave}
          onTouchStart={(e) => {
            setIsHoveringWheel(true);
            (containerRef.current as any)._touchStartX = e.touches[0].clientX;
          }}
          onTouchMove={(e) => {
            if (flippedCardId === null) {
              const startX = (containerRef.current as any)._touchStartX;
              const currentX = e.touches[0].clientX;
              const delta = startX - currentX;
              (containerRef.current as any)._touchStartX = currentX;
              wheelTarget.current += delta * 0.02;
              if (wheelTarget.current < 0) wheelTarget.current = 0;
              if (wheelTarget.current > categories.length - 1) wheelTarget.current = categories.length - 1;
            }
          }}
          onTouchEnd={handlePointerLeave}
        >
          <SakuraBurst active={isHoveringWheel} wheelPos={currentWheel.current} />
          {categories.map((cat, i) => {
            const d = i - currentWheel.current;
            const absD = Math.abs(d);
            
            let dy = 0;
            let dx = 0;
            let rot = 0;
            let zIndex = 0;
            
            if (!isHoveringWheel && flippedCardId === null) {
              dy = absD * 6;
              dx = d * 12;
              rot = d * 1.5;
              zIndex = Math.round(100 - absD * 10);
            } else {
              dy = Math.pow(absD, 1.8) * 15 - 40;
              dx = d * 130;
              rot = d * 6;
              zIndex = Math.round(100 - absD * 10);
              
              // Scale down slightly for mobile to keep in viewport
              if (typeof window !== 'undefined' && window.innerWidth < 768) {
                dx *= 0.75;
                dy *= 0.6;
                rot *= 0.8;
              }
            }
            
            const isActive = activeCategoryId === cat.id;
            const isFlipped = flippedCardId === cat.id;
            
            const currentDx = dx + activeOffset.x * 0.8;
            const currentDy = dy + activeOffset.y * 0.8;
            
            return (
              <div 
                key={cat.id}
                onMouseEnter={() => handlePointerEnter(cat.id, i)}
                onTouchStart={(e) => {
                  // e.preventDefault(); // Don't prevent default, allow tap
                  handlePointerEnter(cat.id, i);
                }}
                onClick={() => handleCardClick(cat.id, i)}
                className="absolute w-[240px] md:w-[280px] h-[320px] md:h-[380px] perspective-[1500px] transition-all duration-300 ease-out group cursor-pointer"
                style={{
                  transform: `translate3d(${currentDx}px, ${currentDy}px, 0) rotate(${rot}deg) scale(${isActive ? 1.05 : 1})`,
                  zIndex: isFlipped ? 100 : zIndex,
                  transformOrigin: 'center center',
                }}
              >
                <motion.div
                  className="w-full h-full relative"
                  style={{ transformStyle: 'preserve-3d' }}
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                >
                  {/* Front */}
                  <div 
                    className="absolute inset-0 bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.4)] flex flex-col justify-end p-6 md:p-8 transition-all duration-300 border border-outline-variant/30 overflow-hidden" 
                    style={{ 
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                      boxShadow: isActive ? '0 20px 40px -10px rgba(194, 24, 91, 0.4)' : undefined
                    }}
                  >
                    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden rounded-2xl">
                      <img alt={cat.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" src={cat.img} />
                      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-colors duration-500 rounded-b-2xl"></div>
                    </div>

                    <div className="relative z-10 pointer-events-none text-white">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-headline-sm text-headline-sm text-white">{cat.name}</h3>
                      </div>
                      <div className={`h-[2px] bg-primary-fixed transition-all duration-700 ease-in-out mb-4 ${isActive ? 'w-full' : 'w-8'}`} />
                      <div className="relative h-[24px]">
                        <p className="absolute top-0 font-body-md text-label-md text-white/90">
                          {cat.tagline}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Back */}
                  <div 
                    className="absolute inset-0 bg-white dark:bg-[#1A1114] rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.4)] flex flex-col p-6 md:p-8 border border-outline-variant/30 overflow-hidden" 
                    style={{ 
                      backfaceVisibility: 'hidden', 
                      WebkitBackfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)',
                    }}
                  >
                     <div className="absolute top-0 right-0 p-4 opacity-30 text-gray-900 dark:text-white">
                       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                     </div>
                     <h3 className="font-headline-sm text-headline-sm text-gray-900 dark:text-white mb-2">{cat.name}</h3>
                     <div className="w-8 h-[2px] bg-primary mb-6"></div>
                     <p className="font-body-md text-gray-700 dark:text-gray-300 flex-1 text-sm md:text-base leading-relaxed">
                       {cat.details}
                     </p>
                     <a 
                       href="https://www.fresha.com/a/polished-perfection-by-joanna-piltown-unit-g89y4cvr" 
                       target="_blank" 
                       rel="noopener noreferrer"
                       className="text-primary font-label-md uppercase tracking-widest mt-auto self-start hover:opacity-80 transition-opacity flex items-center gap-2"
                       onClick={(e) => e.stopPropagation()}
                     >
                       Book Now
                       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                     </a>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </Reveal>
    </section>
  );
};
