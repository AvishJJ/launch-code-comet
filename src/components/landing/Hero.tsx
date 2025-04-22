import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Rocket, ArrowRight } from 'lucide-react';

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
      baseSize: number;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.baseSize = Math.random() * 1.5 + 0.5;
        this.radius = this.baseSize;
        
        // More vibrant colors with controlled opacity
        const hue = Math.random() * 60 + 240; // Blues to purples
        this.color = `hsla(${hue}, 80%, 70%, 0.6)`;
        
        this.velocity = {
          x: (Math.random() - 0.5) * 0.3,
          y: (Math.random() - 0.5) * 0.3,
        };
        this.alpha = Math.random() * 0.4 + 0.1;
      }

      draw() {
        if (!ctx) return;
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        
        // Add a subtle glow effect
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 8;
        ctx.fill();
        
        ctx.restore();
      }

      update(mouseX?: number, mouseY?: number) {
        this.x += this.velocity.x;
        this.y += this.velocity.y;

        // Interaction with mouse if provided
        if (mouseX !== undefined && mouseY !== undefined) {
          const dx = mouseX - this.x;
          const dy = mouseY - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 80) {
            // Slight repulsion effect
            this.x -= dx * 0.01;
            this.y -= dy * 0.01;
            
            // Increase size temporarily
            this.radius = this.baseSize * 1.5;
          } else {
            this.radius = this.baseSize;
          }
        }

        // Boundary check
        if (this.x < 0 || this.x > canvas.width) this.velocity.x *= -1;
        if (this.y < 0 || this.y > canvas.height) this.velocity.y *= -1;

        this.draw();
      }
    }

    let particles: Particle[] = [];
    const maxParticles = 120; // Slightly reduced for performance
    let mouseX: number | undefined;
    let mouseY: number | undefined;

    // Mouse movement tracking
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

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
        particles[i].update(mouseX, mouseY);
      }

      // Connect nearby particles with lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(200, 200, 255, ${0.08 * (1 - distance / 100)})`;
            ctx.lineWidth = 0.6;
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
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="relative flex min-h-screen items-center overflow-hidden bg-background text-foreground">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
        style={{ backgroundColor: 'transparent' }}
      />
      
      {/* Colored blurred orbs for visual interest */}
      <div className="absolute top-20 -left-32 h-96 w-96 rounded-full bg-primary/20 blur-[100px]" />
      <div className="absolute -bottom-40 right-20 h-96 w-96 rounded-full bg-blue-600/15 blur-[100px]" />
      
      <div className="container relative z-10 mx-auto px-6 py-24 text-center">
        <div className="mx-auto max-w-4xl">
          <div className="flex items-center justify-center mb-4">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-primary shadow-lg">
              <Rocket className="h-6 w-6 text-white" />
            </span>
          </div>
          
          <h1 className="font-display mb-6 text-5xl font-bold leading-tight tracking-tight text-white sm:text-6xl md:text-7xl animate-fade-in">
            <span className="block">Custom APIs.</span>
            <span className="text-gradient">Built for You.</span>
          </h1>
          
          <p className="mx-auto mb-10 max-w-2xl text-lg text-gray-300 sm:text-xl md:text-2xl animate-fade-in glass px-6 py-4 rounded-lg inline-block shadow-md">
            Describe your API backend project. <br/>
            <span className="font-semibold text-primary">We ship you a full codebase in minutes.</span>
          </p>
          
          <div className="flex justify-center items-center">
            <Link
              to="/auth"
              className="gradient-button group inline-flex items-center justify-center overflow-hidden rounded-lg bg-secondary px-8 py-4 font-medium text-white transition-all duration-300 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-primary animate-fade-in"
            >
              <span className="relative flex items-center gap-2">
                Launch Comet
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </div>
          
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto text-center">
            <div className="glass-card p-6 rounded-xl backdrop-blur-sm animate-fade-in transition-all duration-300 hover:scale-[1.02]">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-violet-500/20 mx-auto">
                <span className="text-2xl">📝</span>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-white">Describe</h3>
              <p className="text-sm text-gray-300">You fill in a simple prompt form.</p>
            </div>
            
            <div className="glass-card p-6 rounded-xl backdrop-blur-sm animate-fade-in transition-all duration-300 hover:scale-[1.02] delay-100">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/20 mx-auto">
                <span className="text-2xl">⚙️</span>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-white">We Build</h3>
              <p className="text-sm text-gray-300">We generate a full project — code, docs, everything.</p>
            </div>
            
            <div className="glass-card p-6 rounded-xl backdrop-blur-sm animate-fade-in transition-all duration-300 hover:scale-[1.02] delay-200">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-500/20 mx-auto">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-white">You Launch</h3>
              <p className="text-sm text-gray-300">You receive a ready-to-run ZIP in your inbox.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
