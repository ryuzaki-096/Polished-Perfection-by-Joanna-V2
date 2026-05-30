// Component definitions for the landing page

import { motion } from 'motion/react';
import React, { useEffect, useState, useRef } from 'react';
import { Sun, Moon, Star, Menu, X, Sparkles, Heart, UserCheck } from 'lucide-react';
import { useAdaptiveParallax } from '../hooks/useParallax';

export const InteractiveDottedBackground = ({ multiplier = 1, opacity = "opacity-[0.08]" }: { multiplier?: number, opacity?: string }) => {
  const activeOffset = useAdaptiveParallax(multiplier);
  return (
    <motion.div 
      className={`absolute inset-[-50px] pointer-events-none z-0 ${opacity}`} 
      style={{ backgroundImage: 'radial-gradient(circle at center, var(--color-primary-container) 1.2px, transparent 1.2px)', backgroundSize: '40px 40px' }}
      animate={{ x: activeOffset.x * -2, y: activeOffset.y * -2 }}
      transition={{ type: "spring", stiffness: 75, damping: 15, mass: 0.5 }}
    />
  );
};

export const Reveal = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const Navbar = ({ toggleTheme, isDark }: { toggleTheme: () => void, isDark: boolean }) => {
  const [scrolled, setScrolled] = useState(false);
  const [navReady, setNavReady] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    const timer = setTimeout(() => {
      setNavReady(true);
    }, 4000);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-1000 ${navReady || scrolled ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'} ${scrolled || mobileMenuOpen ? 'bg-surface/90 backdrop-blur-md py-0 border-0 shadow-lg' : 'bg-transparent py-0'}`}>
      <div className="flex justify-between items-center max-w-[1280px] mx-auto px-[20px] md:px-[64px] h-14 md:h-16">
        <div className="flex items-center gap-4">
          <span className="font-display-lg text-title-lg md:text-headline-sm text-primary tracking-tight transition-colors duration-500">Polished Perfection</span>
        </div>
        <div className="hidden md:flex items-center gap-8 font-label-lg text-label-lg">
          <a className="text-on-surface hover:text-primary transition-all duration-300 px-2 py-1 rounded" href="#hero">Home</a>
          <a className="text-on-surface hover:text-primary transition-all duration-300 px-2 py-1 rounded" href="#services">Services</a>
          <a className="text-on-surface hover:text-primary transition-all duration-300 px-2 py-1 rounded" href="#gallery">Gallery</a>
          <a className="text-on-surface hover:text-primary transition-all duration-300 px-2 py-1 rounded" href="#about-polished-perfection">Team</a>
          <a className="text-on-surface hover:text-primary transition-all duration-300 px-2 py-1 rounded" href="#book">Bookings</a>
        </div>
        
        {/* Desktop Theme Toggle */}
        <div className="hidden md:flex items-center gap-4">
          <button onClick={toggleTheme} className="text-on-surface hover:text-primary transition-colors p-2" id="theme-toggle" aria-label="Toggle theme" aria-pressed={isDark}>
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>

        {/* Mobile menu toggle & theme toggle */}
        <div className="flex md:hidden items-center gap-3">
          <button onClick={toggleTheme} className="text-on-surface hover:text-primary transition-colors p-2" aria-label="Toggle theme">
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="text-on-surface hover:text-primary transition-colors p-2 z-50"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu Drawer */}
      {mobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="md:hidden w-full bg-surface/95 backdrop-blur-lg border-t border-outline-variant/10 shadow-lg px-[20px] py-4 flex flex-col gap-2"
        >
          <a onClick={() => setMobileMenuOpen(false)} className="text-on-surface hover:text-primary transition-all duration-300 px-4 py-2.5 rounded text-base font-medium border-b border-outline-variant/5" href="#hero">Home</a>
          <a onClick={() => setMobileMenuOpen(false)} className="text-on-surface hover:text-primary transition-all duration-300 px-4 py-2.5 rounded text-base font-medium border-b border-outline-variant/5" href="#services">Services</a>
          <a onClick={() => setMobileMenuOpen(false)} className="text-on-surface hover:text-primary transition-all duration-300 px-4 py-2.5 rounded text-base font-medium border-b border-outline-variant/5" href="#gallery">Gallery</a>
          <a onClick={() => setMobileMenuOpen(false)} className="text-on-surface hover:text-primary transition-all duration-300 px-4 py-2.5 rounded text-base font-medium border-b border-outline-variant/5" href="#about-polished-perfection">Team</a>
          <a onClick={() => setMobileMenuOpen(false)} className="text-on-surface hover:text-primary transition-all duration-300 px-4 py-2.5 rounded text-base font-medium" href="#book">Bookings</a>
        </motion.div>
      )}
    </nav>
  );
};

