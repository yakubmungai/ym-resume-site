/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useMotionValue, useSpring } from 'motion/react';
import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    
    const colors = ['#4285F4', '#EA4335', '#FBBC05', '#34A853', '#8A2BE2', '#F27D26'];

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      length: number;
      thickness: number;
      color: string;
      angle: number;
      
      wanderStrength: number;
      wanderAngle: number;
      friction: number;

      constructor(width: number, height: number) {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 1;
        this.vy = (Math.random() - 0.5) * 1;
        this.length = Math.random() * 4 + 2;
        this.thickness = Math.random() * 1.5 + 0.5;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.angle = 0;
        
        this.wanderStrength = Math.random() * 0.015 + 0.005;
        this.wanderAngle = Math.random() * Math.PI * 2;
        this.friction = Math.random() * 0.02 + 0.96;
      }

      draw() {
        if (!ctx) return;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.roundRect(-this.length / 2, -this.thickness / 2, this.length, this.thickness, this.thickness / 2);
        ctx.fill();
        ctx.restore();
      }

      update(targetMouse: { x: number, y: number }, width: number, height: number) {
        // Calculate distance FROM mouse TO particle for repulsion
        const dx = this.x - targetMouse.x;
        const dy = this.y - targetMouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        let ax = 0;
        let ay = 0;
        
        // Repel logic: push away if within a certain radius
        const repelRadius = 50;
        if (dist < repelRadius && dist > 0) {
          const force = (repelRadius - dist) / repelRadius; // 0 to 1, stronger closer to mouse
          const repelStrength = 0.05;
          ax += (dx / dist) * force * repelStrength;
          ay += (dy / dist) * force * repelStrength;
        }
        
        // Organic wandering
        this.wanderAngle += (Math.random() - 0.5) * 0.1;
        ax += Math.cos(this.wanderAngle) * this.wanderStrength;
        ay += Math.sin(this.wanderAngle) * this.wanderStrength;
        
        this.vx += ax;
        this.vy += ay;
        
        this.vx *= this.friction;
        this.vy *= this.friction;
        
        this.x += this.vx;
        this.y += this.vy;
        
        // Wrap around screen to keep them scattered across the entire page
        if (this.x < -20) this.x = width + 20;
        if (this.x > width + 20) this.x = -20;
        if (this.y < -20) this.y = height + 20;
        if (this.y > height + 20) this.y = -20;
        
        const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
        if (speed > 0.05) {
          // Smoothly interpolate angle to avoid jitter
          const targetAngle = Math.atan2(this.vy, this.vx);
          let diff = targetAngle - this.angle;
          while (diff < -Math.PI) diff += Math.PI * 2;
          while (diff > Math.PI) diff -= Math.PI * 2;
          this.angle += diff * 0.1;
        }
      }
    }

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles = [];
      const numberOfParticles = Math.floor((canvas.width * canvas.height) / 8000); 
      for (let i = 0; i < numberOfParticles; i++) {
        particles.push(new Particle(canvas.width, canvas.height));
      }
    };

    let targetMouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    const handleMouseMove = (e: MouseEvent) => {
      targetMouse.x = e.clientX;
      targetMouse.y = e.clientY;
    };

    const handleResize = () => {
      init();
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    init();

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particles.length; i++) {
        particles[i].update(targetMouse, canvas.width, canvas.height);
        particles[i].draw();
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-80"
    />
  );
}

function MagneticButton({ children, className, onClick }: any) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    x.set((clientX - centerX) * 0.3);
    y.set((clientY - centerY) * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: mouseXSpring, y: mouseYSpring }}
      className={`relative flex items-center justify-center rounded-full bg-white text-black font-medium tracking-tight overflow-hidden ${className}`}
      onClick={onClick}
    >
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}

function Navigation() {
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 md:px-12 md:py-6 backdrop-blur-md bg-black/50 border-b border-white/10"
    >
      <div className="text-sm font-semibold tracking-widest uppercase">
        Studio
      </div>
      <nav className="flex items-center gap-8 text-sm font-medium tracking-wide">
        <a href="#projects" className="hover:opacity-70 transition-opacity">Projects</a>
        <a href="#contact" className="hover:opacity-70 transition-opacity">Contact</a>
      </nav>
    </motion.header>
  );
}

