'use client';

import { useEffect, useRef } from 'react';
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaReact,
  FaNodeJs,
  FaPython,
  FaDocker,
  FaJava,
  FaAws,
} from 'react-icons/fa';
import {
  SiTailwindcss,
  SiMongodb,
  SiVercel,
  SiFastapi,
  SiClerk,
  SiDebian,
  SiTypescript,
  SiCplusplus,
  SiPostgresql,
  SiSpringboot,
  SiNextdotjs,
  SiPytorch,
  SiRedis,
  SiCmake,
} from 'react-icons/si';
import { motion } from 'framer-motion';
import { FiExternalLink, FiArrowDown, FiMapPin, FiCalendar } from 'react-icons/fi';
import { HiOutlineSparkles, HiOutlineAcademicCap } from 'react-icons/hi2';

// ────────────────────────────────────────────────────────────────────────────
// Reusable logo with CSS-only color / background handling.
// Lets us drop in any source logo and adapt it to a dark theme without
// shipping new image files.
//   • invert      → black → white (and vice versa)
//   • dropLightBg → after inverting, the now-dark background blends into the
//                   surrounding dark surface (mix-blend-mode: screen).
//                   On its own (no invert), drops a light background via
//                   multiply.
//   • dropDarkBg  → drops a black background against a dark surface
//                   (mix-blend-mode: lighten).
//   • white       → coerce ANY colored shape on transparent bg to pure white
//                   (brightness 0 then invert) — perfect for monochrome
//                   brand marks on dark themes.
//   • lift        → boost brightness/saturation so dark-colored logos read
//                   on a dark background while preserving brand hue.
// ────────────────────────────────────────────────────────────────────────────
type LogoProps = {
  src: string;
  alt: string;
  className?: string;
  invert?: boolean;
  dropLightBg?: boolean;
  dropDarkBg?: boolean;
  white?: boolean;
  lift?: boolean;
};
function Logo({
  src,
  alt,
  className = '',
  invert,
  dropLightBg,
  dropDarkBg,
  white,
  lift,
}: LogoProps) {
  const filters = [
    white && 'brightness-0 invert',
    !white && invert && 'invert brightness-110',
    !white && lift && 'brightness-[2.4] saturate-150 contrast-125',
  ]
    .filter(Boolean)
    .join(' ');
  const blend = !white && invert && dropLightBg
    ? 'mix-blend-screen'
    : !white && dropLightBg
      ? 'mix-blend-multiply'
      : !white && dropDarkBg
        ? 'mix-blend-lighten'
        : '';
  return (
    <img
      src={src}
      alt={alt}
      className={`select-none ${filters} ${blend} ${className}`}
      draggable={false}
    />
  );
}

// ────────────────────────────────────────────────────────────────────────────
// Data
// ────────────────────────────────────────────────────────────────────────────
type Experience = {
  company: string;
  role: string;
  location: string;
  dates: string;
  link?: string;
  badges?: string[];
  bullets: string[];
  logo: React.ReactNode;
};

