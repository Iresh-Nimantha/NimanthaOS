import { Project, SkillData } from './types';

export const CV_DETAILS = {
  name: "Nimantha S.I.",
  role: "Software Engineering Undergraduate",
  location: "Colombo, Sri Lanka",
  email: "ireshnimantha608@gmail.com",
  phone: "+94 78 293 2370",
  university: "University of Colombo School of Computing",
  about: "I am a driven Software Engineering undergraduate with a passion for building full-stack applications and automating workflows. My expertise spans the MERN stack, Next.js, and mobile development with Kotlin/Java. I actively explore AI integration using Gemini API to create smarter, user-centric solutions.",
  socials: {
    github: "https://github.com/",
    linkedin: "https://linkedin.com/in/",
    twitter: "https://twitter.com/"
  },
  interests: ["AI & Machine Learning", "Open Source", "Mobile Dev", "Workflow Automation"]
};

export const PROJECTS: Project[] = [
  // --- Web Development ---
  {
    id: 'web-1',
    title: 'Workshop Job Tracker System',
    category: 'Web Development',
    tech: 'Next.js, Tailwind CSS, Laravel',
    description: 'A responsive workshop management platform designed to streamline operations.',
    features: [
      'Role-based dashboards (Admin/Mechanic)',
      'Real-time job tracking and status updates',
      'Customer and vehicle management database',
      'Automated service history logging'
    ],
    githubUrl: 'https://github.com/yourusername/Workshop-Job-Tracker-Systeme',
    image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop',
  },
  {
    id: 'web-2',
    title: 'Eco-Tourism QR Explorer',
    category: 'Web Development',
    tech: 'Next.js, Tailwind CSS, Firebase, Gemini API',
    description: 'A responsive tourism platform enhancing visitor experience through technology.',
    features: [
      'QR code discovery for local flora and fauna',
      'Integrated AI Chatbot (Gemini API) for guide info',
      'Multi-language support for international tourists',
      'Dynamic place details and reviews'
    ],
    githubUrl: 'https://github.com/yourusername/Eco-Tourism-QR-Explorer',
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop',
  },
  {
    id: 'web-3',
    title: 'Aswanna',
    category: 'Web Development',
    tech: 'React.js, Tailwind CSS, Laravel',
    description: 'A responsive crop calendar web app offering AI-driven planting insights.',
    features: [
      'AI-driven planting schedules based on weather',
      'Farming recommendations for optimal yields',
      'Interactive crop calendar interface',
      'Yield prediction analytics'
    ],
    githubUrl: 'https://github.com/yourusername/Agricultural-Information-Platforme',
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=2070&auto=format&fit=crop',
  },

  // --- Mobile Applications ---
  {
    id: 'mob-1',
    title: 'Koratuwa Mobile App',
    category: 'Mobile Applications',
    tech: 'Java/Kotlin, Next.js, Firebase, Hugging Face',
    description: 'Comprehensive agricultural platform bridging mobile users with advanced analytics.',
    features: [
      'Native Android App built with Java/Kotlin',
      'Admin web dashboard (Next.js) for oversight',
      'Firebase Authentication & Storage',
      'AI model integration via Hugging Face for disease detection'
    ],
    githubUrl: 'https://github.com/yourusername/koratuwa-mobile-app',
    image: 'https://images.unsplash.com/photo-1560493676-04071c5f467b?q=80&w=1974&auto=format&fit=crop',
  },
  {
    id: 'mob-2',
    title: 'fotNews Mobile App',
    category: 'Mobile Applications',
    tech: 'Java, Android Studio, Firebase',
    description: 'Real-time news application delivering trending updates across categories.',
    features: [
      'Real-time news fetching and syncing',
      'Multiple news categories (Tech, Sports, Politics)',
      'Firebase backend integration',
      'User-friendly Material Design interface'
    ],
    githubUrl: 'https://github.com/yourusername/FotNews_MobileApp',
    image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=2070&auto=format&fit=crop',
  },

  // --- AI & Automation ---
  {
    id: 'ai-1',
    title: 'Automated LinkedIn Job Finder',
    category: 'AI & Automation',
    tech: 'n8n, Gemini AI, Google Sheets',
    description: 'Automated workflow to streamline the job hunting process.',
    features: [
      'Scrapes and tracks LinkedIn job postings',
      'Uses Gemini AI to analyze job relevance',
      'Auto-updates Google Sheets with new opportunities',
      'Email notifications for high-match jobs'
    ],
    image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=2070&auto=format&fit=crop',
  },
  {
    id: 'ai-2',
    title: 'Automated Clothing Order Processing',
    category: 'AI & Automation',
    tech: 'n8n, AI, Google Sheets',
    description: 'End-to-end automation for handling clothing store orders via email.',
    features: [
      'Extracts order details from incoming emails',
      'Checks inventory availability in Sheets',
      'Sends automated confirmation/status updates',
      'Reduces manual data entry errors'
    ],
    githubUrl: 'https://github.com/yourusername/Automated_Order_Processing',
    image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=2070&auto=format&fit=crop',
  },
];

export const SKILLS_DATA: SkillData[] = [
  { subject: 'MERN Stack', A: 90, fullMark: 100 },
  { subject: 'Next.js', A: 85, fullMark: 100 },
  { subject: 'Laravel', A: 80, fullMark: 100 },
  { subject: 'Java/Kotlin', A: 75, fullMark: 100 },
  { subject: 'n8n Automation', A: 85, fullMark: 100 },
  { subject: 'Gemini AI', A: 90, fullMark: 100 },
];

export const COMMANDS_HELP = `
  Available commands:
  - help: Show this message
  - cat summary: Display profile summary
  - ls: List projects
  - whoami: Display current user
  - clear: Clear terminal
`;

export const PROFILE_SUMMARY = "Undergraduate in SE interested in supporting business objectives through real-world development.";

export const TYPING_SNIPPETS = {
  text: [
    "Software engineering is not just about writing code; it is about solving problems efficiently.",
    "Consistency is key when learning a new programming language or framework.",
    "The best way to predict the future is to invent it using technology and innovation.",
    "Great developers write code that humans can understand, not just computers.",
    "Debugging is like being the detective in a crime movie where you are also the murderer.",
  ],
  code: [
    "const [state, setState] = useState(initialState);",
    "import React, { useEffect } from 'react';",
    "public static void main(String[] args) { System.out.println('Hello World'); }",
    "def factorial(n): return 1 if n == 0 else n * factorial(n-1)",
    "array.filter(item => item.isActive).map(item => item.value);",
    "<div className='flex justify-center items-center h-screen'></div>",
  ]
};