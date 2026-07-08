"use client";

import { useEffect, useRef } from "react";

const CHARS = "ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ0123456789<>/\\|[]{}";

interface Column {
  y: number;           // current row
  speed: number;       // rows per frame
  charTimer: number;   // how often char changes
  charFrame: number;
  char: string;
  trailLength: number; // how many lit cells behind lead
  vibrate: number;     // horizontal jitter amount
}

export function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const FS = 14; // font size / column width
    let columns: Column[] = [];
    let animId: number;
    let frame = 0;

    function randomChar() {
      return CHARS[Math.floor(Math.random() * CHARS.length)];
    }

    function resize() {
      canvas!.width  = window.innerWidth;
      canvas!.height = window.innerHeight;
      const count = Math.floor(canvas!.width / FS);
      columns = Array.from({ length: count }, () => ({
        y:           Math.random() * -(canvas!.height / FS) * 2,
        speed:       0.2 + Math.random() * 0.6,      // varied fall speeds
        charTimer:   2 + Math.floor(Math.random() * 6), // how many frames between char change
        charFrame:   0,
        char:        randomChar(),
        trailLength: 8 + Math.floor(Math.random() * 20),
        vibrate:     Math.random() > 0.85 ? 1 : 0,   // 15% of columns vibrate
      }));
    }

    function draw() {
      frame++;

      // Dark fade — less opacity = longer, more visible trails
      ctx!.fillStyle = "rgba(0,0,0,0.04)";
      ctx!.fillRect(0, 0, canvas!.width, canvas!.height);

      columns.forEach((col, i) => {
        const x = i * FS + (col.vibrate ? Math.sin(frame * 0.3 + i) * 1.5 : 0);
        const leadY = col.y;

        // Update char on timer
        col.charFrame++;
        if (col.charFrame >= col.charTimer) {
          col.char = randomChar();
          col.charFrame = 0;
        }

        // Draw trail — fading brightness from lead downward
        for (let t = col.trailLength; t >= 0; t--) {
          const cy = leadY - t;
          if (cy < 0) continue;
          const py = cy * FS;
          if (py > canvas!.height) continue;

          const trailChar = t === 0 ? col.char : randomChar();
          const alpha = t === 0 ? 1 : (1 - t / col.trailLength) * 0.7;

          if (t === 0) {
            // Bright white-green lead
            ctx!.fillStyle = `rgba(180,255,180,${alpha})`;
            ctx!.shadowColor = "#00ff41";
            ctx!.shadowBlur = 8;
          } else if (t < 3) {
            // Near-lead — bright green
            ctx!.fillStyle = `rgba(0,255,65,${alpha})`;
            ctx!.shadowColor = "#00ff41";
            ctx!.shadowBlur = 4;
          } else {
            // Dim trail
            ctx!.fillStyle = `rgba(0,${Math.floor(100 + alpha * 155)},40,${alpha * 0.6})`;
            ctx!.shadowBlur = 0;
          }

          ctx!.font = `${FS}px monospace`;
          ctx!.fillText(trailChar, x, py);
        }

        ctx!.shadowBlur = 0;

        // Advance position
        col.y += col.speed;

        // Reset when fully off screen
        if (col.y * FS > canvas!.height + col.trailLength * FS) {
          col.y           = -col.trailLength - Math.random() * 20;
          col.speed       = 0.2 + Math.random() * 0.6;
          col.trailLength = 8 + Math.floor(Math.random() * 20);
          col.vibrate     = Math.random() > 0.85 ? 1 : 0;
        }
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
        opacity: 0.35,
      }}
    />
  );
}