const experiences: Experience[] = [
  {
    company: 'Amazon Web Services',
    role: 'Software Development Engineer Intern',
    location: 'Raleigh, NC',
    dates: 'May 2026 – Aug 2026',
    link: 'https://aws.amazon.com',
    bullets: [
      'Designing and implementing a canary-style analytic pipeline stage for automated code promotion driven by live performance metrics.',
    ],
    logo: <FaAws className="h-14 w-14 text-[#FF9900]" aria-label="AWS" />,
  },
  {
    company: 'o11',
    role: 'Founding Engineer',
    location: 'San Francisco, CA',
    dates: 'Sep 2025 – Mar 2026',
    link: 'https://o11.ai',
    badges: ['Y Combinator W26'],
    bullets: [
      'Built a full-stack AI platform for bankers: ingesting, embedding, and retrieving proprietary financial documents.',
      'Architected a production RAG pipeline with intelligent document chunking and embedding for scalable retrieval.',
      'Shipped Office 365 tooling powered by RAG pipelines, generating documents with firm-specific financial context.',
      'Helped land backing from Y Combinator (W26), LeapYear, and KPMG, supporting enterprise pilots and launch.',
    ],
    logo: <Logo src="o11-logo.png" alt="o11" invert dropLightBg className="h-16 w-16 object-contain" />,
  },
  {
    company: 'narb Inc.',
    role: 'Software Engineering Intern',
    location: 'Remote',
    dates: 'Aug 2025 – Sep 2025',
    link: 'https://narb.cc/',
    bullets: [
      'Designed user application for multi-modal LLM technology, using Convex for a 30% increase in development speed.',
      'Migrated existing applications to a new cross-platform framework prioritizing rapid development and implementation.',
    ],
    logo: <Logo src="narb-logo.png" alt="narb" className="h-14 w-14 object-contain" />,
  },
  {
    company: 'Qorvo Inc.',
    role: 'Test Engineering Intern',
    location: 'Greensboro, NC',
    dates: 'May 2025 – Aug 2025',
    link: 'https://www.qorvo.com',
    bullets: [
      'Designed an embedded systems solution for chip sorting on the Synax S9 Handler, cutting configuration time by 25%.',
      'Deployed a company-wide solution for 50+ employees via an intranet-hosted web interface built with React and Node.js.',
      'Implemented a low-level Arduino GPIB interface paired with a Raspberry Pi connecting to the universal web UI over Bluetooth.',
    ],
    logo: <Logo src="qorvo-logo.png" alt="Qorvo" invert dropLightBg className="h-12 w-auto object-contain" />,
  },
  {
    company: 'Duke CEI Lab',
    role: 'Undergraduate Researcher',
    location: 'Durham, NC',
    dates: 'Jan 2025 – May 2025',
    link: 'https://cei.pratt.duke.edu',
    bullets: [
      'Tested ML model quantization and distillation techniques, cutting model size by up to 30% and inference latency by 10% while preserving accuracy (PyTorch).',
      'Researched applications across 5 established bioinformatics algorithms for hardware acceleration using tri-state CAMs.',
    ],
    logo: <Logo src="duke-cei-logo.svg" alt="Duke CEI" className="h-12 w-auto object-contain" />,
  },
];

type Project = {
  title: string;
  description: string;
  bullets: string[];
  tech: React.ReactNode[];
  github?: string;
  demo?: string;
  badge?: string;
};

