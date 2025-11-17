'use client';

import Image from "next/image";

interface ApplicationProps {
  name: string;
  href: string;
  imageSrc: string;
  onHover?: () => void;
  onLeave?: () => void;
}

export default function ApplicationCard({ name, href, imageSrc, onHover, onLeave}: ApplicationProps) {
  return (
    <a 
      href={href} 
      target="_blank" 
      className="relative w-40 h-40 rounded-full overflow-hidden shadow-md group"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
   
      <Image
        src={imageSrc}
        alt={name}
        fill
        className="object-cover rounded-full transition-opacity duration-300 group-hover:opacity-80"
      />

        <div className="absolute inset-0 bg-black/50 group-hover:bg-black/60 transition-colors"></div>

     
      <div className="absolute inset-0 flex items-center justify-center">
        <p className="text-white text-lg font-semibold drop-shadow-md text-center">
          {name}
        </p>
      </div>
    </a>
  );
}
