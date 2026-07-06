// Image Assets
import pfpImage from '../assets/pfp_black_bg.png';

export interface PersonalInfo {
  name: string;
  legalName: string;
  role: string;
  intro: string;
  aliases: string[];
  university: string;
  graduation: string;
  location: string;
  email: string;
  links: {
    github: string;
    linkedin: string;
  };
  bio: string;
  sports: string;
  food: string;
  resumes: {
    swe: string;
    ba: string;
  };
}
import headshotAIImage from '../assets/headshot_ai.png';
import kosmosImage from '../assets/kosmos_launch.png';
import alexgAutomatorImage from '../assets/alexg_automator.png';
import portfolioPreviewImage from '../assets/portfolio_preview.png';
import tanshaPreviewImage from '../assets/tansha_preview.png';
import craftedByDnaPreviewImage from '../assets/craftedbydna_preview.png';

export const PERSONAL_INFO: PersonalInfo = {
  name: "Jacob J. Mungai",
  legalName: "Yakub J. Mungai",
  role: "Aspiring Software Engineer",
  intro: "I'm a Recent Grad CS major (Fall 2025 @ UFlorida) seeking full-time SWE roles, while actively freelancing high-performance web solutions focused on modern architectural standards and rapid delivery.",
  aliases: ["Yakub Joseph Mungai", "Jacob Joseph Mungai", "Jacob JJ Mungai"],
  university: "University of Florida",
  graduation: "Fall 2025",
  location: "Gainesville, FL / Tanzania",
  email: "yakubmungai@gmail.com",
  links: {
    github: "https://github.com/yakubmungai",
    linkedin: "https://www.linkedin.com/in/yakubjmungai/",
  },
  bio: `I'm originally from Tanzania and came to the U.S. as a UWC Davis Scholar at the University of Florida. Navigating that transition on my own solidified a core belief I bring to my career: "luck" is simply the result of showing up every day with curiosity and grit. I don't wait for the right moment to appear; I prefer to build it through consistency and a relentless work ethic.`,
  sports: `Outside of the professional grind, I'm a big sports fan. Whether I'm analyzing the strategy of a UFC card, watching the NBA, or competing in NBA2K, I'm drawn to the discipline it takes to win.`,
  food: `I'm also a self-proclaimed foodie with a very specific weakness—if there's a ribeye or lobster mac and cheese on the menu, I'm there. Ultimately, I carry that same appetite for excellence into every project I touch.`,
  resumes: {
    swe: "/resumes/Yakub_Mungai_2026_SWE_Resume.pdf",
    ba: "/resumes/Yakub_Mungai_2026_BA_Resume.pdf"
  }
};

export const PROJECTS = [
  {
    id: 1,
    title: "HeadshotAI",
    category: "AI & Computer Vision",
    description: "An AI-powered Discord bot that transforms casual photos into polished professional headshots. Integrates Google Gemini AI to apply DSLR-quality lighting and enhance image clarity asynchronously.",
    image: headshotAIImage,
    href: "https://github.com/yakubmungai/Discord-Headshot-Bot",
    size: "small",
    hidden: true
  },
  {
    id: 2,
    title: "Project KOSMOS",
    category: "AI & Aerospace",
    description: "A multi-agent AI system for autonomous spacecraft mission control. Converts natural language commands into formal mission plans using kRPC and MechJeb2.",
    image: kosmosImage,
    href: "https://github.com/cjohnson74/KOSMOS",
    size: "small"
  },
  {
    id: 3,
    title: "AlexG Automator",
    category: "FinTech & Automation",
    description: "A Python-based algorithmic trading system automating the 'Set and Forget' strategy. Integrates with MetaTrader 5 to identify market zones and execute trades based on strict confluence scores.",
    image: alexgAutomatorImage,
    href: "https://github.com/yakubmungai/fx-alex",
    size: "small"
  },
];

export const WEB_SHOWCASE = [
  {
    id: 6,
    title: "Crafted by DNA",
    category: "Creative Director & Filmmaker Portfolio",
    description: "A premium bespoke portfolio design engineered for an experienced creative director and filmmaker. Features immersive animations, high-fidelity media presentation, and optimal performance.",
    tags: ["Next.js", "Tailwind", "Framer Motion"],
    href: "https://craftedbydna.com",
    isLive: true,
    image: craftedByDnaPreviewImage
  },
  {
    id: 5,
    title: "Tanzania Sharing Association",
    category: "Non-Profit Tech",
    description: "Official digital hub for a US-based mutual-aid society. Engineered with Next.js and Tailwind CSS to facilitate community support, membership management, and financial aid distribution for the Tanzanian diaspora.",
    tags: ["Next.js", "Tailwind", "TypeScript"],
    href: "https://tansha.org",
    isLive: true,
    image: tanshaPreviewImage
  },
  {
    id: 4,
    title: "Modern Portfolio Architecture",
    category: "Web Engineering",
    description: "This very site—engineered for maximum performance, 3D interactivity, and clean architectural design using React 19 and R3F.",
    tags: ["React", "Three.js", "Tailwind"],
    image: portfolioPreviewImage
  },
];

export const SKILLS = [
  "Python", "Java", "C++", "SQL",
  "React", "Next.js", "Three.js", "Tailwind",
  "Gemini AI", "OpenCV", "Async.py", "MATLAB",
  "Figma", "SFML", "Pygame", "Node.js"
];