function Hero() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center pt-24 px-6 md:px-12 max-w-4xl mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
        className="mb-8"
      >
        <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border border-white/10 grayscale mx-auto">
          <img 
            src="https://picsum.photos/seed/portrait/800/800" 
            alt="Profile" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
      </motion.div>
      
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
        className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-tight mb-6"
      >
        CRAFTING DIGITAL REALITIES.
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.3 }}
        className="text-lg md:text-xl font-light text-white/70 max-w-2xl mx-auto mb-10"
      >
        I am a multidisciplinary designer and engineer focused on creating weightless, industrial minimalist interfaces. I believe in the power of negative space and the precision of a single pixel.
      </motion.p>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.4 }}
        className="mb-24"
      >
        <MagneticButton className="px-8 py-4 text-base">
          Get in touch
        </MagneticButton>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ type: "spring", stiffness: 50, damping: 20, delay: 0.6 }}
        className="w-full h-[1px] bg-white/10 mt-auto"
      />
    </section>
  );
}

const PROJECTS = [
  { id: 1, title: "AURA", category: "E-Commerce", description: "A seamless shopping experience built for the modern web with fluid transitions.", image: "https://picsum.photos/seed/aura/800/600" },
  { id: 2, title: "NEXUS", category: "Fintech", description: "Next-generation banking interface with real-time analytics and data visualization.", image: "https://picsum.photos/seed/nexus/800/600" },
  { id: 3, title: "VOID", category: "Editorial", description: "A minimalist publishing platform designed for digital creators and writers.", image: "https://picsum.photos/seed/void/800/600" },
  { id: 4, title: "ECHO", category: "Web3", description: "Decentralized application dashboard with intuitive UX and smart contract integration.", image: "https://picsum.photos/seed/echo/800/600" },
];

function ProjectItem({ project, index }: { project: typeof PROJECTS[0], index: number, key?: React.Key }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ type: "spring", stiffness: 100, damping: 20, delay: index * 0.1 }}
      className="group flex flex-col border border-white/10 bg-black/20 backdrop-blur-sm overflow-hidden hover:border-white/30 transition-colors duration-500"
    >
      <div className="relative aspect-[4/3] overflow-hidden border-b border-white/10">
        <img 
          src={project.image} 
          alt={project.title}
          className="w-full h-full object-cover grayscale opacity-70 group-hover:scale-105 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700"
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="p-8 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-6">
          <div>
            <div className="text-xs font-semibold tracking-widest uppercase opacity-50 mb-2">
              {project.category}
            </div>
            <h3 className="text-2xl font-bold tracking-tight">
              {project.title}
            </h3>
          </div>
          <button className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors duration-300 shrink-0 ml-4 cursor-pointer">
            <ArrowUpRight size={18} />
          </button>
        </div>
        <p className="text-white/60 font-light leading-relaxed text-sm mt-auto">
          {project.description}
        </p>
      </div>
    </motion.div>
  );
}

function Projects() {
  return (
    <section id="projects" className="py-32 px-6 md:px-12 max-w-5xl mx-auto">
      <div className="mb-16 text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="text-sm font-semibold tracking-widest uppercase opacity-50"
        >
          01 / Projects
        </motion.h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {PROJECTS.map((project, index) => (
          <ProjectItem key={project.id} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer id="contact" className="py-12 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
      <div className="text-sm font-semibold tracking-widest uppercase opacity-50">
        © {new Date().getFullYear()} Studio
      </div>
      <div className="flex items-center gap-6 text-sm font-medium tracking-wide opacity-50">
        <a href="#" className="hover:opacity-100 transition-opacity">Twitter</a>
        <a href="#" className="hover:opacity-100 transition-opacity">LinkedIn</a>
        <a href="#" className="hover:opacity-100 transition-opacity">GitHub</a>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div className="bg-black text-white min-h-screen selection:bg-white selection:text-black font-sans relative">
      <ParticleBackground />
      <Navigation />
      <main className="relative z-10">
        <Hero />
        <Projects />
      </main>
      <Footer />
    </div>
  );
}
