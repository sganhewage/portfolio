'use client';

import { useEffect, useRef } from 'react';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

export default function PortfolioLanding() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

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

      // Draw mouse glow
      const gradient = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 120);
      gradient.addColorStop(0, 'rgba(0, 0, 130, 0.3)');
      gradient.addColorStop(1, 'rgba(0, 0, 130, 0)');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 120, 0, Math.PI * 2);
      ctx.fill();

      particles.forEach((p) => {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const alpha = dist < 120 ? 1 : 0.5;
        ctx.fillStyle = `rgba(255,255,255,${alpha})`;
        ctx.shadowBlur = dist < 120 ? 12 : 0;
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
            const opacity = 0.3 - dist / 500;
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
    <div className="relative bg-black min-h-screen">
      <canvas ref={canvasRef} className="fixed inset-0 z-0" />
      

      <main className="relative z-10 isolate px-6 lg:px-8">
        <div className="mx-auto h-screen flex flex-col lg:flex-row justify-center items-center lg:items-center gap-12">
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
                href="#projects"
                className="inline-block rounded-md border border-blue-400 px-5 py-2.5 text-sm font-semibold text-blue-400 hover:bg-blue-400 hover:text-white"
              >
                View my work ↓
              </a>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex justify-center border-blue-400 rounded-full border-8">
            <img
              src="/headshot.jpg"
              alt="Sandith Ganhewage"
              className="w-80 h-80 rounded-full object-cover shadow-lg"
            />
          </div>
        </div>
      </main>

    </div>
  );
}