/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useMotionValue, useSpring } from 'motion/react';
import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import pfpImage from '../images/pfp_black_bg.png';

function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    let lastTime = performance.now();

    // Accessibility check: Do not animate if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

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
      baseSpeed: number;

      constructor(width: number, height: number) {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.length = Math.random() * 4 + 2;
        this.thickness = Math.random() * 1.5 + 0.5;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.angle = Math.random() * Math.PI * 2;

        this.wanderStrength = Math.random() * 0.002 + 0.001;
        this.wanderAngle = Math.random() * Math.PI * 2;
        this.friction = 0.98;
        this.baseSpeed = Math.random() * 0.2 + 0.1;
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

      update(targetMouse: { x: number, y: number }, width: number, height: number, dt: number) {
        // dt is normalization factor based on 60fps (16.67ms)
        const timeScale = dt / 16.67;

        // Calculate distance FROM mouse TO particle for repulsion
        const dx = this.x - targetMouse.x;
        const dy = this.y - targetMouse.y;
        const distSq = dx * dx + dy * dy;
        const dist = Math.sqrt(distSq);

        let ax = 0;
        let ay = 0;

        // Enhanced Repel logic: radius set to 100px (Restored)
        const repelRadius = 100;
        if (dist < repelRadius && dist > 0) {
          const force = Math.pow((repelRadius - dist) / repelRadius, 1.5);
          const repelStrength = 0.06 * timeScale;
          ax += (dx / dist) * force * repelStrength;
          ay += (dy / dist) * force * repelStrength;
        }

        // Smoother wandering
        this.wanderAngle += (Math.random() - 0.5) * 0.05 * timeScale;
        ax += Math.cos(this.wanderAngle) * this.wanderStrength * timeScale;
        ay += Math.sin(this.wanderAngle) * this.wanderStrength * timeScale;

        // Apply forces
        this.vx += ax;
        this.vy += ay;

        // Base drift to keep things moving
        const currentSpeed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
        if (currentSpeed < this.baseSpeed) {
          const boost = (this.baseSpeed - currentSpeed) * 0.05 * timeScale;
          this.vx += (this.vx / (currentSpeed || 1)) * boost;
          this.vy += (this.vy / (currentSpeed || 1)) * boost;
        }

        // Apply friction (normalized by time)
        const actualFriction = Math.pow(this.friction, timeScale);
        this.vx *= actualFriction;
        this.vy *= actualFriction;

        // Speed cap
        const maxSpeed = 2.5;
        const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
        if (speed > maxSpeed) {
          this.vx = (this.vx / speed) * maxSpeed;
          this.vy = (this.vy / speed) * maxSpeed;
        }

        this.x += this.vx * timeScale;
        this.y += this.vy * timeScale;

        // Wrap around screen
        const padding = 20;
        if (this.x < -padding) this.x = width + padding;
        if (this.x > width + padding) this.x = -padding;
        if (this.y < -padding) this.y = height + padding;
        if (this.y > height + padding) this.y = -padding;

        if (speed > 0.01) {
          const targetAngle = Math.atan2(this.vy, this.vx);
          let diff = targetAngle - this.angle;
          while (diff < -Math.PI) diff += Math.PI * 2;
          while (diff > Math.PI) diff -= Math.PI * 2;
          this.angle += diff * 0.1 * timeScale;
        }
      }
    }

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles = [];
      const numberOfParticles = Math.floor((canvas.width * canvas.height) / 8500);
      for (let i = 0; i < numberOfParticles; i++) {
        particles.push(new Particle(canvas.width, canvas.height));
      }
    };

    let targetMouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let currentMouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

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

    const animate = (time: number) => {
      const dt = time - lastTime;
      lastTime = time;

      const effectiveDt = Math.min(dt, 100);
      const timeScale = effectiveDt / 16.67;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Interpolate mouse for smoothness
      currentMouse.x += (targetMouse.x - currentMouse.x) * 0.15 * timeScale;
      currentMouse.y += (targetMouse.y - currentMouse.y) * 0.15 * timeScale;

      for (let i = 0; i < particles.length; i++) {
        particles[i].update(currentMouse, canvas.width, canvas.height, effectiveDt);
        particles[i].draw();
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

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
      className={`relative flex items-center justify-center rounded-full bg-white text-black font-medium tracking-tight overflow-hidden hover:bg-white/80 hover:shadow-[0_0_15px_rgba(255,255,255,0.4)] transition-all duration-300 focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:outline-none ${className}`}
      onClick={onClick}
    >
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}

function Navigation() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="fixed top-4 left-4 right-4 z-50 grid grid-cols-3 items-center px-6 py-4 rounded-xl backdrop-blur-md bg-white/5 border border-white/10"
    >
      <div
        onClick={scrollToTop}
        className="justify-self-start text-xl font-light tracking-widest text-white cursor-pointer select-none"
        style={{ fontFamily: "Space Grotesk, sans-serif" }}
      >
        JJM.
      </div>

      <nav className="justify-self-center flex items-center gap-8 text-sm font-medium tracking-wide">
        <a href="#projects" className="hover:opacity-70 transition-opacity focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:outline-none rounded">Projects</a>
        <a href="#about" className="hover:opacity-70 transition-opacity focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:outline-none rounded">About</a>
      </nav>

      <div className="justify-self-end">
        <a
          href="#contact"
          className="px-5 py-2 text-xs font-semibold uppercase tracking-wider bg-white text-black rounded-full hover:bg-white/80 hover:shadow-[0_0_15px_rgba(255,255,255,0.4)] transition-all duration-300 focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:outline-none inline-block"
        >
          Get in touch
        </a>
      </div>
    </motion.header>
  );
}

