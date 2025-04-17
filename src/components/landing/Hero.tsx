
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasDimensions();
    window.addEventListener('resize', setCanvasDimensions);

    // Particle class
    class Particle {
      x: number;
      y: number;
      radius: number;
      color: string;
      velocity: { x: number; y: number };
      alpha: number;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.radius = Math.random() * 2 + 1;
        this.color = `rgba(${Math.floor(Math.random() * 100 + 155)}, ${Math.floor(
          Math.random() * 100 + 155
        )}, 255, 1)`;
        this.velocity = {
          x: (Math.random() - 0.5) * 0.5,
          y: (Math.random() - 0.5) * 0.5,
        };
        this.alpha = Math.random() * 0.5 + 0.1;
      }

      draw() {
        if (!ctx) return;
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      update() {
        this.x += this.velocity.x;
        this.y += this.velocity.y;

        if (this.alpha >= 0.01) {
          this.alpha -= 0.005;
        }

        this.draw();
      }
    }

    let particles: Particle[] = [];
    const maxParticles = 150;

    // Initialize particles
    const init = () => {
      for (let i = 0; i < maxParticles; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        particles.push(new Particle(x, y));
      }
    };

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update particles
      for (let i = 0; i < particles.length; i++) {
        if (particles[i].alpha <= 0.01) {
          particles.splice(i, 1);
          const x = Math.random() * canvas.width;
          const y = Math.random() * canvas.height;
          particles.push(new Particle(x, y));
        } else {
          particles[i].update();
        }
      }

      // Connect nearby particles with lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(200, 200, 255, ${0.1 * (1 - distance / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    init();
    animate();

    return () => {
      window.removeEventListener('resize', setCanvasDimensions);
    };
  }, []);

  return (
    <div className="relative flex min-h-screen items-center overflow-hidden bg-[#0A0A23] text-white">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
        style={{ backgroundColor: 'transparent' }}
      />
      <div className="container z-10 mx-auto px-4 py-20 text-center">
        <h1 className="mb-6 text-5xl font-extrabold leading-tight text-white sm:text-6xl md:text-7xl">
          <span className="block">Custom APIs.</span>
          <span className="bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
            Built for You.
          </span>
        </h1>
        <p className="mx-auto mb-10 max-w-lg text-lg text-gray-300 sm:text-xl md:text-2xl">
          Describe your API backend project. We ship you a full codebase in minutes.
        </p>
        <Link
          to="/auth"
          className="group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 p-0.5 text-xl font-medium text-white hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-800"
        >
          <span className="relative flex items-center rounded-md bg-[#1E1E3F] px-8 py-4 transition-all duration-75 ease-in group-hover:bg-opacity-0">
            Launch Comet
          </span>
        </Link>
      </div>
    </div>
  );
}
