/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Navigation } from './components/layout/Navigation';
import { Hero } from './components/sections/Hero';
import { Projects } from './components/sections/Projects';
import { WebSolutions } from './components/sections/WebSolutions';
import { About } from './components/sections/About';

function App() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
      {/* Background Noise Texture */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[100] noise-bg" />

      <Navigation />

      <main className="max-w-[1400px] mx-auto px-6 pt-24 md:pt-32 pb-24 space-y-16 md:space-y-24 relative z-10">
        <Hero />
        <Projects />
        <WebSolutions />
        <About />
      </main>

      <footer className="max-w-[1400px] mx-auto px-6 pb-12 border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center gap-6 opacity-40">
        <div className="text-[10px] font-bold uppercase tracking-[0.2em]">
          © 2026 Jacob J. Mungai
        </div>
        <div className="flex gap-8 text-[10px] font-bold uppercase tracking-[0.2em]">
          <a href="#hero" className="hover:text-white transition-colors">Back to top</a>
          <a href="https://github.com/yakubmungai/resume-site" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Source Code</a>
        </div>
      </footer>
    </div>
  );
}

export default App;