function Hero() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center pt-24 px-6 md:px-12 w-full max-w-6xl mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
        className="mb-8"
      >
        <div className="w-56 h-56 md:w-72 md:h-72 rounded-full overflow-hidden border border-white/10 mx-auto">
          <img
            src={pfpImage}
            alt="Profile"
            className="w-full h-full object-cover scale-[1.4] translate-y-[20%]"
          />
        </div>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-tight mb-6"
      >
        <span className="whitespace-nowrap">Hi! I'm Jacob J Mungai</span>
        <span className="block mt-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white/80 whitespace-normal">
          Aspiring Software Engineer
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.3 }}
        className="text-lg md:text-xl font-light text-white/70 max-w-2xl mx-auto mb-10"
      >
        I'm a New Grad CS major (Fall 2025 @ UFlorida). I've worked with Python, C++, Java,
        SvelteKit, TailwindCSS, SQL, MATLAB, SFML, and Pygame. Currently looking for full-time
        SWE & Business Analyst roles!
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
    <motion.a
      href="#"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ type: "spring", stiffness: 100, damping: 20, delay: index * 0.1 }}
      className="group flex flex-col border border-white/10 bg-black/20 backdrop-blur-sm overflow-hidden hover:border-white/30 transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:outline-none"
    >
      <div className="relative aspect-[4/3] overflow-hidden border-b border-white/10">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover grayscale opacity-70 group-hover:scale-105 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-500"
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
    </motion.a>
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

function About() {
  return (
    <section id="about" className="py-32 px-6 md:px-12 max-w-5xl mx-auto border-t border-white/10">
      <div className="mb-16 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="text-sm font-semibold tracking-widest uppercase opacity-50"
        >
          02 / About Me
        </motion.h2>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
        className="space-y-8 text-lg md:text-xl font-light text-white/70 leading-relaxed"
      >
        <p>
          I'm originally from Tanzania and came to the U.S. as a UWC Davis Scholar at the University of Florida. Navigating that transition on my own solidified a core belief I bring to my career: "luck" is simply the result of showing up every day with curiosity and grit. I don't wait for the right moment to appear; I prefer to build it through consistency and a relentless work ethic.
        </p>
        <p>
          Outside of the professional grind, I'm a big sports fan. Whether I'm analyzing the strategy of a UFC card, watching the NBA, or competing in NBA2K, I'm drawn to the discipline it takes to win. I'm also a self-proclaimed foodie with a very specific weakness—if there's a ribeye or lobster mac and cheese on the menu, I'm there. Ultimately, I carry that same appetite for excellence into every project I touch.
        </p>
      </motion.div>
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
        <a href="#" className="hover:opacity-100 transition-opacity focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:outline-none rounded">Twitter</a>
        <a href="#" className="hover:opacity-100 transition-opacity focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:outline-none rounded">LinkedIn</a>
        <a href="#" className="hover:opacity-100 transition-opacity focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:outline-none rounded">GitHub</a>
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
        <About />
      </main>
      <Footer />
    </div>
  );
}
