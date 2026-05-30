import React, { useState, useEffect } from 'react';
import { Reveal, InteractiveDottedBackground } from './Blocks';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronRight } from 'lucide-react';
import { useAdaptiveParallax } from '../hooks/useParallax';

const teamMembers = [
  {
    name: "Joanna",
    role: "Founder & Lead Aesthetician",
    desc: "I’m Joanna. With 28 years of experience, I’ve dedicated my career to mastering the art of beauty—specifically precision lash styling and creative nail design. Since opening my salon in 2019, I’ve focused on creating a space where technical expertise meets a warm, home-like experience for every client who walks through our doors.",
    img: "https://images.unsplash.com/photo-1595959183082-7b570b7e08e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    expandedData: {
      title: "My Professional Path: 28 Years of Passion",
      story: "Expertise and continuous learning are the pillars of my career. After graduating from Beauty College, I spent nearly three decades refining my skills. While I started as a general beautician, I found my true calling in the intricate, artistic world of nails and lashes. Over the last 14 years, I’ve specialized in lash styling, constantly updating my techniques to stay at the forefront of beauty trends. For me, it’s not just about the service; it’s about providing high-standard, safe, and beautiful results every single time.",
      milestones: [
        { title: "Beauty College Graduate", time: "28 Years", focus: "Foundations & Aesthetic Theory" },
        { title: "Advanced Lash Stylist", time: "14 Years", focus: "Precision Volume, Hybrid, & Classic Lashes" },
        { title: "Salon Founder", time: "Since 2019", focus: "Client Experience & Team Leadership" }
      ]
    }
  },
  {
    name: "Lynda",
    role: "Senior Massage Therapist",
    desc: "I'm Lynda. With 19 years of industry experience, I specialize in advanced massage therapy and clinical microneedling. At Polished Perfection, I deliver tailored beauty and wellness treatments designed to help you reach your individual health and aesthetic goals in a relaxing, professional setting.",
    img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80",
    expandedData: {
      title: "My 19-Year Professional Journey in Beauty Therapy",
      story: "Beauty therapy is my lifelong passion. Since beginning my career 19 years ago, I have dedicated myself to mastering the nuances of holistic skin health and body wellness. While I am fully qualified in all aspects of beauty services, I have refined my expertise specifically into massage and microneedling—two areas where I see the most transformative results for my clients. For the last three years, I have proudly brought this experience to Polished Perfection, focusing on creating a serene environment where high-quality treatment meets genuine, friendly service. My philosophy is simple: every person is unique, and every treatment should be as well.",
      milestonesTitle: "Core Areas of Expertise",
      milestonesSubtitle: "Technical proficiency and specialized training define the care I provide. By focusing on evidence-based therapies, I ensure that every appointment is safe, effective, and aligned with your personal skincare or wellness objectives.",
      milestones: [
        { title: "Microneedling", time: "Advanced", focus: "Collagen induction, skin texture, and rejuvenation." },
        { title: "Massage Therapy", time: "19 Years", focus: "Therapeutic relaxation, stress relief, and muscular health." },
        { title: "Beauty Therapy", time: "19 Years", focus: "Full-spectrum aesthetic care and maintenance." }
      ]
    }
  },
  {
    name: "Grace",
    role: "Master Nail Technician",
    desc: "I’m Grace, a core member of the team with over three years of experience at our salon. I specialize in precision nail styling, backed by two years of professional beauty training. My passion is helping you leave the salon feeling polished, confident, and genuinely well-cared for.",
    img: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    expandedData: {
      title: "My Journey in Beauty",
      story: "Hi there! I’m Grace. I’ve been a part of this amazing salon family for over three years now, and every day is a chance for me to focus on what I love most: helping my clients look and feel their absolute best. Before joining the team full-time, I completed two years of intensive professional beauty training, which gave me the technical foundation I need to turn your nail ideas into reality.\n\nI believe that beauty is in the details. Whether you are looking for a simple, elegant manicure or something more creative and intricate, I approach every appointment with the same level of care and attention. For me, it’s not just about the final look; it’s about making sure your time in my chair is friendly, relaxing, and exactly what you needed to feel like \"you\" again.",
      milestonesTitle: "My Professional Focus & Credentials",
      milestonesSubtitle: "Technical precision defines my work. I have spent the last three years refining my technique to ensure that every set of nails I finish is durable, healthy, and perfectly styled to match your aesthetic.",
      milestones: [
        { title: "Professional Training", time: "2 Years", focus: "Advanced Nail Theory & Application" },
        { title: "Salon Experience", time: "3+ Years", focus: "Client Care & Precision Styling" },
        { title: "Specialization", time: "Expert", focus: "Custom Nail Art & Maintenance" }
      ]
    }
  },
  {
    name: "Charlene",
    role: "Aesthetic Nurse & Skin Specialist",
    desc: "I’m Charlene. I bring a medical aesthetic approach to our salon, specializing in advanced skincare and non-surgical procedures. My goal is to enhance your natural beauty safely and effectively.",
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
    expandedData: {
      title: "My Passion for Advanced Skincare",
      story: "With a background in nursing, I focus on the scientific and medical aspects of beauty. I've spent years developing my skills in skin rejuvenation, injectables, and tailored skin health plans. My approach is holistic—ensuring that you not only look refreshed but feel confident your skin is at its absolute healthiest.",
      milestonesTitle: "Clinical Expertise",
      milestonesSubtitle: "Trained in medical aesthetics, providing safe, result-driven procedures.",
      milestones: [
        { title: "Nursing Background", time: "10 Years", focus: "Medical & Patient Care" },
        { title: "Aesthetics Certification", time: "5 Years", focus: "Advanced Injectables & Needling" },
        { title: "Skin Health", time: "Expert", focus: "Dermal Fillers & Skin Boosters" }
      ]
    }
  }
];

