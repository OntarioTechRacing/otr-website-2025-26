"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const TOTAL_FRAMES = 152;

const frames = Array.from({ length: TOTAL_FRAMES }, (_, i) => {
  const padded = i.toString().padStart(5, "0"); 
  return `/parallax/frame${padded}.png`;
});

export default function ParallaxSpin() {
  const [frameIndex, setFrameIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollY / maxScroll;

      const index = Math.floor(progress * (frames.length - 1));
      setFrameIndex(Math.min(frames.length - 1, Math.max(0, index)));
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="spin-section">
      <div className="spin-wrapper">
        <Image
          src={frames[frameIndex]}
          alt="Spin animation"
          width={900}
          height={900}
          className="spin-img"
          priority
        />
      </div>
    </section>
  );
}