const DisplacedText = ({ text, mousePos, className, multiplier = 1 }: { text: string, mousePos: { x: number, y: number }, className?: string, multiplier?: number }) => {
  return (
    <span className={className}>
      {text.split("").map((char, index) => {
        if (char === " ") return <span key={index} style={{ whiteSpace: "pre" }}> </span>;
        
        return (
          <DisplacedChar 
            key={index} 
            char={char} 
            mouseX={mousePos.x} 
            mouseY={mousePos.y} 
            multiplier={multiplier}
          />
        );
      })}
    </span>
  );
};

const DisplacedChar: React.FC<{ char: string, mouseX: number, mouseY: number, multiplier: number }> = ({ char, mouseX, mouseY, multiplier }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = mouseX - centerX;
    const dy = mouseY - centerY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    // Repulsion radius
    const maxRadius = 100;

    let targetX = 0;
    let targetY = 0;

    if (distance < maxRadius && distance > 0) {
      const pushStrength = Math.pow((maxRadius - distance) / maxRadius, 2);
      targetX = -(dx / distance) * pushStrength * 30 * multiplier;
      targetY = -(dy / distance) * pushStrength * 30 * multiplier;
    }

    setOffset({ x: targetX, y: targetY });
  }, [mouseX, mouseY, multiplier]);

  return (
    <motion.span
      ref={ref}
      className="inline-block"
      animate={{ x: offset.x, y: offset.y }}
      transition={{ type: "spring", stiffness: 200, damping: 15, mass: 0.5 }}
    >
      {char}
    </motion.span>
  );
};

