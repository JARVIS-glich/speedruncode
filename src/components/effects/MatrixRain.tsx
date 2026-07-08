"use client";

import { useEffect, useRef } from "react";

export function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const CHARS = "ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉ01234567890<>{}[]";
    const FONT_SIZE = 14;
    let columns: number[] = [];
    let animId: number;

    function resize() {
      canvas!.width  = window.innerWidth;
      canvas!.height = window.innerHeight;
      const count = Math.floor(canvas!.width / FONT_SIZE);
      columns = Array.from({ length: count }, () => Math.random() * -100);
    }

    function draw() {
      // Fading trail
      ctx!.fillStyle = "rgba(0,0,0,0.05)";
      ctx!.fillRect(0, 0, canvas!.width, canvas!.height);

      ctx!.font = `${FONT_SIZE}px monospace`;

      columns.forEach((y, i) => {
        // Brightest (white-green) lead character
        const brightness = Math.random() > 0.95 ? "rgba(200,255,200,0.9)" : "rgba(0,255,65,0.7)";
        ctx!.fillStyle = brightness;
        const char = CHARS[Math.floor(Math.random() * CHARS.length)];
        ctx!.fillText(char, i * FONT_SIZE, y * FONT_SIZE);

        // Reset when off screen
        if (y * FONT_SIZE > canvas!.height && Math.random() > 0.975) {
          columns[i] = 0;
        }
        columns[i] += 0.5;
      });

      animId = requestAnimationFrame(draw);
    }

    resize();
    draw();
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 0,
        opacity: 0.25,
      }}
    />
  );
}
