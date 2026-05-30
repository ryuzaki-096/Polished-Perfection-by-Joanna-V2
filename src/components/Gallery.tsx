import React, { useRef, useState } from 'react';
import { Reveal, InteractiveDottedBackground } from './Blocks';
import { ChevronLeft, ChevronRight } from 'lucide-react';
// @ts-ignore
import HTMLFlipBook from 'react-pageflip';
import { motion } from 'motion/react';
import { useAdaptiveParallax } from '../hooks/useParallax';

const FlipBook = HTMLFlipBook as any;

const galleryImages = [
  { id: 1, category: "Nails", src: "https://images.unsplash.com/photo-1519014816548-bf5fe059e98b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", alt: "Nails Silver Design" },
  { id: 2, category: "Brows", src: "https://images.unsplash.com/photo-1587778082149-bd5b11b51e06?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", alt: "Brows Mapping Treatment" },
  { id: 3, category: "Lashes", src: "https://images.unsplash.com/photo-1512496015851-a1c842914119?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", alt: "Lashes" },
  { id: 4, category: "Facials", src: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", alt: "Luxury Products" },
  { id: 5, category: "Interior", src: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", alt: "Salon Interior" },
  { id: 6, category: "Facials", src: "https://images.unsplash.com/photo-1616394584738-fc6e612e71c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", alt: "Facial Steamer" },
  { id: 7, category: "Make up", src: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", alt: "Makeup Palette" },
  { id: 8, category: "Massage", src: "https://images.unsplash.com/photo-1600334129128-68505d48fc36?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", alt: "Massage" }
];

const Page = React.forwardRef<HTMLDivElement, { children: React.ReactNode, className?: string, style?: React.CSSProperties }>(
  (props, ref) => {
    return (
      <div className={`page ${props.className || ''}`} ref={ref} style={props.style}>
        {props.children}
      </div>
    );
  }
);

export const Gallery = () => {
  const bookRef = useRef<any>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const handleFlip = React.useCallback((e: any) => {
    if (e && typeof e.data === 'number') {
      setCurrentPage((prev) => (prev !== e.data ? e.data : prev));
    }
  }, []);
  const totalPages = galleryImages.length + 4;
  const isOpen = currentPage > 0 && currentPage < totalPages - 1;
  const [isDesktopOrTab, setIsDesktopOrTab] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const activeOffset = useAdaptiveParallax(0.8);

  const centerX = React.useMemo(() => {
    if (!isDesktopOrTab) return "0%";
    if (currentPage === 0) return "-25%";
    if (currentPage === totalPages - 1) return "25%";
    return "0%";
  }, [isDesktopOrTab, currentPage, totalPages]);

  React.useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setIsDesktopOrTab(window.innerWidth >= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const dimensions = React.useMemo(() => {
    if (windowWidth < 480) { // Mobile portrait
      // Increase relative height (aspect ratio) to provide more page length for the layout and content
      return { width: 300, height: 500 }; 
    }
    if (windowWidth < 768) { // Large mobile / small tablet
      return { width: 340, height: 530 };
    }
    if (windowWidth < 1024) { // Tablet
      return { width: 400, height: 580 };
    }
    return { width: 500, height: 650 }; // Desktop
  }, [windowWidth]);

  const pages = React.useMemo(() => {
    const list = [];
    
    // Soft front cover
    list.push(
      <Page key="cover" className="page-right bg-[#1A1114] text-white overflow-hidden shadow-default border-l border-white/10">
        <div 
          className="w-full h-full relative cursor-pointer"
          onClick={() => {
            bookRef.current?.pageFlip()?.flipNext();
          }}
        >
          <img src={galleryImages[0].src} className="absolute inset-0 w-full h-full object-cover" alt="Cover" />
          <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-black/50 to-transparent z-10"></div>
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
          <div className="absolute top-0 bottom-0 left-0 w-16 bg-gradient-to-r from-black/80 via-black/20 to-transparent z-10 pointer-events-none mix-blend-multiply"></div>
          <div className="absolute inset-0 p-4 sm:p-6 md:p-8 flex flex-col items-center justify-between z-20">
              <h1 className="text-[50px] sm:text-[70px] md:text-[90px] leading-none text-white tracking-[0.15em] uppercase mt-4 mb-auto mix-blend-overlay opacity-90" style={{ fontFamily: '"Didot", "Bodoni MT", "Times New Roman", serif' }}>VOGUE</h1>
              <div className="w-full">
                  <p className="font-label-lg uppercase text-white tracking-[0.3em] text-center mb-2">Polished Perfection</p>
                  <p className="font-body-md text-white/80 text-center tracking-widest uppercase">The Lookbook</p>
              </div>
          </div>
        </div>
      </Page>
    );

    // Inside front cover
    list.push(
      <Page key="inside-cover" className="page-left bg-[#F5F5F5] dark:bg-[#1A1A1A] overflow-hidden">
        <div className="w-full h-full flex flex-col justify-between p-4 sm:p-6 md:p-10 relative">
          <div className="absolute inset-0 bg-cover bg-center brightness-[0.95] dark:brightness-[0.4]" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')" }}></div>
          <div className="absolute inset-0 bg-black/10 dark:bg-black/60 z-10 animate-fade-in"></div>
          <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-black/50 via-black/10 to-transparent z-10 pointer-events-none mix-blend-multiply"></div>
          <div className="absolute inset-y-0 left-0 w-4 bg-gradient-to-r from-black/10 to-transparent z-10 pointer-events-none"></div>
          
          <div className="relative z-20 text-white flex flex-col h-full justify-between">
            <div className="border-b border-white/20 pb-4">
               <p className="font-label-sm uppercase tracking-widest text-[#eeeeee]/90">Foreword</p>
            </div>
            <div className="my-[12px] sm:my-[40px] md:my-[80px]">
               <h2 className="font-headline-sm text-white mb-2 sm:mb-4 tracking-wide uppercase" style={{ fontFamily: '"Didot", "Bodoni MT", "Times New Roman", serif' }}>Artistry & Grace</h2>
               <p className="font-body-md text-white/95 leading-relaxed text-left text-justify line-clamp-none">
                 A curated collection of our finest work, showcasing precision and passion. We believe beauty is a personal expression, and each service is tailored to amplify your natural brilliance.
               </p>
            </div>
            <div className="border-t border-white/20 pt-4 flex justify-between select-none">
               <span className="text-[9px] uppercase tracking-widest text-white/60">By Joanna</span>
               <span className="text-[9px] uppercase tracking-widest text-white/60">Est. 2024</span>
            </div>
          </div>
        </div>
      </Page>
    );

    // Inner pages
    galleryImages.forEach((img, i) => {
      // Current list.length indicates the next page index.
      // If list.length is odd (e.g. 3), it's a right page.
      const isRightPage = list.length % 2 === 0;

      list.push(
        <Page key={`img-${img.id}`} className={`${isRightPage ? 'page-right' : 'page-left'} bg-[#F5F5F5] dark:bg-[#1A1A1A] overflow-hidden`}>
          <div className="w-full h-full relative flex flex-col p-4 sm:p-6 md:p-10 pt-4 sm:pt-8 md:pt-12">
            {/* Header */}
            <div className="flex justify-between items-center text-[7px] md:text-[9px] uppercase tracking-widest text-[#4A4A4A] dark:text-[#A0A0A0] mb-3 sm:mb-6 flex-shrink-0">
               <span>Polished Perfection</span>
               <span>Lookbook • Collection 01</span>
            </div>

            {/* Image */}
            <div className="w-full flex-1 mb-3 sm:mb-6 md:mb-8 overflow-hidden bg-surface-variant relative min-h-[35%] md:min-h-[48%]">
               <img src={img.src} alt={img.alt} className="absolute inset-0 w-full h-full object-cover" />
            </div>

            {/* Title and Page number */}
            <div className="flex justify-between items-end mb-2 sm:mb-4 border-b border-black/10 dark:border-white/10 pb-2 sm:pb-4 flex-shrink-0">
               <h3 className="font-display-lg text-title-lg md:text-headline-sm font-semibold tracking-tight text-[#222222] dark:text-[#EEEEEE] capitalize">{img.category}</h3>
               <span className="font-display-lg text-title-lg md:text-headline-sm text-[#222222] dark:text-[#EEEEEE] font-bold">{String(i + 1).padStart(2, '0')}</span>
            </div>

            {/* Text columns */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 md:gap-6 mt-1 sm:mt-2 flex-shrink-0">
               <p className="flex-1 text-[8px] sm:text-[9px] md:text-[11px] leading-[1.4] sm:leading-[1.5] md:leading-[1.8] text-[#555555] dark:text-[#999999] text-justify">
                 Discover the exquisite details of our {img.category} collection. Every element is crafted to perfection, blending timeless elegance with modern sophistication.
               </p>
               <p className="flex-1 text-[8px] sm:text-[9px] md:text-[11px] leading-[1.4] sm:leading-[1.5] md:leading-[1.8] text-[#555555] dark:text-[#999999] text-justify">
                 Showcasing unparalleled styling focusing on meticulous precision. It's not just about beauty, it's about the confidence that radiates from within when you look your best.
               </p>
            </div>

            {/* Spine shadow overlays */}
            {isRightPage ? (
               <div className="absolute inset-y-0 left-0 w-8 md:w-16 bg-gradient-to-r from-black/50 via-black/10 to-transparent z-10 pointer-events-none mix-blend-multiply"></div>
            ) : (
               <div className="absolute inset-y-0 right-0 w-8 md:w-16 bg-gradient-to-l from-black/50 via-black/10 to-transparent z-10 pointer-events-none mix-blend-multiply"></div>
            )}
          </div>
        </Page>
      );
    });

    // Inside back cover
    list.push(
      <Page key="inside-back" className="page-right bg-[#F5F5F5] dark:bg-[#1A1A1A] overflow-hidden">
        <div className="w-full h-full flex flex-col justify-between p-4 sm:p-6 md:p-10 relative">
          <div className="absolute inset-0 bg-cover bg-center brightness-[0.95] dark:brightness-[0.4]" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1515377905703-c4788e51af15?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')" }}></div>
          <div className="absolute inset-0 bg-black/10 dark:bg-black/60 z-10"></div>
          <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-black/50 via-black/10 to-transparent z-10 pointer-events-none mix-blend-multiply"></div>
          <div className="absolute inset-y-0 right-0 w-4 bg-gradient-to-l from-black/10 to-transparent z-10 pointer-events-none"></div>

          <div className="relative z-20 text-white flex flex-col h-full justify-between">
            <div className="border-b border-white/20 pb-4">
               <p className="font-label-sm uppercase tracking-widest text-[#eeeeee]/90">Gratitude</p>
            </div>
            <div className="my-[12px] sm:my-[40px] md:my-[80px]">
               <h2 className="font-headline-sm text-white mb-2 sm:mb-4 tracking-wide uppercase" style={{ fontFamily: '"Didot", "Bodoni MT", "Times New Roman", serif' }}>Our Philosophy</h2>
               <p className="font-body-md text-white/95 leading-relaxed text-left text-justify line-clamp-none">
                 Every moment spent with us is designed to be a luxurious escape. We design with intent, execute with perfection, and send you out feeling refreshed, radiant and confident.
               </p>
            </div>
            <div className="border-t border-white/20 pt-4 flex justify-between select-none">
               <span className="text-[9px] uppercase tracking-widest text-white/60">Polished Perfection</span>
               <span className="text-[9px] uppercase tracking-widest text-white/60">Irish Beauty</span>
            </div>
          </div>
        </div>
      </Page>
    );

    // Soft back cover
    list.push(
      <Page key="back" className="page-left bg-[#1A1114] text-white overflow-hidden shadow-default border-r border-white/10">
        <div className="w-full h-full flex flex-col justify-center items-center p-4 md:p-8 relative">
          <div className="absolute top-0 bottom-0 right-0 w-16 bg-gradient-to-l from-black/80 via-black/20 to-transparent z-10 pointer-events-none mix-blend-multiply"></div>
          <div className="absolute top-0 bottom-0 left-0 w-2 bg-gradient-to-r from-white/10 to-transparent z-10 pointer-events-none"></div>
          <h2 className="font-display-lg text-headline-lg text-center text-white/50 z-20">Fin.</h2>
          <p className="font-label-md mt-6 text-white/40 text-center z-20">We look forward to seeing you.</p>
          <button 
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              const api = bookRef.current?.pageFlip();
              if (api) {
                if (typeof api.turnToPage === 'function') {
                  api.turnToPage(0);
                } else if (typeof api.flip === 'function') {
                  api.flip(0);
                }
              }
            }}
            className="mt-8 px-5 py-2.5 border border-white/20 hover:border-white/60 bg-white/5 hover:bg-white/10 text-[10px] uppercase tracking-[0.2em] transition-all duration-300 rounded cursor-pointer z-30 font-sans"
          >
            Go to Cover Page
          </button>
        </div>
      </Page>
    );

    return list;
  }, []);

  return (
    <section className="pt-8 md:pt-12 pb-24 md:pb-32 bg-surface-container-lowest transition-colors duration-500 relative" id="gallery">
      {/* Interactive Background Pattern */}
      <InteractiveDottedBackground multiplier={0.8} opacity="opacity-[0.06] dark:opacity-[0.04]" />

      {/* Background Sakura Branch Illustrations */}
      <motion.div 
        className="absolute top-0 right-0 pointer-events-none select-none text-[#c2185b] opacity-[0.12] z-0"
        animate={{ x: activeOffset.x * 0.8, y: activeOffset.y * 0.8 }}
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
          <path d="M40,110 C35,115 32,108 30,120 C32,126 36,120 40,110 Z" transform="rotate(15, 40, 110)" />
          <path d="M90,120 C85,125 82,118 80,130 C82,136 86,130 90,120 Z" transform="rotate(-25, 90, 120)" />
        </svg>
      </motion.div>
      <motion.div 
        className="absolute bottom-0 left-0 pointer-events-none select-none text-[#c2185b] opacity-[0.12] z-0 scale-x-[-1] scale-y-[-1]"
        animate={{ x: activeOffset.x * -0.8, y: activeOffset.y * -0.8 }}
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

      <Reveal className="max-w-[1280px] mx-auto px-[20px] md:px-[64px] relative z-10">
        <div className="text-center mb-12">
          <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-4 transition-colors duration-500">A glimpse into our artistry.</h2>
          <p className="text-[11px] md:text-xs italic text-on-surface-variant/50 font-sans">Drag the edges of the pages to flip through.</p>
        </div>
        
        {/* Flipbook Container */}
        <div className="relative w-full max-w-[1000px] mx-auto flex flex-col items-center justify-center my-12 group overflow-visible">
           <motion.div 
             className="w-full flex justify-center drop-shadow-[0_4px_6px_rgba(0,0,0,0.25)] dark:drop-shadow-[0_4px_8px_rgba(0,0,0,0.35)]"
             initial={{ opacity: 0, scale: 0.98, x: "0%" }}
             animate={{ 
               opacity: 1, 
               scale: 1,
               x: centerX
             }}
             transition={{ 
               opacity: { duration: 0.8, ease: "easeOut" },
               scale: { duration: 0.8, ease: "easeOut" },
               x: { type: "spring", stiffness: 120, damping: 20 }
             }}
             style={{ transformOrigin: "center center" }}
           >
              <FlipBook
                key={`${dimensions.width}-${dimensions.height}`}
                width={dimensions.width}
                height={dimensions.height}
                size="stretch"
                minWidth={240}
                maxWidth={500}
                minHeight={300}
                maxHeight={700}
                maxShadowOpacity={0.6}
                showCover={true}
                usePortrait={true}
                mobileScrollSupport={false}
                useMouseEvents={true}
                swipeDistance={30}
                className="book-element"
                ref={bookRef}
                style={{ margin: '0 auto' }}
                onFlip={handleFlip}
              >
                {pages}
              </FlipBook>
           </motion.div>
        </div>
      </Reveal>
    </section>
  );
};



