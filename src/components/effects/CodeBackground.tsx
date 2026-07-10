"use client";

import { useEffect, useRef } from "react";

const CODE_LINES = [
  "import { useState, useEffect } from 'react';",
  "import { AIAssistant } from '@/lib/ai';",
  "",
  "export default function App() {",
  "  const [data, setData] = useState(null);",
  "  const [loading, setLoading] = useState(true);",
  "",
  "  useEffect(() => {",
  "    async function fetchData() {",
  "      const response = await fetch('/api/lessons');",
  "      const result = await response.json();",
  "      setData(result);",
  "      setLoading(false);",
  "    }",
  "    fetchData();",
  "  }, []);",
  "",
  "  if (loading) return <Spinner />;",
  "",
  "  return (",
  "    <div className='container'>",
  "      <h1>Learning Platform</h1>",
  "      {data.map((lesson) => (",
  "        <LessonCard",
  "          key={lesson.id}",
  "          title={lesson.title}",
  "          duration={lesson.duration}",
  "          xp={lesson.xp}",
  "        />",
  "      ))}",
  "    </div>",
  "  );",
  "}",
  "",
  "function LessonCard({ title, duration, xp }) {",
  "  return (",
  "    <div className='card'>",
  "      <h3>{title}</h3>",
  "      <p>{duration} minutes</p>",
  "      <span>+{xp} XP</span>",
  "    </div>",
  "  );",
  "}",
  "",
  "const config = {",
  "  api: process.env.NEXT_PUBLIC_API_URL,",
  "  features: ['AI', 'Real-time', 'Analytics'],",
  "  theme: 'dark',",
  "};",
  "",
  "class Developer {",
  "  constructor(name, level) {",
  "    this.name = name;",
  "    this.level = level;",
  "    this.xp = 0;",
  "  }",
  "",
  "  async completeLesson(lesson) {",
  "    this.xp += lesson.xp;",
  "    if (this.xp >= this.level * 100) {",
  "      this.levelUp();",
  "    }",
  "  }",
  "",
  "  levelUp() {",
  "    this.level++;",
  "    console.log(`Level up! Now level ${this.level}`);",
  "  }",
  "}",
  "",
  "async function buildWithAI(prompt) {",
  "  const ai = new AIAssistant();",
  "  const code = await ai.generate(prompt);",
  "  return code.deploy();",
  "}",
  "",
  "const tracks = [",
  "  { id: 1, name: 'AI Fundamentals' },",
  "  { id: 2, name: 'Cursor Mastery' },",
  "  { id: 3, name: 'Ship with AI' },",
  "];",
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

    const fontSize = 14;
    const lineHeight = 20;
    let scrollOffset = 0;

    function animate() {
      if (!ctx || !canvas) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Slowly scroll the code upwards
      scrollOffset += 0.2;
      if (scrollOffset > lineHeight * CODE_LINES.length) {
        scrollOffset = 0;
      }

      ctx.save();
      ctx.font = `${fontSize}px 'Geist Mono', 'Courier New', monospace`;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.06)';

      // Calculate how many lines we need to fill the screen
      const totalLines = Math.ceil(canvas.height / lineHeight) + CODE_LINES.length;
      
      // Draw code lines filling the entire screen
      for (let i = 0; i < totalLines; i++) {
        const lineIndex = i % CODE_LINES.length;
        const line = CODE_LINES[lineIndex];
        const y = (i * lineHeight) - scrollOffset;
        
        // Only draw if visible on screen
        if (y > -lineHeight && y < canvas.height + lineHeight) {
          // Add indentation for readability
          const x = 40;
          ctx.fillText(line, x, y);
        }
      }

      ctx.restore();

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
