"use client";

import { useEffect, useState } from "react";
import { MatrixRain } from "./MatrixRain";
import { ScanLine } from "./ScanLine";

export function MatrixEffects() {
  const [isMatrix, setIsMatrix] = useState(true);

  useEffect(() => {
    function check() {
      const theme = document.documentElement.getAttribute("data-theme");
      setIsMatrix(theme !== "light");
    }

    check();

    // Watch for theme changes
    const observer = new MutationObserver(check);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);

  if (!isMatrix) return null;
  return (
    <>
      <ScanLine />
      <MatrixRain />
    </>
  );
}
