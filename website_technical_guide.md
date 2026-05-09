# The Master Technical Guide: Jacob J. Mungai Portfolio Site

This guide is your ultimate technical manual and interview "cheat sheet." It covers everything from architectural decisions to professional freelancing workflows, designed specifically for a new-grad SWE transitioning into the professional world.

---

## 🚀 The Tech Stack: Professional Rationale

| Layer | Technology | Professional "Why" (Interview Talking Point) |
| :--- | :--- | :--- |
| **Framework** | **React 19** | "I chose React 19 for its improved performance and concurrent rendering capabilities, which ensure a smooth UI even with heavy animations." |
| **Language** | **TypeScript** | "TypeScript is my default choice for reliability. It acts as living documentation and catches 90% of potential logic errors during development." |
| **Build Tool** | **Vite** | "Vite provides a lightning-fast development experience using native ESM, allowing for sub-second HMR (Hot Module Replacement) which boosts productivity." |
| **3D Engine** | **R3F / Three.js** | "I use React-Three-Fiber to bridge declarative React logic with imperative Three.js commands, making 3D scenes part of the component lifecycle." |
| **Styling** | **Tailwind 4** | "Tailwind 4's CSS-first approach allows me to keep my styling logic close to my markup while maintaining a design system via CSS variables." |
| **AI Layer** | **Gemini API** | "I leverage the Gemini API (via `process.env.GEMINI_API_KEY`) to experiment with AI-accelerated content generation and intelligent UI features." |

---

## 🏗️ Architectural Deep Dive

### 1. Component Strategy: The "Bento" Pattern
Your site uses a **Bento Grid** layout, popular in modern design (Apple, Stripe).
- **`src/components/ui/BentoCard.tsx`**: This is a "Wrapper Component." It handles the glassmorphism, border glows, and entrance animations for *every* card on the site.
- **Benefit**: This follows the **DRY (Don't Repeat Yourself)** principle. If you want to change the border color of all cards, you change it in *one* file.

### 2. 3D Graphics & Performance (`NeuralLattice.tsx`)
- **Mathematical Animation**: Instead of using a video (which is heavy), the lattice is rendered via code. It uses sine and cosine waves to move 2,000 points.
- **Efficiency**: By using `useFrame`, you are tapping into the browser's `requestAnimationFrame` loop, ensuring the animation stops when the user switches tabs to save battery.

### 3. Data-Driven Content (`portfolio.ts`)
- **Decoupling**: The UI is a "shell" that renders data. This makes your site "Headless Ready."
- **Why?**: In a professional setting, this allows you to swap your static data file for a real API (like Contentful or a custom Backend) without rewriting a single UI component.

---

## 💼 Professional Freelancing & Industry Standards

### 1. The "Production Ready" Checklist
As a freelancer, you don't just "ship code," you "ship a product":
- **SEO & Meta**: Your `index.html` and components should include `title`, `description`, and `og:tags` (Open Graph) so the site looks premium when shared on LinkedIn.
- **Image Optimization**: Using SVGs for icons (Lucide) and WebP for images ensures your site loads in under 1 second.
- **Accessibility**: Using semantic tags (`<nav>`, `<main>`, `<section>`) ensures screen readers can navigate your site, which is often a legal requirement for government or corporate clients.

### 2. Deployment & CI/CD
- **Vercel/Netlify**: These platforms allow for "Atomic Deployments." Every time you push to GitHub, a new version is created. If you break something, you can revert in one click.
- **DNS Management**: Professional freelancers must understand how to point an `A Record` or `CNAME` from a domain registrar (like Namecheap or GoDaddy) to their host.

### 3. AI-Accelerated Development
- **The Modern Edge**: Mention in interviews that you use AI tools (like the Gemini API or coding assistants) to accelerate your workflow. This shows you are at the forefront of the "AI SWE" movement—building higher-quality sites in 50% of the time.

---

## 💬 Advanced Interview Questions

**Q: "I see you're using Three.js. How does that affect your bundle size?"**
- **A**: "To keep the bundle size small, I use tree-shaking features of Vite and only import the specific components I need from `@react-three/drei`. I also lazy-load the 3D sections so they don't block the initial page load."

**Q: "How do you handle state management across your sections?"**
- **A**: "For a single-page portfolio, I prefer 'Prop Drilling' or the 'Context API' for global settings. However, I've designed the components to be 'stateless' where possible, making them easier to test and reuse."

**Q: "How do you ensure your Tailwind styles don't become a mess?"**
- **A**: "I use the `tailwind-merge` and `clsx` utilities to conditionally apply classes and handle class conflicts. I also move complex utility strings into CSS variables or constant objects to keep my JSX clean."

**Q: "What is your Git strategy when working solo on freelance projects?"**
- **A**: "Even when working solo, I use a 'Feature Branch' workflow. I never commit directly to `main`. This allows me to use Pull Requests to review my own code before merging, ensuring I catch small bugs and maintain a clean commit history."

---

## 📈 Future Roadmap (Architectural Foresight)
If asked "What would you add next?", say:
1.  **I18n (Internationalization)**: "Adding multi-language support using `react-i18next`."
2.  **Dark Mode Toggle**: "Implementing a theme context for manual dark/light mode control."
3.  **Blog (CMS)**: "Integrating a headless CMS like Sanity.io to allow for dynamic blog posts."
