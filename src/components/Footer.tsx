import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Reveal, InteractiveDottedBackground } from './Blocks';
import { useAdaptiveParallax } from '../hooks/useParallax';
import { CheckCircle2, CreditCard, Dog, Baby, Accessibility, Car, Bus, UserCheck, Calendar, Users, Gift } from 'lucide-react';

const hours = [
  { day: 'Monday', time: '9:00 AM - 6:00 PM' },
  { day: 'Tuesday', time: '9:00 AM - 6:00 PM' },
  { day: 'Wednesday', time: '9:00 AM - 6:00 PM' },
  { day: 'Thursday', time: '9:00 AM - 6:00 PM' },
  { day: 'Friday', time: '9:00 AM - 6:00 PM' },
  { day: 'Saturday', time: '9:00 AM - 3:00 PM' },
];

const features = [
  { text: 'Instant confirmation', icon: <CheckCircle2 className="w-5 h-5" /> },
  { text: 'Pay by app', icon: <CreditCard className="w-5 h-5" /> },
  { text: 'Pet-friendly', icon: <Dog className="w-5 h-5" /> },
  { text: 'Kid-friendly', icon: <Baby className="w-5 h-5" /> },
  { text: 'Wheelchair accessible', icon: <Accessibility className="w-5 h-5" /> },
  { text: 'Parking available', icon: <Car className="w-5 h-5" /> },
  { text: 'Near public transport', icon: <Bus className="w-5 h-5" /> },
  { text: 'Woman-owned', icon: <UserCheck className="w-5 h-5" /> },
];