const projects: Project[] = [
  {
    title: 'Duke ADTG',
    description:
      'Automatic delivery, testing, and grading interface co-built with a Duke professor to support 100+ student graduate classes.',
    bullets: [
      'Built grading infrastructure for instructors and TAs with reliable backend logic and secure database transactions.',
      'Diagnosed and resolved UI and database issues across the app, improving system reliability and user experience.',
    ],
    tech: [
      <SiSpringboot key="spring" className="h-6 w-6 text-[#6DB33F]" title="Spring Boot" />,
      <SiPostgresql key="pg" className="h-6 w-6 text-[#4169E1]" title="PostgreSQL" />,
      <FaJava key="java" className="h-6 w-6 text-[#E76F00]" title="Java" />,
    ],
  },
  {
    title: 'Low-Latency Matching Engine',
    description:
      'Single-symbol limit order book in C++ tuned with profiling-driven optimizations to push throughput and shave tail latency.',
    bullets: [
      'Boosted throughput by 24% after iterating on cache locality and hot-path allocations.',
      'Replaced per-order heap allocations with a custom slab pool and a lock-free SPSC ring with cache-aligned atomics — cut worst-case latency by 41%.',
      'Built a TCP gateway with a fixed 40-byte binary message format shared between network layer and internal queue, removing parsing overhead.',
      'Validated correctness with 20+ gtest unit tests plus a 5,000-iteration randomized property test of book state.',
    ],
    tech: [
      <SiCplusplus key="cpp" className="h-6 w-6 text-[#00599C]" title="C++" />,
      <SiCmake key="cmake" className="h-6 w-6 text-[#064F8C]" title="CMake" />,
      <FaPython key="py" className="h-6 w-6 text-[#3776AB]" title="Python" />,
    ],
  },
  {
    title: 'MeetUp',
    description:
      'Cross-platform scheduling app that plugs into calendar accounts to simplify group scheduling and meeting coordination.',
    bullets: [
      'Direct Google / Outlook Calendar API integration with unified, group-aware profiles.',
      'Secure authentication with Google and Apple via Clerk.',
      'Configurable per-group privacy controls for data sharing.',
    ],
    tech: [
      <FaReact key="react" className="h-6 w-6 text-[#61DAFB]" title="React Native" />,
      <SiTailwindcss key="tw" className="h-6 w-6 text-cyan-400" title="Tailwind" />,
      <SiClerk key="clerk" className="h-6 w-6 text-purple-400" title="Clerk" />,
      <Logo key="convex" src="convex-logo.png" alt="Convex" className="h-6 w-6 object-contain" />,
    ],
    github: 'https://github.com/sganhewage/meetup',
  },
  {
    title: 'SmartStudy',
    description:
      'Full-stack study aid where users upload notes and generate flashcards, summaries, quizzes, and explanations with LLMs.',
    bullets: [
      'Auth-secured dashboard with document upload, editing, and per-doc generation history.',
      'Prompt-engineered Python backend for cost-efficient LLM inference.',
      'Hosted on Vercel with clean client / server boundaries.',
    ],
    tech: [
      <FaReact key="react" className="h-6 w-6 text-[#61DAFB]" title="React" />,
      <FaNodeJs key="node" className="h-6 w-6 text-green-500" title="Node.js" />,
      <SiFastapi key="api" className="h-6 w-6 text-[#05998B]" title="FastAPI" />,
      <SiMongodb key="mongo" className="h-6 w-6 text-green-500" title="MongoDB" />,
      <SiVercel key="vercel" className="h-6 w-6 text-white" title="Vercel" />,
    ],
    github: 'https://github.com/sganhewage/SmartStudy',
    demo: 'https://smart-study-lovat.vercel.app/login',
  },
  {
    title: 'Home Lab Server',
    description:
      'Private home server with a friendly UI, Docker-hosted services, and VPN-secured remote access — NAS-class performance for a fraction of the cost.',
    bullets: [
      'Headless Debian + CasaOS + Docker for one-click app management.',
      'Tailscale VPN for encrypted remote access from anywhere.',
      'Runs media storage, dev environments, and a secure exit node.',
    ],
    tech: [
      <SiDebian key="deb" className="h-6 w-6 text-[#A81D33]" title="Debian" />,
      <FaDocker key="docker" className="h-6 w-6 text-[#2496ED]" title="Docker" />,
      <Logo key="ts" src="tailscale-logo.png" alt="Tailscale" className="h-6 w-6 object-contain" />,
    ],
  },
  {
    title: 'NFL Stats Analyzer',
    description:
      'Desktop GUI for scraping and visualizing decades of NFL player data. Interactive charts, caching, and search in a lightweight JavaFX app.',
    bullets: [
      'Scrapes and structures 20+ years of player stats.',
      'Local caching layer for a ~30% performance boost.',
      'Modular UI built with SceneBuilder.',
    ],
    tech: [
      <FaJava key="java" className="h-6 w-6 text-[#E76F00]" title="Java" />,
      <Logo key="sb" src="scenebuilder-logo.png" alt="SceneBuilder" className="h-6 w-6 object-contain" />,
      <Logo key="mv" src="maven-logo.svg" alt="Maven" className="h-6 object-contain" />,
    ],
    github: 'https://github.com/sganhewage/NFL-Stats',
  },
];