export const Hero = () => {
  const activeOffset = useAdaptiveParallax(1);
  const [absMousePos, setAbsMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      setAbsMousePos({ x: e.clientX, y: e.clientY });
    };
    if (typeof window !== 'undefined') {
      window.addEventListener('mousemove', handleGlobalMouseMove);
    }
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('mousemove', handleGlobalMouseMove);
      }
    };
  }, []);

  return (
    <header 
      className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-background transition-colors duration-500" 
      id="hero"
    >
      {/* Sakura Illustration Background */}
      <motion.div 
        className="absolute inset-0 z-0 pointer-events-none text-primary"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.12, x: activeOffset.x * -1, y: activeOffset.y * -1 }}
        transition={{ opacity: { duration: 1.5, delay: 2.0, ease: "easeOut" }, default: { type: "spring", stiffness: 60, damping: 20 } }}
      >
        <svg className="w-full h-full text-[#c2185b]" preserveAspectRatio="xMidYMid slice" viewBox="0 0 1200 800" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <g id="sakura-petal">
              <path d="M 0,0 C -12,-18 -18,-35 -8,-45 C -4,-48 0,-43 0,-38 C 0,-43 4,-48 8,-45 C 18,-35 12,-18 0,0 Z" />
            </g>
            <g id="sakura-flower">
              <use href="#sakura-petal" transform="rotate(0)" />
              <use href="#sakura-petal" transform="rotate(72)" />
              <use href="#sakura-petal" transform="rotate(144)" />
              <use href="#sakura-petal" transform="rotate(216)" />
              <use href="#sakura-petal" transform="rotate(288)" />
              <circle cx="0" cy="0" r="5" fill="currentColor" opacity="0.5" />
              <path d="M 0,0 L 0,-15 M 0,0 L 14,-5 M 0,0 L 9,12 M 0,0 L -9,12 M 0,0 L -14,-5" stroke="currentColor" fill="none" strokeWidth="1.5" opacity="0.6"/>
              <circle cx="0" cy="-15" r="1.5" fill="currentColor" opacity="0.8" />
              <circle cx="14" cy="-5" r="1.5" fill="currentColor" opacity="0.8" />
              <circle cx="9" cy="12" r="1.5" fill="currentColor" opacity="0.8" />
              <circle cx="-9" cy="12" r="1.5" fill="currentColor" opacity="0.8" />
              <circle cx="-14" cy="-5" r="1.5" fill="currentColor" opacity="0.8" />
            </g>
            <g id="rose-flower">
              <path d="M 0,-5 C -25,-35 -40,0 -15,15 C -5,20 15,20 20,5 C 25,-10 10,-35 0,-5 Z" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
              <path d="M 5,0 C 35,-25 40,15 15,25 C -5,30 -25,15 -15,0 C -10,-10 0,-15 5,0 Z" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
              <path d="M -10,5 C -20,-10 0,-20 10,-5 C 20,10 0,20 -5,5 Z" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
              <path d="M -2,0 C -6,-8 6,-8 7,-2 C 8,5 -2,8 -4,3 C -6,-1 2,-3 2,-1" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </g>
          </defs>
          
          {/* Branch 1 (Top Right) - Scaled down and pushed further into corner */}
          <motion.g
            initial={{ opacity: 0, x: 100, y: -100 }}
            animate={{ opacity: 1, x: activeOffset.x * 1.5, y: activeOffset.y * 1.5 }}
            transition={{ opacity: { duration: 1.5, ease: "easeOut", delay: 2.0 }, default: { type: "spring", stiffness: 40, damping: 20 } }}
          >
            <motion.g
              animate={{ rotate: [0, 2, -1, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2.0 }}
              style={{ transformOrigin: "1000px 100px" }}
            >
              <g transform="translate(475, -50) scale(0.5)">
                <g stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.4">
                  <path d="M 1250,50 C 1050,150 900,120 750,250 C 650,330 550,300 420,420" />
                  <path d="M 950,150 C 900,250 850,280 800,320" />
                  <path d="M 750,250 C 700,200 650,220 580,170" />
                </g>
            
            <g fill="currentColor">
              {/* Flowers on Branch 1 */}
              <use href="#sakura-flower" transform="translate(1050, 150) scale(0.8) rotate(20)" />
              <use href="#sakura-flower" transform="translate(900, 120) scale(1.2) rotate(-15)" />
              <use href="#sakura-flower" transform="translate(750, 250) scale(1) rotate(45)" />
              <use href="#sakura-flower" transform="translate(650, 330) scale(0.9) rotate(-30)" />
              <use href="#sakura-flower" transform="translate(550, 300) scale(0.7) rotate(60)" />
              <use href="#sakura-flower" transform="translate(420, 420) scale(1.1) rotate(10)" />
              
              <use href="#sakura-flower" transform="translate(950, 150) scale(0.8) rotate(80)" />
              <use href="#sakura-flower" transform="translate(850, 280) scale(1) rotate(-50)" />
              <use href="#sakura-flower" transform="translate(800, 320) scale(0.9) rotate(120)" />
              
              <use href="#sakura-flower" transform="translate(700, 200) scale(1.1) rotate(5)" />
              <use href="#sakura-flower" transform="translate(580, 170) scale(0.8) rotate(-75)" />

              {/* Floating Petals */}
              <use href="#sakura-petal" transform="translate(800, 450) scale(0.6) rotate(45)" />
              <use href="#sakura-petal" transform="translate(600, 400) scale(0.5) rotate(120)" />
              <use href="#sakura-petal" transform="translate(450, 520) scale(0.7) rotate(-30)" />
              <use href="#sakura-petal" transform="translate(550, 620) scale(0.8) rotate(70)" />
              <use href="#sakura-petal" transform="translate(750, 680) scale(0.6) rotate(-15)" />
              <use href="#sakura-petal" transform="translate(300, 380) scale(0.5) rotate(100)" />
              <use href="#sakura-petal" transform="translate(200, 480) scale(0.7) rotate(-60)" />
            </g>
          </g>
            </motion.g>
          </motion.g>
          
          {/* Branch 2 (Bottom Left Poppy) - Scaled down, moved up and animated */}
          <motion.g
            initial={{ opacity: 0, x: -100, y: 100 }}
            animate={{ opacity: 1, x: activeOffset.x * 2.5, y: activeOffset.y * 2.5 }}
            transition={{ opacity: { duration: 1.5, ease: "easeOut", delay: 2.3 }, default: { type: "spring", stiffness: 45, damping: 25 } }}
          >
            <motion.g
              animate={{ y: [0, -15, 0], rotate: [0, -1, 1, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
              style={{ transformOrigin: "150px 700px" }}
            >
              <g transform="translate(20, 250) scale(0.40)">
                <g stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.4">
                   <path d="M -50,750 C 150,700 250,600 400,650" />
                   <path d="M 150,700 C 200,800 250,830 300,800" />
                </g>

                <g fill="currentColor">
                  <use href="#rose-flower" transform="translate(150, 700) scale(1.2) rotate(30)" />
                  <use href="#rose-flower" transform="translate(250, 600) scale(0.9) rotate(-20)" />
                  <use href="#rose-flower" transform="translate(400, 650) scale(1.1) rotate(50)" />
                  
                  <use href="#rose-flower" transform="translate(200, 800) scale(0.8) rotate(-40)" />
                  <use href="#rose-flower" transform="translate(300, 800) scale(1.1) rotate(15)" />
                  
                  <use href="#rose-flower" transform="translate(0, 730) scale(0.8) rotate(80)" />
                </g>
              </g>
            </motion.g>
          </motion.g>
        </svg>
      </motion.div>

      {/* Fade out gradient at the bottom of the hero section */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none" aria-hidden="true" />

      {/* Interactive Background Pattern */}
      <InteractiveDottedBackground multiplier={1.2} opacity="opacity-10" />
      
      {/* Subtle Glow mapped to mouse movement */}
      <motion.div 
        className="absolute w-[500px] h-[500px] rounded-full blur-[120px] bg-primary-container/20 pointer-events-none"
        animate={{ x: activeOffset.x * 10, y: activeOffset.y * 10 }}
        transition={{ type: "spring", stiffness: 40, damping: 20 }}
      />

      <div className="relative z-10 text-center max-w-4xl px-[20px] md:px-[64px]">
        <motion.div
          animate={{ x: activeOffset.x * 0.4, y: activeOffset.y * 0.4 }}
          transition={{ type: "spring", stiffness: 80, damping: 18 }}
        >
          <motion.div 
            className="font-display-lg text-display-lg text-on-surface block mb-6 transition-colors duration-500 select-none pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2.0, ease: "easeInOut" }}
          >
            <DisplacedText
              text="Polished Perfection"
              mousePos={absMousePos}
              className=""
              multiplier={1}
            />
            <br className="md:hidden" />
            <DisplacedText
              text=" by Joanna"
              mousePos={absMousePos}
              className="text-primary/90"
              multiplier={1.5}
            />
          </motion.div>
        </motion.div>
        
        <div className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto transition-colors duration-500 relative">
          <motion.div
            animate={{ x: activeOffset.x * 0.2, y: activeOffset.y * 0.2 }}
            transition={{ type: "spring", stiffness: 75, damping: 15 }}
          >
            {"Precision beauty. Relaxing experience. A curated sanctuary for the discerning client seeking flawless execution.".split("").map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ 
                  duration: 0.05, 
                  delay: 2.5 + (index * 0.015) 
                }}
              >
                {char}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </div>
    </header>
  );
};

export const About = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [gyroscope, setGyroscope] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.beta !== null && e.gamma !== null) {
        // e.gamma handles horizontal tilt (left/right) in degrees [-90, 90]
        // e.beta handles vertical tilt (front/back) in degrees [-180, 180]
        // Target: up to +/-22.5 offset. Map typical tilt range of +/-20deg to +/-22.5px.
        const tiltIntensity = 22.5; 
        const maxTiltAngle = 20;
        
        let tiltX = (e.gamma / maxTiltAngle) * tiltIntensity;
        // Assume typical device viewing tilt angle is around 50 degrees
        const normalizedBeta = e.beta - 50;
        let tiltY = (normalizedBeta / maxTiltAngle) * tiltIntensity;
        
        // Clamp values safely
        tiltX = Math.min(Math.max(tiltX, -tiltIntensity), tiltIntensity);
        tiltY = Math.min(Math.max(tiltY, -tiltIntensity), tiltIntensity);
        
        setGyroscope({ x: tiltX, y: tiltY });
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('deviceorientation', handleOrientation);
    }
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('deviceorientation', handleOrientation);
      }
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (typeof window !== 'undefined') {
      const rect = e.currentTarget.getBoundingClientRect();
      // Calculate cursor position relative to the center of this section component (reduced multiplier to 50%)
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 22.5;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 22.5;
      setMousePosition({ x, y });
    }
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
  };

  // Prioritize active mouse pointer position, fallback smoothly to mobile/tablet gyroscope sensors
  const activeOffset = (mousePosition.x !== 0 || mousePosition.y !== 0) 
    ? mousePosition 
    : gyroscope;

  return (
    <section 
      className="py-24 bg-surface-soft transition-colors duration-500 relative overflow-hidden" 
      id="about-polished-perfection"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
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
        </svg>
      </motion.div>

      <div className="max-w-[840px] mx-auto px-[20px] md:px-[40px] relative z-10">
        <div className="flex flex-col items-center text-center space-y-10">
          
          {/* Header block */}
          <Reveal className="space-y-4 w-full flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#C2185B]/10 text-primary text-xs font-semibold uppercase tracking-wider rounded-full">
              <Sparkles size={12} className="animate-pulse text-[#C2185B]" />
              <span className="text-[#C2185B] text-[10px] md:text-xs">Boutique Experience</span>
            </div>
            
            <h2 className="font-headline-lg text-headline-lg-mobile md:text-[36px] text-on-surface leading-tight tracking-tight transition-colors duration-500">
              Polished Perfection:<br />
              <span className="font-normal text-primary italic font-serif">Boutique Beauty in Piltown</span>
            </h2>
          </Reveal>

          {/* Image EXACTLY after title and before paragraph (Wavy, multi-layered organic border resembling the paper-cut attachment, with smooth cursor parallax) */}
          <Reveal className="w-full max-w-[720px] px-4 md:px-0 flex justify-center py-8">
            <div className="relative w-full aspect-[16/11] md:aspect-[16/10] max-w-[680px] flex items-center justify-center select-none pointer-events-none md:pointer-events-auto">
              
              {/* Outer Layer 1 - Wide organic background wave with inset shadow */}
              <motion.div 
                className="absolute inset-[0%] bg-surface-variant/35 dark:bg-surface-variant/10 shadow-[inset_3px_4px_10px_rgba(0,0,0,0.12)] transition-colors duration-500" 
                style={{ borderRadius: '54% 46% 65% 35% / 40% 64% 36% 60%' }}
                animate={{ x: activeOffset.x * -0.2, y: activeOffset.y * -0.2 }}
                transition={{ type: "spring", stiffness: 70, damping: 25 }}
              />
              
              {/* Layer 2 - Middle Wave Outer Nesting with inset shadow */}
              <motion.div 
                className="absolute inset-[3.5%] bg-surface/35 dark:bg-surface-soft/10 shadow-[inset_4px_6px_12px_rgba(0,0,0,0.15)] transition-colors duration-500" 
                style={{ borderRadius: '44% 56% 51% 49% / 52% 43% 57% 48%' }}
                animate={{ x: activeOffset.x * -0.5, y: activeOffset.y * -0.5 }}
                transition={{ type: "spring", stiffness: 85, damping: 22 }}
              />

              {/* Layer 3 - Middle Wave Inner Nesting with inset shadow */}
              <motion.div 
                className="absolute inset-[7%] bg-surface/55 dark:bg-surface-variant/15 shadow-[inset_6px_8px_16px_rgba(0,0,0,0.18)] transition-colors duration-500" 
                style={{ borderRadius: '58% 42% 45% 55% / 43% 58% 42% 57%' }}
                animate={{ x: activeOffset.x * -0.9, y: activeOffset.y * -0.9 }}
                transition={{ type: "spring", stiffness: 100, damping: 18 }}
              />

              {/* Layer 4 - Tight Organic Image Frame Canvas with inset shadow */}
              <motion.div 
                className="absolute inset-[11.5%] bg-surface/80 dark:bg-surface/20 shadow-[inset_8px_10px_20px_rgba(0,0,0,0.22)] transition-colors duration-500" 
                style={{ borderRadius: '48% 52% 52% 48% / 50% 48% 52% 50%' }}
                animate={{ x: activeOffset.x * -1.2, y: activeOffset.y * -1.2 }}
                transition={{ type: "spring", stiffness: 110, damping: 16 }}
              />

              {/* Layer 5 - Clean Organic Image Canvas with deep inset shadow and parallax motion */}
              <motion.div 
                className="absolute inset-[16%] overflow-hidden shadow-[inset_10px_12px_24px_rgba(0,0,0,0.30)] dark:shadow-[inset_10px_12px_24px_rgba(0,0,0,0.60)] group cursor-pointer" 
                style={{ borderRadius: '50% 50% 55% 45% / 50% 55% 45% 50%' }}
                animate={{ x: activeOffset.x * -1.5, y: activeOffset.y * -1.5 }}
                transition={{ type: "spring", stiffness: 120, damping: 14 }}
              >
                <img 
                  alt="Elegant salon interior with modern decor" 
                  className="w-full h-full object-cover object-center transition-transform duration-[1.2s] ease-out group-hover:scale-105 select-none pointer-events-none" 
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                />
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-500"></div>
                {/* Visual shadow layer overlay to ensure robust inner shadow presentation */}
                <div className="absolute inset-0 pointer-events-none shadow-[inset_10px_12px_24px_rgba(0,0,0,0.35)] mix-blend-multiply" />
              </motion.div>
            </div>
          </Reveal>

          {/* Description Paragraph */}
          <Reveal className="w-full max-w-[700px]">
            <p className="font-body-md text-base md:text-[17px] text-on-surface-variant leading-relaxed text-center">
              Founded by beauty expert Joanna, Polished Perfection serves Piltown and Carrick-on-Suir as a restorative sanctuary for editorial-grade aesthetics.
            </p>
          </Reveal>

          {/* Core Pillars - No borders, no boxes, standalone free icons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 w-full max-w-5xl pt-4">
            <Reveal>
              <div className="flex flex-col items-center text-center px-1 group">
                <Sparkles size={24} className="text-[#C2185B] mb-3 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="font-semibold text-on-surface text-base mb-1.5">Advanced Services</h3>
                <p className="text-sm text-on-surface-variant/90 leading-relaxed" style={{ width: "247.656px", maxWidth: "100%" }}>Clinical-grade facials, non-invasive body sculpting, and bespoke nail artistry.</p>
              </div>
            </Reveal>
 
            <Reveal>
              <div className="flex flex-col items-center text-center px-1 group">
                <Heart size={24} className="text-[#C2185B] mb-3 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="font-semibold text-on-surface text-base mb-1.5">Inclusive Facility</h3>
                <p className="text-sm text-on-surface-variant/90 leading-relaxed" style={{ width: "247.641px", maxWidth: "100%" }}>Fully wheelchair accessible and pet-friendly environment.</p>
              </div>
            </Reveal>
 
            <Reveal>
              <div className="flex flex-col items-center text-center px-1 group">
                <UserCheck size={24} className="text-[#C2185B] mb-3 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="font-semibold text-on-surface text-base mb-1.5">Client Focus</h3>
                <p className="text-sm text-on-surface-variant/90 leading-relaxed" style={{ width: "247.641px", maxWidth: "100%" }}>Precision techniques tailored for discerning individual needs.</p>
              </div>
            </Reveal>
          </div>

          {/* CTA & Reviews (NO line separator above) */}
          <Reveal className="pt-6 flex flex-col items-center gap-6 justify-center w-full">
            <a 
              href="https://www.fresha.com/a/polished-perfection-by-joanna-piltown-unit-g89y4cvr" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="cta-button btn-shine-effect inline-flex items-center justify-center bg-[#C2185B] text-white font-semibold text-base px-8 py-4 rounded-xl hover:opacity-95 active:scale-95 transition-all shadow-lg hover:shadow-[#C2185B]/25 text-center min-w-[220px]"
            >
              Book Your Appointment
            </a>

            {/* Stats list */}
            <div className="flex items-center gap-8 pt-2">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1">
                  <span className="font-display-lg text-2xl font-bold text-on-surface leading-none">5.0</span>
                  <Star size={16} className="text-[#C2185B] fill-[#C2185B]" />
                </div>
                <span className="text-[10px] uppercase tracking-wider font-semibold text-on-surface-variant/75 mt-1 block">Rating</span>
              </div>
              
              <div className="w-px h-8 bg-outline-variant/30"></div>
              
              <div className="text-center">
                <span className="font-display-lg text-2xl font-bold text-on-surface leading-none block">244+</span>
                <span className="text-[10px] uppercase tracking-wider font-semibold text-on-surface-variant/75 mt-1 block">5-Star Reviews</span>
              </div>
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
};