export const CTA = () => {
  return (
    <section className="pt-20 pb-8 bg-surface-soft transition-colors duration-500 relative overflow-hidden" id="book">
      {/* Interactive Background Pattern */}
      <InteractiveDottedBackground multiplier={0.8} opacity="opacity-[0.06] dark:opacity-[0.04]" />
      
      <Reveal className="max-w-5xl mx-auto px-[20px] md:px-[64px] text-center mb-10 relative z-10">
        <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-[30px] mb-6 transition-colors duration-500 text-on-surface">Ready to treat yourself & your loved one?</h2>
        <p className="font-body-lg text-body-lg mb-10 text-on-surface-variant transition-colors duration-500">Book your appointment online with instant confirmation.</p>
        <div className="flex flex-col sm:flex-row sm:flex-nowrap justify-center items-center gap-4">
          <a 
            className="inline-flex items-center justify-center gap-2 btn-shine-effect bg-[#c2185b] text-white font-label-lg text-label-lg px-8 py-4 rounded-lg hover:opacity-90 hover:scale-[1.02] active:scale-95 transition-all shadow-xl w-full sm:w-auto text-center sm:whitespace-nowrap" 
            href="https://www.fresha.com/a/polished-perfection-by-joanna-piltown-unit-g89y4cvr/booking?allOffer=true&entryPoint=all_offer_book_individual_appointment" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <Calendar className="w-5 h-5 shrink-0" />
            <span>Book an appointment</span>
          </a>
          <a 
            className="inline-flex items-center justify-center gap-2 btn-shine-effect bg-[#c2185b] text-white font-label-lg text-label-lg px-8 py-4 rounded-lg hover:opacity-90 hover:scale-[1.02] active:scale-95 transition-all shadow-xl w-full sm:w-auto text-center sm:whitespace-nowrap" 
            href="https://www.fresha.com/a/polished-perfection-by-joanna-piltown-unit-g89y4cvr/booking?allOffer=true&groupBooking=true&entryPoint=all_offer_book_group_appointment" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <Users className="w-5 h-5 shrink-0" />
            <span>Book group appointment</span>
          </a>
          <a 
            className="inline-flex items-center justify-center gap-2 btn-shine-effect bg-[#c2185b] text-white font-label-lg text-label-lg px-8 py-4 rounded-lg hover:opacity-90 hover:scale-[1.02] active:scale-95 transition-all shadow-xl w-full sm:w-auto text-center sm:whitespace-nowrap" 
            href="https://www.fresha.com/a/polished-perfection-by-joanna-piltown-unit-g89y4cvr/gift-cards" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <Gift className="w-5 h-5 shrink-0" />
            <span>Send a gift</span>
          </a>
        </div>
      </Reveal>

      <div className="w-full overflow-hidden mt-4">
        <Reveal>
          <div className="w-full relative py-4">
            {/* Luxury fluid edge fades */}
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-surface-soft to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-surface-soft to-transparent z-10 pointer-events-none" />
            
            <motion.div 
              className="flex items-center gap-0 w-max whitespace-nowrap"
              animate={{ x: ["0%", "-25%"] }}
              transition={{
                ease: "linear",
                duration: 25,
                repeat: Infinity,
              }}
            >
              {[...features, ...features, ...features, ...features].map((feature, i) => (
                <div key={i} className="flex items-center shrink-0 pr-8 gap-8">
                  <div className="flex items-center gap-2 select-none">
                    <div className="w-4 h-4 flex justify-center items-center text-zinc-500 dark:text-primary">
                      {React.cloneElement(feature.icon as React.ReactElement, { className: "w-4 h-4" })}
                    </div>
                    <span className="text-zinc-600 dark:text-on-surface text-sm font-semibold">{feature.text}</span>
                  </div>
                  {/* Centered fine vertical separator line */}
                  <div className="w-px h-4 bg-zinc-300 dark:bg-outline-variant/30 shrink-0 select-none" />
                </div>
              ))}
            </motion.div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export const Footer = () => {
  const currentDayIndex = new Date().getDay();
  
  const mapDayIndex = (index: number) => {
    return index === 0 ? 6 : index - 1;
  };
  
  const todayIndex = mapDayIndex(currentDayIndex);
  const activeOffset = useAdaptiveParallax(0.8);
  
  return (
    <footer 
      className="relative bg-surface-container-lowest w-full pt-8 pb-16 transition-colors duration-500 border-t-0 overflow-hidden"
    >
      {/* Interactive Background Pattern */}
      <InteractiveDottedBackground multiplier={0.8} opacity="opacity-[0.06] dark:opacity-[0.04]" />

      {/* Sakura Illustration Background (Oriented from Bottom) */}
      <motion.div 
        className="absolute inset-0 z-0 pointer-events-none text-primary" 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.12, x: activeOffset.x * -1, y: activeOffset.y * -1 }}
        transition={{ opacity: { duration: 1.5, ease: "easeOut" }, default: { type: "spring", stiffness: 60, damping: 20 } }}
      >
        <svg className="w-full h-full text-[#c2185b]" preserveAspectRatio="xMidYMax slice" viewBox="0 0 1200 800" xmlns="http://www.w3.org/2000/svg">
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
          
          <motion.g
            initial={{ opacity: 0, x: 100, y: 100 }}
            animate={{ opacity: 1, x: activeOffset.x * 1.5, y: activeOffset.y * 1.5 }}
            transition={{ opacity: { duration: 1.5, ease: "easeOut" }, default: { type: "spring", stiffness: 40, damping: 20 } }}
          >
            <motion.g
              animate={{ rotate: [0, 2, -1, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              style={{ transformOrigin: "1000px 700px" }}
            >
              <g transform="translate(475, 750) scale(0.5, -0.5)">
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
          
          <motion.g
            initial={{ opacity: 0, x: -100, y: 100 }}
            animate={{ opacity: 1, x: activeOffset.x * 2.5, y: activeOffset.y * 2.5 }}
            transition={{ opacity: { duration: 1.5, ease: "easeOut" }, default: { type: "spring", stiffness: 45, damping: 25 } }}
          >
            <motion.g
              animate={{ rotate: [0, -2, 1, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              style={{ transformOrigin: "150px 700px" }}
            >
              <g transform="translate(20, 450) scale(0.40)">
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

      <div className="relative z-10 max-w-[1280px] mx-auto px-[20px] md:px-[64px]">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-stretch">
          <div className="w-full lg:w-[180px] min-h-[220px] overflow-hidden shadow-sm relative shrink-0 rounded-2xl filter grayscale hover:grayscale-0 active:grayscale-0 focus-within:grayscale-0 transition-all duration-500">
             <iframe 
               src="https://maps.google.com/maps?q=Unit%202%2C%20Banagher%20Court%2C%20Piltown&t=&z=15&ie=UTF8&iwloc=&output=embed" 
               style={{ border: 0, width: '100%', height: '100%' }} 
               allowFullScreen={false} 
               loading="lazy" 
               referrerPolicy="no-referrer-when-downgrade"
               className="absolute inset-0 w-full h-full"
               title="Location Map"
            ></iframe>
          </div>
          <div className="w-full lg:flex-1 lg:max-w-xl flex-none lg:pr-8 flex flex-col justify-between py-2">
            <div>
              <span className="font-display-lg text-headline-md text-primary block mb-4 transition-colors duration-500">Polished Perfection</span>
              <p className="font-body-md text-body-md text-on-surface-variant transition-colors duration-500 leading-relaxed">Unit 2, Banagher Court, Piltown, Co. Kilkenny, Ireland. Precision beauty and relaxing experiences in a bespoke sanctuary.</p>
            </div>
          </div>
          
          <div className="flex-1 w-full lg:max-w-[350px] flex flex-col py-2">
            <h3 className="font-display-lg text-headline-md text-on-surface mb-4 transition-colors duration-500">Opening times</h3>
            <div className="space-y-3 font-body-md text-on-surface-variant flex-1 flex flex-col justify-between">
              {hours.map((item, i) => {
                const isToday = i === todayIndex;
                return (
                  <div key={item.day} className={`flex justify-between items-center ${isToday ? 'font-bold text-[#74c365]' : ''}`}>
                    <div className="flex items-center gap-2">
                       <span className={`w-2 h-2 rounded-full ${item.time === 'Closed' ? 'bg-outline-variant' : 'bg-[#74c365]'}`}></span>
                       <span>{item.day}</span>
                    </div>
                    <span>{item.time}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-[1280px] mx-auto px-[20px] md:px-[64px] mt-16 flex flex-col md:flex-row justify-between items-center md:items-start gap-4 text-center md:text-left">
        <p className="font-body-md text-label-md text-on-surface-variant transition-colors duration-500">© 2026 Polished Perfection by Joanna. All rights reserved.</p>
        <div className="flex flex-wrap items-center justify-center gap-6 font-label-md text-label-md">
          <a className="text-on-surface-variant hover:text-primary transition-colors hover:underline decoration-primary" href="#">Privacy Policy</a>
          <a className="text-on-surface-variant hover:text-primary transition-colors hover:underline decoration-primary" href="#">Terms of Service</a>
        </div>
        <a className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors" href="https://valhaxa.com" target="_blank" rel="noopener noreferrer">Website by ValhaXa</a>
      </div>
    </footer>
  );
};
