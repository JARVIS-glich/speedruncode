"use client";

import { useEffect } from "react";

const CHARS = "ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ01234567890";

export function MatrixRain() {
  useEffect(() => {
    const drops: HTMLDivElement[] = [];
    const dropCount = 30;

    function createDrop() {
      const drop = document.createElement("div");
      drop.className = "matrix-char";
      drop.textContent = CHARS[Math.floor(Math.random() * CHARS.length)];
      drop.style.left = `${Math.random() * 100}vw`;
      drop.style.animationDuration = `${5 + Math.random() * 5}s`;
      drop.style.animationDelay = `${Math.random() * 5}s`;
      drop.style.fontSize = `${14 + Math.random() * 10}px`;
      document.body.appendChild(drop);
      drops.push(drop);

      // Change character occasionally
      const interval = setInterval(() => {
        drop.textContent = CHARS[Math.floor(Math.random() * CHARS.length)];
      }, 100);

      // Clean up after animation
      setTimeout(() => {
        clearInterval(interval);
        drop.remove();
        const idx = drops.indexOf(drop);
        if (idx > -1) drops.splice(idx, 1);
      }, (5 + Math.random() * 5) * 1000);
    }

    // Stagger initial creation
    for (let i = 0; i < dropCount; i++) {
      setTimeout(() => createDrop(), i * 200);
    }

    // Continuously spawn new drops
    const spawnInterval = setInterval(() => {
      if (drops.length < dropCount) createDrop();
    }, 500);

    return () => {
      clearInterval(spawnInterval);
      drops.forEach((d) => d.remove());
    };
  }, []);

  return null; // Renders directly to body
}