type SkillGroup = { label: string; items: { name: string; icon: React.ReactNode }[] };
const skills: SkillGroup[] = [
  {
    label: 'Languages',
    items: [
      { name: 'TypeScript', icon: <SiTypescript className="h-5 w-5 text-[#3178C6]" /> },
      { name: 'Python', icon: <FaPython className="h-5 w-5 text-[#3776AB]" /> },
      { name: 'Java', icon: <FaJava className="h-5 w-5 text-[#E76F00]" /> },
      { name: 'C / C++', icon: <SiCplusplus className="h-5 w-5 text-[#00599C]" /> },
      { name: 'SQL', icon: <SiPostgresql className="h-5 w-5 text-[#4169E1]" /> },
    ],
  },
  {
    label: 'Frameworks & Libraries',
    items: [
      { name: 'React', icon: <FaReact className="h-5 w-5 text-[#61DAFB]" /> },
      { name: 'Next.js', icon: <SiNextdotjs className="h-5 w-5 text-white" /> },
      { name: 'Node.js', icon: <FaNodeJs className="h-5 w-5 text-green-500" /> },
      { name: 'Spring Boot', icon: <SiSpringboot className="h-5 w-5 text-[#6DB33F]" /> },
      { name: 'PyTorch', icon: <SiPytorch className="h-5 w-5 text-[#EE4C2C]" /> },
      { name: 'Tailwind CSS', icon: <SiTailwindcss className="h-5 w-5 text-cyan-400" /> },
    ],
  },
  {
    label: 'Databases & Cloud',
    items: [
      { name: 'PostgreSQL', icon: <SiPostgresql className="h-5 w-5 text-[#4169E1]" /> },
      { name: 'MongoDB', icon: <SiMongodb className="h-5 w-5 text-green-500" /> },
      { name: 'AWS', icon: <FaAws className="h-5 w-5 text-[#FF9900]" /> },
      { name: 'Azure', icon: <span className="h-5 w-5 grid place-items-center text-[#0078D4] font-bold text-[10px]">AZ</span> },
      { name: 'Docker', icon: <FaDocker className="h-5 w-5 text-[#2496ED]" /> },
    ],
  },
  {
    label: 'Systems & Infrastructure',
    items: [
      { name: 'CI/CD', icon: <span className="h-5 w-5 grid place-items-center text-blue-300 text-[10px] font-bold">CI</span> },
      { name: 'Redis', icon: <SiRedis className="h-5 w-5 text-[#DC382D]" /> },
      { name: 'BullMQ', icon: <span className="h-5 w-5 grid place-items-center text-orange-400 text-[10px] font-bold">BQ</span> },
      { name: 'RAG Pipelines', icon: <HiOutlineSparkles className="h-5 w-5 text-purple-300" /> },
    ],
  },
];

const extracurriculars = [
  {
    title: 'Duke Law School — Instructional Technologies Consultant',
    location: 'Durham, NC',
    dates: 'Aug 2025 – Dec 2025',
  },
  {
    title: 'narbhacks — Hackathon',
    location: 'Remote',
    dates: 'Jul 2025',
  },
  {
    title: 'Duke Catalyst — Pre-professional Tech Society',
    location: 'Durham, NC',
    dates: 'Jan 2025 – Present',
  },
  {
    title: 'Duke Applied Machine Learning — Hardware Division',
    location: 'Durham, NC',
    dates: 'Sep 2024 – Dec 2024',
  },
  {
    title: 'Joint School of Nanoscience and Nanoengineering — Research Intern',
    location: 'Greensboro, NC',
    dates: 'Jul 2023 – Jan 2024',
  },
];