export const Team = () => {
  const [activeMemberIndex, setActiveMemberIndex] = useState<number | null>(null);
  const activeOffset = useAdaptiveParallax(0.8);

  useEffect(() => {
    if (activeMemberIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    }
  }, [activeMemberIndex]);

  const activeMember = activeMemberIndex !== null ? teamMembers[activeMemberIndex] : null;

  return (
    <section className="py-32 bg-background transition-colors duration-500 relative overflow-hidden" id="team">
      {/* Interactive Background Pattern */}
      <InteractiveDottedBackground multiplier={0.8} opacity="opacity-[0.06] dark:opacity-[0.04]" />

      {/* Background Sakura Branch Illustrations */}
      <motion.div 
        className="absolute top-0 right-0 pointer-events-none select-none text-[#c2185b] opacity-[0.12] z-0"
        animate={{ x: activeOffset.x * 0.8, y: activeOffset.y * 0.8 }}
        transition={{ type: "spring", stiffness: 75, damping: 15 }}
      >
        <svg width="220" height="240" viewBox="0 0 220 240" fill="currentColor">
          <path d="M 220 40 Q 150 50 110 110" stroke="currentColor" strokeWidth="2.5" fill="none" />
          <path d="M 170 45 Q 140 30 115 35" stroke="currentColor" strokeWidth="1.5" fill="none" />
          <path d="M 130 80 Q 90 70 70 85" stroke="currentColor" strokeWidth="1.5" fill="none" />
          <g transform="translate(110, 110) scale(0.9)">
            <path d="M0,0 C-6,-9 -9,-17 -4,-22 C-2,-24 0,-21 0,-19 C0,-21 2,-24 4,-22 C9,-17 6,-9 0,0 Z" />
            <path d="M0,0 C-6,-9 -9,-17 -4,-22 C-2,-24 0,-21 0,-19 C0,-21 2,-24 4,-22 C9,-17 6,-9 0,0 Z" transform="rotate(72)"/>
            <path d="M0,0 C-6,-9 -9,-17 -4,-22 C-2,-24 0,-21 0,-19 C0,-21 2,-24 4,-22 C9,-17 6,-9 0,0 Z" transform="rotate(144)"/>
            <path d="M0,0 C-6,-9 -9,-17 -4,-22 C-2,-24 0,-21 0,-19 C0,-21 2,-24 4,-22 C9,-17 6,-9 0,0 Z" transform="rotate(216)"/>
            <path d="M0,0 C-6,-9 -9,-17 -4,-22 C-2,-24 0,-21 0,-19 C0,-21 2,-24 4,-22 C9,-17 6,-9 0,0 Z" transform="rotate(288)"/>
          </g>
          <g transform="translate(115, 35) scale(0.7)">
            <path d="M0,0 C-6,-9 -9,-17 -4,-22 C-2,-24 0,-21 0,-19 C0,-21 2,-24 4,-22 C9,-17 6,-9 0,0 Z" />
            <path d="M0,0 C-6,-9 -9,-17 -4,-22 C-2,-24 0,-21 0,-19 C0,-21 2,-24 4,-22 C9,-17 6,-9 0,0 Z" transform="rotate(72)"/>
            <path d="M0,0 C-6,-9 -9,-17 -4,-22 C-2,-24 0,-21 0,-19 C0,-21 2,-24 4,-22 C9,-17 6,-9 0,0 Z" transform="rotate(144)"/>
            <path d="M0,0 C-6,-9 -9,-17 -4,-22 C-2,-24 0,-21 0,-19 C0,-21 2,-24 4,-22 C9,-17 6,-9 0,0 Z" transform="rotate(216)"/>
            <path d="M0,0 C-6,-9 -9,-17 -4,-22 C-2,-24 0,-21 0,-19 C0,-21 2,-24 4,-22 C9,-17 6,-9 0,0 Z" transform="rotate(288)"/>
          </g>
          <g transform="translate(70, 85) scale(0.6)">
            <path d="M0,0 C-6,-9 -9,-17 -4,-22 C-2,-24 0,-21 0,-19 C0,-21 2,-24 4,-22 C9,-17 6,-9 0,0 Z" />
            <path d="M0,0 C-6,-9 -9,-17 -4,-22 C-2,-24 0,-21 0,-19 C0,-21 2,-24 4,-22 C9,-17 6,-9 0,0 Z" transform="rotate(72)"/>
            <path d="M0,0 C-6,-9 -9,-17 -4,-22 C-2,-24 0,-21 0,-19 C0,-21 2,-24 4,-22 C9,-17 6,-9 0,0 Z" transform="rotate(144)"/>
            <path d="M0,0 C-6,-9 -9,-17 -4,-22 C-2,-24 0,-21 0,-19 C0,-21 2,-24 4,-22 C9,-17 6,-9 0,0 Z" transform="rotate(216)"/>
            <path d="M0,0 C-6,-9 -9,-17 -4,-22 C-2,-24 0,-21 0,-19 C0,-21 2,-24 4,-22 C9,-17 6,-9 0,0 Z" transform="rotate(288)"/>
          </g>
        </svg>
      </motion.div>

      <motion.div 
        className="absolute bottom-0 left-0 pointer-events-none select-none text-[#c2185b] opacity-[0.12] z-0"
        animate={{ x: activeOffset.x * -0.8, y: activeOffset.y * -0.8 }}
        transition={{ type: "spring", stiffness: 75, damping: 15 }}
      >
        <svg width="240" height="200" viewBox="0 0 240 200" fill="currentColor">
          <path d="M 0 160 Q 70 150 120 110" stroke="currentColor" strokeWidth="2.5" fill="none" />
          <path d="M 50 155 Q 80 170 120 155" stroke="currentColor" strokeWidth="1.5" fill="none" />
          <path d="M 90 130 Q 130 140 160 125" stroke="currentColor" strokeWidth="1.5" fill="none" />
          <g transform="translate(120, 110) scale(0.9)">
            <path d="M0,0 C-6,-9 -9,-17 -4,-22 C-2,-24 0,-21 0,-19 C0,-21 2,-24 4,-22 C9,-17 6,-9 0,0 Z" />
            <path d="M0,0 C-6,-9 -9,-17 -4,-22 C-2,-24 0,-21 0,-19 C0,-21 2,-24 4,-22 C9,-17 6,-9 0,0 Z" transform="rotate(72)"/>
            <path d="M0,0 C-6,-9 -9,-17 -4,-22 C-2,-24 0,-21 0,-19 C0,-21 2,-24 4,-22 C9,-17 6,-9 0,0 Z" transform="rotate(144)"/>
            <path d="M0,0 C-6,-9 -9,-17 -4,-22 C-2,-24 0,-21 0,-19 C0,-21 2,-24 4,-22 C9,-17 6,-9 0,0 Z" transform="rotate(216)"/>
            <path d="M0,0 C-6,-9 -9,-17 -4,-22 C-2,-24 0,-21 0,-19 C0,-21 2,-24 4,-22 C9,-17 6,-9 0,0 Z" transform="rotate(288)"/>
          </g>
          <g transform="translate(120, 155) scale(0.8)">
            <path d="M0,0 C-6,-9 -9,-17 -4,-22 C-2,-24 0,-21 0,-19 C0,-21 2,-24 4,-22 C9,-17 6,-9 0,0 Z" />
            <path d="M0,0 C-6,-9 -9,-17 -4,-22 C-2,-24 0,-21 0,-19 C0,-21 2,-24 4,-22 C9,-17 6,-9 0,0 Z" transform="rotate(72)"/>
            <path d="M0,0 C-6,-9 -9,-17 -4,-22 C-2,-24 0,-21 0,-19 C0,-21 2,-24 4,-22 C9,-17 6,-9 0,0 Z" transform="rotate(144)"/>
            <path d="M0,0 C-6,-9 -9,-17 -4,-22 C-2,-24 0,-21 0,-19 C0,-21 2,-24 4,-22 C9,-17 6,-9 0,0 Z" transform="rotate(216)"/>
            <path d="M0,0 C-6,-9 -9,-17 -4,-22 C-2,-24 0,-21 0,-19 C0,-21 2,-24 4,-22 C9,-17 6,-9 0,0 Z" transform="rotate(288)"/>
          </g>
          <g transform="translate(160, 125) scale(0.7)">
            <path d="M0,0 C-6,-9 -9,-17 -4,-22 C-2,-24 0,-21 0,-19 C0,-21 2,-24 4,-22 C9,-17 6,-9 0,0 Z" />
            <path d="M0,0 C-6,-9 -9,-17 -4,-22 C-2,-24 0,-21 0,-19 C0,-21 2,-24 4,-22 C9,-17 6,-9 0,0 Z" transform="rotate(72)"/>
            <path d="M0,0 C-6,-9 -9,-17 -4,-22 C-2,-24 0,-21 0,-19 C0,-21 2,-24 4,-22 C9,-17 6,-9 0,0 Z" transform="rotate(144)"/>
            <path d="M0,0 C-6,-9 -9,-17 -4,-22 C-2,-24 0,-21 0,-19 C0,-21 2,-24 4,-22 C9,-17 6,-9 0,0 Z" transform="rotate(216)"/>
            <path d="M0,0 C-6,-9 -9,-17 -4,-22 C-2,-24 0,-21 0,-19 C0,-21 2,-24 4,-22 C9,-17 6,-9 0,0 Z" transform="rotate(288)"/>
          </g>
        </svg>
      </motion.div>

      <Reveal className="max-w-[1280px] mx-auto px-[20px] md:px-[64px] relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-[30px] text-on-surface mb-4 transition-colors duration-500">Meet Joanna &amp; the Team</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto transition-colors duration-500">Skilled hands. Warm hearts.</p>
        </div>
        <div className="flex flex-col gap-20 md:gap-32">
          {/* Joanna - Prominent */}
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
            <div className="w-full md:w-1/2 shrink-0 flex justify-center md:justify-end">
               <motion.div 
                 className="w-72 h-72 md:w-full md:max-w-md md:h-[500px] overflow-hidden shadow-2xl relative group cursor-pointer" 
                 style={{ 
                   borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
                   perspective: 1000,
                   transformStyle: 'preserve-3d'
                 }} 
                 onClick={() => setActiveMemberIndex(0)}
                 animate={{
                   x: activeOffset.x * 1.2,
                   y: activeOffset.y * 1.2,
                   rotateY: activeOffset.x * 0.8,
                   rotateX: -activeOffset.y * 0.8,
                 }}
                 transition={{ type: "spring", stiffness: 75, damping: 15 }}
               >
                 <motion.img 
                   alt={teamMembers[0].name} 
                   className="w-full h-full object-cover origin-center" 
                   src={teamMembers[0].img} 
                   animate={{ 
                     x: activeOffset.x * -1.8, 
                     y: activeOffset.y * -1.8,
                     scale: 1.15
                   }}
                   whileHover={{ scale: 1.2 }}
                   transition={{ type: "spring", stiffness: 75, damping: 15 }}
                 />
                 <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-500 pointer-events-none"></div>
               </motion.div>
            </div>
            <div className="w-full md:w-1/2 text-center md:text-left flex flex-col items-center md:items-start group">
              <h3 className="font-headline-lg text-headline-md md:text-display-lg text-[30px] mb-2 text-on-surface">{teamMembers[0].name}</h3>
              <p className="font-label-lg text-label-lg mb-6 uppercase tracking-widest text-primary">{teamMembers[0].role}</p>
              <div className="w-12 h-1 bg-primary mb-8 rounded-full mx-auto md:mx-0"></div>
              <p className="font-body-lg text-body-lg mb-10 text-on-surface-variant max-w-xl">{teamMembers[0].desc}</p>
              
              <button 
                onClick={() => setActiveMemberIndex(0)}
                className="flex items-center justify-center gap-2 hover:gap-4 transition-all font-label-md uppercase tracking-wider text-sm outline-none text-primary group-hover:text-primary/80"
              >
                Read Joanna's Story
                <ChevronRight className="w-5 h-5 flex-shrink-0" />
              </button>
            </div>
          </div>

          {/* The Rest of the Team */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-12 w-full">
            {teamMembers.slice(1).map((member, i) => (
              <div key={i + 1} className="text-center group flex flex-col items-center">
                <motion.div 
                  className="w-36 h-36 md:w-40 md:h-40 mx-auto overflow-hidden mb-8 shadow-xl cursor-pointer relative" 
                  style={{ 
                    borderRadius: i % 2 === 0 ? '50% 50% 20% 80% / 25% 80% 20% 75%' : '60% 40% 30% 70% / 60% 30% 70% 40%',
                    perspective: 1000,
                    transformStyle: 'preserve-3d'
                  }} 
                  onClick={() => setActiveMemberIndex(i + 1)}
                  animate={{
                    x: activeOffset.x * 1.2,
                    y: activeOffset.y * 1.2,
                    rotateY: activeOffset.x * 0.8,
                    rotateX: -activeOffset.y * 0.8,
                  }}
                  transition={{ type: "spring", stiffness: 75, damping: 15 }}
                >
                  <motion.img 
                    alt={member.name} 
                    className="w-full h-full object-cover origin-center" 
                    src={member.img} 
                    animate={{ 
                      x: activeOffset.x * -1.8, 
                      y: activeOffset.y * -1.8,
                      scale: 1.15
                    }}
                    whileHover={{ scale: 1.2 }}
                    transition={{ type: "spring", stiffness: 75, damping: 15 }}
                  />
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-500 pointer-events-none"></div>
                </motion.div>
                <h3 className="font-headline-sm text-title-lg text-[25px] mb-1 text-on-surface">{member.name}</h3>
                <p className="font-label-md text-label-md mb-4 uppercase tracking-wider text-primary">{member.role}</p>
                <p className="font-body-md text-body-md transition-colors duration-500 flex-1 text-on-surface-variant line-clamp-4 max-w-sm">{member.desc}</p>
                
                <button 
                  onClick={() => setActiveMemberIndex(i + 1)}
                  className="mt-6 flex items-center justify-center gap-1 hover:gap-3 transition-all font-label-md uppercase tracking-wider text-xs outline-none text-on-surface hover:text-primary"
                >
                  Meet {member.name}
                  <ChevronRight className="w-4 h-4 flex-shrink-0" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Modal */}
      <AnimatePresence>
        {activeMember && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 md:px-0">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-background/80 backdrop-blur-md"
              onClick={() => setActiveMemberIndex(null)}
            />
            
            <motion.div 
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.4, type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-surface-container-lowest rounded-3xl shadow-2xl z-10 flex flex-col md:flex-row border border-outline-variant/30"
            >
              <button 
                onClick={() => setActiveMemberIndex(null)}
                className="absolute top-4 right-4 z-20 p-2 bg-black/20 md:bg-transparent backdrop-blur-md md:backdrop-blur-none hover:bg-black/30 md:hover:bg-surface-variant rounded-full text-white md:text-on-surface transition-colors"
                aria-label="Close modal"
              >
                <X className="w-6 h-6" />
              </button>
              
              <div className="w-full md:w-2/5 h-[300px] md:h-auto shrink-0 relative">
                 <img alt={activeMember.name} className="absolute inset-0 w-full h-full object-cover" src={activeMember.img} />
                 <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-surface-container-lowest"></div>
              </div>
              
              <div className="flex-1 p-8 md:p-12 relative z-10">
                <h4 className="font-headline-md text-headline-sm md:text-headline-md text-on-surface mb-2">{activeMember.expandedData.title}</h4>
                <div className="w-12 h-1 bg-primary mb-6 rounded-full"></div>
                
                <p className="font-body-md text-on-surface-variant mb-10 leading-relaxed font-medium whitespace-pre-wrap">
                  {activeMember.expandedData.story}
                </p>
                
                <h5 className="font-headline-sm text-title-lg text-on-surface mb-6">
                  {(activeMember.expandedData as any).milestonesTitle || "My Career Milestones"}
                </h5>
                {(activeMember.expandedData as any).milestonesSubtitle && (
                  <p className="font-body-sm text-on-surface-variant mb-6 leading-relaxed">
                    {(activeMember.expandedData as any).milestonesSubtitle}
                  </p>
                )}
                <div className="space-y-4">
                  {activeMember.expandedData.milestones.map((milestone, i) => (
                    <div key={i} className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4 p-4 rounded-xl bg-surface-variant border border-outline-variant/30">
                       <div className="md:w-1/3 flex items-center shrink-0">
                          <span className="font-label-lg font-bold text-primary text-sm md:text-base">{milestone.time}</span>
                       </div>
                       <div className="flex-1">
                          <p className="font-body-lg text-on-surface font-bold">{milestone.title}</p>
                          <p className="font-body-sm text-on-surface-variant text-sm mt-1">{milestone.focus}</p>
                       </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
