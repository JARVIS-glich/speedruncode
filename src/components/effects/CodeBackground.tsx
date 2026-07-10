"use client";

import { useEffect, useRef } from "react";

const CODE_SNIPPETS = [
  `const buildApp = async () => {
  const ai = new AIAssistant();
  const code = await ai.generate();
  return code.deploy();
}`,
  `function optimizePrompt(input) {
  return input
    .refine()
    .contextualize()
    .execute();
}`,
  `const features = [
  'AI-powered',
  'Fast shipping',
  'Real projects'
];`,
  `async function learn() {
  const lesson = await watch();
  const quiz = await test();
  return quiz.pass() && build();
}`,
  `class Developer {
  constructor() {
    this.skills = [];
    this.xp = 0;
  }
  levelUp() {
    this.xp += 100;
  }
}`,
  `const track = {
  lessons: 44,
  duration: '15min',
  outcome: 'shipped'
};`,
];

export function CodeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    interface CodeBlock {
      x: number;
      y: number;
      code: string;
      lines: string[];
      currentLine: number;
      currentChar: number;
      speed: number;
      opacity: number;
      fadeIn: boolean;
      fadeOut: boolean;
      delay: number;
    }

    const codeBlocks: CodeBlock[] = [];

    // Create random code blocks
    for (let i = 0; i < 6; i++) {
      const snippet = CODE_SNIPPETS[Math.floor(Math.random() * CODE_SNIPPETS.length)];
      codeBlocks.push({
        x: Math.random() * (canvas.width - 400),
        y: Math.random() * (canvas.height - 200),
        code: snippet,
        lines: snippet.split('\n'),
        currentLine: 0,
        currentChar: 0,
        speed: 2 + Math.random() * 3,
        opacity: 0,
        fadeIn: true,
        fadeOut: false,
        delay: Math.random() * 200,
      });
    }

    let frame = 0;

    function animate() {
      if (!ctx || !canvas) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frame++;

      codeBlocks.forEach((block) => {
        if (block.delay > 0) {
          block.delay--;
          return;
        }

        // Fade in
        if (block.fadeIn && block.opacity < 0.08) {
          block.opacity += 0.001;
        } else if (block.fadeIn) {
          block.fadeIn = false;
        }

        // Fade out after some time
        if (frame % 800 === 0 && Math.random() > 0.5) {
          block.fadeOut = true;
        }

        if (block.fadeOut) {
          block.opacity -= 0.002;
          if (block.opacity <= 0) {
            // Reset with new code
            block.code = CODE_SNIPPETS[Math.floor(Math.random() * CODE_SNIPPETS.length)];
            block.lines = block.code.split('\n');
            block.currentLine = 0;
            block.currentChar = 0;
            block.x = Math.random() * (canvas.width - 400);
            block.y = Math.random() * (canvas.height - 200);
            block.fadeIn = true;
            block.fadeOut = false;
            block.delay = Math.random() * 200;
          }
        }

        // Type animation
        if (frame % Math.floor(block.speed) === 0 && !block.fadeOut) {
          if (block.currentLine < block.lines.length) {
            const line = block.lines[block.currentLine];
            if (block.currentChar < line.length) {
              block.currentChar++;
            } else {
              block.currentLine++;
              block.currentChar = 0;
            }
          } else {
            // Finished typing, restart
            block.currentLine = 0;
            block.currentChar = 0;
          }
        }

        // Draw
        ctx.save();
        ctx.font = "14px 'Geist Mono', monospace";
        ctx.fillStyle = `rgba(255, 255, 255, ${block.opacity})`;

        for (let i = 0; i <= block.currentLine && i < block.lines.length; i++) {
          const line = block.lines[i];
          const text = i === block.currentLine 
            ? line.substring(0, block.currentChar) 
            : line;
          ctx.fillText(text, block.x, block.y + i * 20);
        }

        ctx.restore();
      });

      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-none"
    />
  );
}
