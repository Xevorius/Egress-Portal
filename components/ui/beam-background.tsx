"use client";

import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface AnimatedGradientBackgroundProps {
  className?: string;
  intensity?: "subtle" | "medium" | "strong";
}

interface Beam {
  x: number;
  y: number;
  width: number;
  length: number;
  angle: number;
  speed: number;
  opacity: number;
  hue: number;
  pulse: number;
  pulseSpeed: number;
}

function createBeam(width: number, height: number): Beam {
    const angle = -35 + Math.random() * 10;
    return {
        x: Math.random() * width, // Ensure beams are within view
        y: Math.random() * height,
        width: 30 + Math.random() * 60,
        length: height * 2,
        angle: angle,
        speed: 0.3 + Math.random() * 0.8, // Slightly slower on mobile
        opacity: 0.1 + Math.random() * 0.2,
        hue: 190 + Math.random() * 70,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.015 + Math.random() * 0.025, // Adjust pulse speed
    };
}

export function BeamsBackground({
  className,
  intensity = "strong",
}: AnimatedGradientBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const beamsRef = useRef<Beam[]>([]);
  const animationFrameRef = useRef<number>(0);
  const lastFrameTimeRef = useRef<number>(0);
  const MINIMUM_BEAMS = 20;

  const opacityMap = {
    subtle: 0.5,
    medium: 0.75,
    strong: 0.9,
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Resize canvas efficiently
    const updateCanvasSize = () => {
        const dpr = window.devicePixelRatio || 1;
        const width = window.innerWidth;
        const height = window.innerHeight;
    
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        ctx.scale(dpr, dpr);
    
        // Adjust beam generation to be within the visible area
        const totalBeams = MINIMUM_BEAMS * (width < 768 ? 1 : 1.5); // Fewer beams on mobile
        beamsRef.current = Array.from({ length: totalBeams }, () =>
            createBeam(width, height) // Use unscaled dimensions
        );
    };

    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);

    const drawBeam = (ctx: CanvasRenderingContext2D, beam: Beam) => {
      ctx.save();
      ctx.translate(beam.x, beam.y);
      ctx.rotate((beam.angle * Math.PI) / 180);

      const pulsingOpacity =
        beam.opacity *
        (0.7 + Math.sin(beam.pulse) * 0.3) *
        opacityMap[intensity];

      const gradient = ctx.createLinearGradient(0, 0, 0, beam.length);
      gradient.addColorStop(0, `hsla(${beam.hue}, 85%, 65%, 0)`);
      gradient.addColorStop(0.5, `hsla(${beam.hue}, 85%, 65%, ${pulsingOpacity})`);
      gradient.addColorStop(1, `hsla(${beam.hue}, 85%, 65%, 0)`);

      ctx.fillStyle = gradient;
      ctx.fillRect(-beam.width / 2, 0, beam.width, beam.length);
      ctx.restore();
    };

    const animate = (time: number) => {
      if (!canvas || !ctx) return;

      const elapsed = time - lastFrameTimeRef.current;
      if (elapsed > 1000 / 30) {
        lastFrameTimeRef.current = time;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.filter = "blur(20px)";

        beamsRef.current.forEach((beam) => {
          beam.y -= beam.speed;
          beam.pulse += beam.pulseSpeed;

          if (beam.y + beam.length < 0) {
            beam.y = canvas.height + 100;
          }

          drawBeam(ctx, beam);
        });
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", updateCanvasSize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [intensity]);

  return (
    <div className={cn("relative min-h-screen w-full overflow-hidden", className)}>
    <canvas ref={canvasRef} className="absolute inset-0" />
    <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-background via-background/50 to-transparent" />
        <div className="relative z-10 flex h-screen w-full items-center justify-center">
            <div className="flex flex-col items-center justify-center gap-6 px-4 text-center">
                <motion.h1
                    className="text-6xl md:text-7xl lg:text-8xl font-semibold text-white tracking-tighter"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    EGRESS
                    <br />
                </motion.h1>
                <motion.p
                    className="text-lg md:text-2xl lg:text-3xl text-white/70 tracking-tighter"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    Your device, limitless
                </motion.p>
            </div>
        </div>
    </div>
  );
}
