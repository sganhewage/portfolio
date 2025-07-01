'use client';

import { useState, useEffect, useRef } from 'react';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiExternalLink } from 'react-icons/fi';

export default function PortfolioLanding() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const scrolledRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const updateCanvasOpacity = () => {
      const experiences = document.getElementById('experiences');
      if (!experiences) return;

      const fadeEnd = experiences.offsetTop;
      const scrollY = window.scrollY;
      const progress = Math.min(scrollY / fadeEnd, 1);
      const newOpacity = 1 - 0.8 * progress;

      canvas.style.opacity = `${newOpacity}`;
      requestAnimationFrame(updateCanvasOpacity);
    };

    requestAnimationFrame(updateCanvasOpacity);

    return () => cancelAnimationFrame(updateCanvasOpacity as any);
  }, []);


  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.3 });
  useEffect(() => {
    if (inView) controls.start({ opacity: 1, y: 0 });
    else controls.start({ opacity: 0, y: 50 });
  }, [inView, controls]);

  const projectControls = useAnimation();
  const [projectRef, projectInView] = useInView({ threshold: 0.2 });
  useEffect(() => {
    if (projectInView) {
      projectControls.start({ opacity: 1, y: 0 });
    } else {
      projectControls.start({ opacity: 0, y: 50 });
    }
  }, [projectInView, projectControls]);


  // Particle canvas setup
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = Array.from({ length: 300 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 1.5,
      vy: (Math.random() - 0.5) * 1.5,
      radius: 1 + Math.random() * 2,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const gradient = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 120);
      gradient.addColorStop(0, scrolledRef.current ? 'rgba(0, 0, 130, 0.1)' : 'rgba(0, 0, 130, 0.3)');
      gradient.addColorStop(1, 'rgba(0, 0, 130, 0)');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 120, 0, Math.PI * 2);
      ctx.fill();

      particles.forEach((p) => {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const alpha = dist < 120 ? (scrolledRef.current ? 0.4 : 1) : 0.3;
        ctx.shadowBlur = dist < 120 && !scrolledRef.current ? 12 : 0;
        ctx.fillStyle = `rgba(255,255,255,${alpha})`;
        ctx.shadowColor = 'white';
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
            const opacity = (scrolledRef.current ? 0.01 : 0.3) - dist / 500;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255,255,255,${opacity})`;
            ctx.lineWidth = 1.2;
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
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <>
      <div className="relative bg-black min-h-screen">
        <canvas
          ref={canvasRef}
          className="fixed inset-0 z-0 transition-opacity duration-700 ease-in-out pointer-events-none"
          style={{ transition: 'opacity 0.1s linear' }}
        />
        <main className="relative z-10 isolate px-6 lg:px-8">
          <div id="home" className="mx-auto h-screen flex flex-col lg:flex-row justify-center items-center gap-12">
            {/* Left Side */}
            <div className="text-center lg:text-left">
              <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl">
                <span className="text-blue-400">Sandith Ganhewage</span>
              </h1>
              <p className="mt-4 text-2xl text-white">
                Software Engineer, Student, Tech Enthusiast.
              </p>
              <div className="mt-6 flex justify-center lg:justify-start gap-5">
                <a href="https://github.com/sganhewage" target="_blank" rel="noopener noreferrer">
                  <FaGithub className="text-white hover:text-blue-400 h-6 w-6" />
                </a>
                <a href="https://linkedin.com/in/sandith-ganhewage" target="_blank" rel="noopener noreferrer">
                  <FaLinkedin className="text-white hover:text-blue-400 h-6 w-6" />
                </a>
                <a href="mailto:sandith.ganhewage@duke.edu">
                  <FaEnvelope className="text-white hover:text-blue-400 h-6 w-6" />
                </a>
              </div>
              <div className="mt-10">
                <a
                  href="#experiences"
                  className="inline-block rounded-md border border-blue-400 px-5 py-2.5 text-xl font-bold text-blue-400 hover:bg-blue-400 hover:text-white"
                >
                  View my work ↓
                </a>
              </div>
            </div>

            {/* Right Side */}
            <div className="flex justify-center border-blue-400 rounded-full border-8">
              <img
                src="headshot.jpg"
                alt="Sandith Ganhewage"
                className="w-80 h-80 rounded-full object-cover shadow-lg"
              />
            </div>
          </div>
        </main>
      </div>

      {/* Experiences Section */}
      <div id="experiences" className="text-white py-20 min-h-screen">
        <div className="container mx-auto">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={controls}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <h2 className="text-5xl font-bold mb-6">Featured Experiences</h2>
            <div className="space-y-16">
              {/* Experience 1 */}
              <div className="flex flex-col lg:flex-row gap-8 bg-gray-800/50 p-6 rounded-xl shadow-md items-center hover:scale-105 transition-transform duration-300">
                <div className="text-center lg:text-left">
                  <h2 className="text-2xl font-bold">Qorvo Inc.</h2>
                  <h3 className="text-xl font-semibold italic mt-2">Embedded Systems Engineering Intern</h3>
                  <p className="mt-2 text-gray-300">- Designed efficient embedded systems workflow for chip sorting in a test engineering lab</p>
                  <p className="mt-2 text-gray-300">- Created web frontend with React and Next.js to control and monitor sorting device</p>
                  <p className="mt-2 text-gray-300">- Configured full bluetooth interface with python for communication from frontend to sorting device</p>

                </div>
                <div className=" p-4 bg-amber-50 rounded-lg shadow-md h-full">
                  <img
                    src="qorvo-logo.png"
                    alt="Qorvo Logo"
                    className="h-25 object-contain"
                  />
                </div>
              </div>

              {/* Experience 2 */}
              <div className="flex flex-col lg:flex-row gap-8 bg-gray-800/50 p-6 rounded-xl shadow-md items-center hover:scale-105 transition-transform duration-300">
                <div className="text-center lg:text-left">
                  <h2 className="text-2xl font-bold">Duke CEI Lab</h2>
                  <h3 className="text-xl font-semibold italic mt-2">Undergraduate Researcher</h3>
                  <p className="mt-2 text-gray-300">- Tested and researched machine learning model quantization and distillation techniques to reduce model size</p>
                  <p className="mt-2 text-gray-300">- Researched genome-sequencing-focused applications for increased efficiency using CAMs (content addressable memory).</p>
                </div>
                <div className="rounded-lg shadow-md h-full">
                  <img
                    src="duke-cei-logo.svg"
                    alt="Duke CEI Logo"
                    className="h-25 object-contain"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Projects Section */}
      <div id="projects" className="text-white py-20 min-h-screen bg-gray-950">
        <div className="container mx-auto">
          <motion.div
            ref={projectRef}
            initial={{ opacity: 0, y: 50 }}
            animate={projectControls}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <h2 className="text-5xl font-bold mb-12 text-center"> Featured Projects</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {/* SmartStudy */}
              <div className="bg-gray-800/60 rounded-xl p-6 shadow-lg flex flex-col justify-between min-h-[400px] hover:scale-105 transition-transform duration-300">
                <div>
                  <h3 className="text-xl font-bold mb-3">SmartStudy</h3>
                  <p className="text-gray-300 mb-4">
                    A full-stack study aid platform where users upload notes or files and generate structured learning materials using LLMs — like flashcards, summaries, quizzes, and explanations.
                  </p>
                  <ul className="text-sm text-gray-400 list-disc pl-4 space-y-1">
                    <li>Built with React, Node.js, FastAPI, Tailwind, MongoDB</li>
                    <li>Auth-secured user dashboard with document upload & editing</li>
                    <li>Prompt-engineered Python backend for cost-efficient LLM inference</li>
                    <li>Hosted via Vercel with secure client-server boundaries</li>
                  </ul>
                </div>
                <div className="flex gap-4 mt-6 text-blue-400">
                  <a href="https://smart-study-lovat.vercel.app/login" target="_blank" title="SmartStudy Live App">
                    <FiExternalLink className="h-6 w-6 hover:text-blue-300" />
                  </a>
                  <a href="https://github.com/sganhewage/SmartStudy" target="_blank" title="GitHub Repo">
                    <FaGithub className="h-6 w-6 hover:text-blue-300" />
                  </a>
                </div>
              </div>

              {/* Home Lab */}
              <div className="bg-gray-800/60 rounded-xl p-6 shadow-lg flex flex-col justify-between min-h-[400px] hover:scale-105 transition-transform duration-300">
                <div>
                  <h3 className="text-xl font-bold mb-3">Home Lab Server</h3>
                  <p className="text-gray-300 mb-4">
                    Designed and deployed a private home server with user-friendly UI, Docker-hosted services, and VPN-secured access — replicating commercial NAS performance at a fraction of the cost.
                  </p>
                  <ul className="text-sm text-gray-400 list-disc pl-4 space-y-1">
                    <li>Built with headless Debian, CasaOS, Docker</li>
                    <li>Tailscale VPN for encrypted remote access</li>
                    <li>Account-based multi-app web interface</li>
                    <li>Runs media storage, dev environments, and secure exit node</li>
                  </ul>
                </div>
              </div>

              {/* NFL Stats Analyzer */}
              <div className="bg-gray-800/60 rounded-xl p-6 shadow-lg flex flex-col justify-between min-h-[400px] hover:scale-105 transition-transform duration-300">
                <div>
                  <h3 className="text-xl font-bold mb-3">NFL Stats Analyzer</h3>
                  <p className="text-gray-300 mb-4">
                    A desktop GUI app for scraping and visualizing decades of NFL player data. Includes interactive charts, caching, and search — all in a lightweight JavaFX application.
                  </p>
                  <ul className="text-sm text-gray-400 list-disc pl-4 space-y-1">
                    <li>Built with Java, JavaFX, SceneBuilder, JSoup</li>
                    <li>Scrapes and structures 20+ years of player stats</li>
                    <li>Integrated local caching for 30% performance boost</li>
                    <li>Modular UI built with SceneBuilder</li>
                  </ul>
                </div>
                <div className="flex gap-4 mt-6 text-blue-400">
                  <a href="https://github.com/sganhewage/NFL-Stats" target="_blank" title="GitHub Repo">
                    <FaGithub className="h-6 w-6 hover:text-blue-300" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div id="resume" className="text-white h-screen bg-gray-950">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-12 min-h-screen">
            
            {/* Left Side: Title + Button */}
            <div className="flex flex-col items-center justify-center text-center flex-1">
              <h2 className="text-5xl font-bold mb-8">Resume</h2>
              <a
                href="SandithGanhewage_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-md border border-blue-400 px-5 py-2.5 text-xl font-bold text-blue-400 hover:bg-blue-400 hover:text-white"
              >
                Download PDF
              </a>
            </div>

            {/* Right Side: Responsive Preview */}
            <div className="flex-1 w-full max-w-3xl">
              <div className="w-full h-[80vh] border rounded-md shadow-md overflow-hidden">
                <iframe
                  src="SandithGanhewage_Resume.pdf"
                  className="w-full h-full"
                  title="Sandith Ganhewage Resume Preview"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}