// ────────────────────────────────────────────────────────────────────────────
// Page
// ────────────────────────────────────────────────────────────────────────────
export default function PortfolioLanding() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Fade canvas as we leave the hero
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let raf = 0;
    const tick = () => {
      const target = document.getElementById('about') ?? document.getElementById('experiences');
      if (target) {
        const fadeEnd = target.offsetTop;
        const progress = Math.min(window.scrollY / fadeEnd, 1);
        canvas.style.opacity = `${1 - 0.85 * progress}`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Particle canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId = 0;
    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    const particles = Array.from({ length: 280 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 1.2,
      vy: (Math.random() - 0.5) * 1.2,
      radius: 1 + Math.random() * 1.8,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const gradient = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 130);
      gradient.addColorStop(0, 'rgba(56, 132, 255, 0.22)');
      gradient.addColorStop(1, 'rgba(0, 0, 130, 0)');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 130, 0, Math.PI * 2);
      ctx.fill();

      particles.forEach((p) => {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const near = dist < 130;
        ctx.shadowBlur = near ? 10 : 0;
        ctx.fillStyle = `rgba(${near ? '147,197,253' : '255,255,255'},${near ? 0.9 : 0.35})`;
        ctx.shadowColor = '#93c5fd';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI);
        ctx.fill();
      });

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140) {
            const opacity = 0.28 - dist / 500;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(180,200,255,${Math.max(opacity, 0)})`;
            ctx.lineWidth = 1;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      ctx.shadowBlur = 0;
    };

    const update = () => {
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      });
    };

    const animate = () => {
      draw();
      update();
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', resize);
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className="bg-black text-white">
      {/* HERO */}
      <section id="home" className="relative isolate min-h-screen overflow-hidden">
        <canvas
          ref={canvasRef}
          className="pointer-events-none fixed inset-0 z-0"
          style={{ transition: 'opacity 0.1s linear' }}
        />
        {/* glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 left-1/2 z-0 h-[40rem] w-[60rem] -translate-x-1/2 rounded-full bg-blue-600/10 blur-3xl"
        />

        <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center gap-12 px-6 py-24 lg:flex-row lg:gap-20 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center lg:text-left"
          >
            <h1 className="mt-5 text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              <span className="bg-gradient-to-r from-white via-blue-100 to-blue-400 bg-clip-text text-transparent">
                Sandith Ganhewage
              </span>
            </h1>
            <p className="mt-4 max-w-xl text-xl text-gray-300 lg:text-2xl">
              CS, Electrical &amp; Computer Engineering @ Duke.
            </p>
            <div className="mt-7 flex justify-center gap-4 lg:justify-start">
              <a
                href="https://github.com/sganhewage"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 transition-colors hover:text-blue-400"
                aria-label="GitHub"
              >
                <FaGithub className="h-6 w-6" />
              </a>
              <a
                href="https://linkedin.com/in/sandith-ganhewage"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 transition-colors hover:text-blue-400"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="h-6 w-6" />
              </a>
              <a
                href="mailto:sandith.ganhewage@duke.edu"
                className="text-gray-300 transition-colors hover:text-blue-400"
                aria-label="Email"
              >
                <FaEnvelope className="h-6 w-6" />
              </a>
            </div>
            <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row lg:items-start">
              <a
                href="#experiences"
                className="group inline-flex items-center gap-2 rounded-md border border-blue-400 bg-blue-500/10 px-5 py-2.5 text-base font-semibold text-blue-300 transition-all hover:bg-blue-400 hover:text-white"
              >
                View my work
                <FiArrowDown className="transition-transform group-hover:translate-y-0.5" />
              </a>
              <a
                href="SandithGanhewage_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-5 py-2.5 text-base font-semibold text-gray-200 transition-colors hover:bg-white/10"
              >
                Resume <FiExternalLink className="h-4 w-4" />
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="relative"
          >
            <div className="absolute -inset-3 rounded-full bg-gradient-to-tr from-blue-500/30 via-purple-500/20 to-transparent blur-2xl" />
            <div className="relative rounded-full border-[6px] border-blue-400/70 p-1 shadow-2xl shadow-blue-500/20">
              <img
                src="headshot.jpg"
                alt="Sandith Ganhewage"
                className="h-72 w-72 rounded-full object-cover sm:h-80 sm:w-80"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ABOUT / EDUCATION */}
      {/* <section id="about" className="relative z-10 border-t border-white/5 bg-gradient-to-b from-black to-gray-950 py-24">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <h2 className="mt-2 text-4xl font-bold sm:text-5xl">About me</h2>

          <div className="mt-10 grid gap-6 lg:grid-cols-5">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-3 space-y-4 text-lg leading-relaxed text-gray-300"
            >
              <p>
                I&apos;m an undergraduate at Duke studying Computer Science and Electrical &amp; Computer Engineering. I like
                building things that sit between the application layer and the metal — full-stack AI products,
                low-latency systems, and embedded hardware tooling.
              </p>
              <p>
                Most recently I was a founding engineer at <span className="text-blue-300">o11</span> (Y Combinator W26),
                building a RAG-driven platform for bankers. This summer I&apos;m headed to{' '}
                <span className="text-blue-300">AWS</span> as an SDE intern. Before that I shipped embedded systems
                tooling at Qorvo and ML research at the Duke CEI Lab.
              </p>
              <p>
                When I&apos;m not shipping code, I&apos;m racking up units in my home lab, building order books for fun, or
                helping out with one of the tech orgs on campus.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-2"
            >
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-blue-950/40 via-gray-900/60 to-gray-900 p-6 shadow-xl">
                <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-blue-500/20 blur-3xl" />
                <div className="relative">
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-lg bg-blue-500/15 text-blue-300 ring-1 ring-blue-400/30">
                      <HiOutlineAcademicCap className="h-6 w-6" />
                    </span>
                    <span className="text-sm uppercase tracking-wider text-blue-300">Education</span>
                  </div>
                  <h3 className="mt-4 text-2xl font-bold leading-tight">Duke University</h3>
                  <p className="mt-1 text-gray-300">
                    B.S. in Computer Science <span className="text-gray-500">+</span> Electrical &amp; Computer Engineering
                  </p>
                  <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-400">
                    <span className="inline-flex items-center gap-1.5">
                      <FiMapPin className="h-4 w-4" /> Durham, NC
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <FiCalendar className="h-4 w-4" /> Expected May 2028
                    </span>
                  </div>
                  <div className="mt-5 grid grid-cols-2 gap-3">
                    <Stat label="GPA" value="3.98 / 4.00" />
                    <Stat label="Honors" value="Dean's List w/ Distinction" />
                  </div>
                  <p className="mt-4 text-sm text-blue-200/80">J. Welch Hariss Scholar</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section> */}

      {/* EXPERIENCES (timeline) */}
      <section id="experiences" className="relative z-10 bg-gray-950 py-24">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <h2 className="mt-2 text-4xl font-bold sm:text-5xl">Experience</h2>

          <div className="relative mt-12">
            {/* vertical line */}
            <div className="pointer-events-none absolute left-4 top-2 bottom-2 hidden w-px bg-gradient-to-b from-blue-500/40 via-white/10 to-transparent md:block md:left-6" />

            <ol className="space-y-10">
              {experiences.map((exp, i) => (
                <motion.li
                  key={exp.company + exp.dates}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.55, delay: i * 0.05 }}
                  className="relative md:pl-16"
                >
                  {/* timeline dot */}
                  <span className="absolute left-4 top-6 hidden h-3 w-3 -translate-x-1/2 rounded-full bg-blue-400 shadow-[0_0_0_4px_rgba(59,130,246,0.18)] md:left-6 md:block" />

                  <article className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-gray-900/80 via-gray-900/40 to-gray-900/80 p-6 shadow-lg transition-all hover:border-blue-400/30 hover:shadow-blue-500/10 sm:p-8">
                    <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-blue-500/5 blur-3xl transition-opacity group-hover:opacity-100" />
                    <div className="relative flex flex-col gap-6 sm:flex-row sm:items-start">
                      <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] p-3">
                        {exp.logo}
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                          <h3 className="text-xl font-bold sm:text-2xl">
                            {exp.link ? (
                              <a
                                href={exp.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 transition-colors hover:text-blue-300"
                              >
                                {exp.company}
                                <FiExternalLink className="h-4 w-4 opacity-60" />
                              </a>
                            ) : (
                              exp.company
                            )}
                          </h3>
                          <span className="text-sm font-medium text-gray-400">{exp.dates}</span>
                        </div>
                        <p className="mt-1 italic text-blue-200/90">{exp.role}</p>
                        <p className="mt-1 inline-flex items-center gap-1.5 text-sm text-gray-400">
                          <FiMapPin className="h-3.5 w-3.5" /> {exp.location}
                        </p>
                        {exp.badges && (
                          <div className="mt-3 flex flex-wrap gap-2">
                            {exp.badges.map((b) => (
                              <span
                                key={b}
                                className="rounded-full border border-amber-300/30 bg-amber-400/10 px-2.5 py-0.5 text-xs font-medium text-amber-200"
                              >
                                {b}
                              </span>
                            ))}
                          </div>
                        )}
                        <ul className="mt-4 space-y-2 text-gray-300">
                          {exp.bullets.map((b) => (
                            <li key={b} className="flex gap-2.5 leading-relaxed">
                              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-blue-400" />
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </article>
                </motion.li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="relative z-10 bg-black py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="mt-2 text-4xl font-bold sm:text-5xl">Projects</h2>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((p, i) => (
              <motion.article
                key={p.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.06 }}
                className="group relative flex flex-col rounded-2xl border border-white/10 bg-gradient-to-br from-gray-900/80 to-gray-900/40 p-6 shadow-lg transition-all hover:-translate-y-1 hover:border-blue-400/40 hover:shadow-blue-500/10"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-xl font-bold">{p.title}</h3>
                  {p.badge && (
                    <span className="rounded-full border border-emerald-300/30 bg-emerald-400/10 px-2 py-0.5 text-[11px] font-medium text-emerald-200">
                      {p.badge}
                    </span>
                  )}
                </div>
                <p className="mt-3 text-gray-300">{p.description}</p>
                <ul className="mt-4 space-y-1.5 text-sm text-gray-400">
                  {p.bullets.map((b) => (
                    <li key={b} className="flex gap-2 leading-snug">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-blue-400/70" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-6">
                  <div className="mb-4 flex flex-wrap items-center gap-3">
                    {p.tech.map((t) => t)}
                  </div>
                  <div className="flex gap-3 text-blue-400">
                    {p.demo && (
                      <a
                        href={p.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Live demo"
                        className="rounded-md p-1.5 transition-colors hover:bg-blue-500/10 hover:text-blue-300"
                      >
                        <FiExternalLink className="h-5 w-5" />
                      </a>
                    )}
                    {p.github && (
                      <a
                        href={p.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="GitHub repo"
                        className="rounded-md p-1.5 transition-colors hover:bg-blue-500/10 hover:text-blue-300"
                      >
                        <FaGithub className="h-5 w-5" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="relative z-10 border-t border-white/5 bg-gray-950 py-24">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <h2 className="mt-2 text-4xl font-bold sm:text-5xl">Tools</h2>

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {skills.map((group, i) => (
              <motion.div
                key={group.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: (i % 2) * 0.08 }}
                className="rounded-2xl border border-white/10 bg-gradient-to-br from-gray-900/80 to-gray-900/40 p-6"
              >
                <h3 className="text-sm font-semibold uppercase tracking-wider text-blue-300">
                  {group.label}
                </h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item.name}
                      className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5 text-sm text-gray-200 transition-colors hover:border-blue-400/30 hover:bg-blue-500/10"
                    >
                      {item.icon}
                      {item.name}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* EXTRACURRICULARS */}
          <div id="extras" className="mt-16">
            <h3 className="text-2xl font-bold">Extracurriculars</h3>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {extracurriculars.map((e) => (
                <li
                  key={e.title}
                  className="rounded-xl border border-white/10 bg-white/[0.02] p-4 transition-colors hover:border-blue-400/20"
                >
                  <p className="text-sm font-medium text-gray-100">{e.title}</p>
                  <p className="mt-1 text-xs text-gray-400">
                    {e.location} · {e.dates}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* RESUME */}
      <section id="resume" className="relative z-10 border-t border-white/5 bg-black py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          
        <h2 className="mt-2 text-4xl font-bold sm:text-5xl">Resume</h2>
          <div className="mt-10 grid items-start gap-10 lg:grid-cols-5">
            
            <div className="lg:col-span-2">
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <a
                  href="SandithGanhewage_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-md border border-blue-400 bg-blue-500/10 px-5 py-2.5 text-base font-semibold text-blue-300 transition-colors hover:bg-blue-400 hover:text-white"
                >
                  Download PDF
                  <FiExternalLink className="h-4 w-4" />
                </a>
                <a
                  href="mailto:sandith.ganhewage@duke.edu"
                  className="inline-flex items-center justify-center gap-2 rounded-md border border-white/10 bg-white/5 px-5 py-2.5 text-base font-semibold text-gray-200 transition-colors hover:bg-white/10"
                >
                  Get in touch <FaEnvelope className="h-4 w-4" />
                </a>
              </div>
            </div>

            <div className="lg:col-span-3">
              <div className="h-[80vh] w-full overflow-hidden rounded-lg border border-white/10 bg-white shadow-2xl">
                <iframe
                  src="SandithGanhewage_Resume.pdf"
                  className="h-full w-full"
                  title="Sandith Ganhewage Resume Preview"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-white/5 bg-black py-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 px-6 text-sm text-gray-500 sm:flex-row sm:justify-between lg:px-8">
          <p>© {new Date().getFullYear()} Sandith Ganhewage.</p>
          <div className="flex gap-4">
            <a
              href="https://github.com/sganhewage"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400"
              aria-label="GitHub"
            >
              <FaGithub className="h-5 w-5" />
            </a>
            <a
              href="https://linkedin.com/in/sandith-ganhewage"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="h-5 w-5" />
            </a>
            <a
              href="mailto:sandith.ganhewage@duke.edu"
              className="hover:text-blue-400"
              aria-label="Email"
            >
              <FaEnvelope className="h-5 w-5" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// Small helpers
// ────────────────────────────────────────────────────────────────────────────
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-blue-300">
      <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
      {children}
    </span>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-white/5 bg-white/[0.03] p-3">
      <p className="text-[11px] uppercase tracking-wider text-gray-500">{label}</p>
      <p className="mt-0.5 text-sm font-semibold text-white">{value}</p>
    </div>
  );
}
