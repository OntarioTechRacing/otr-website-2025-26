'use client';

import Image from "next/image";

interface ApplicationProps {
  name: string;
  href: string;
  imageSrc: string;
  onHover?: () => void;
  onLeave?: () => void;
}

function normalizeSupabaseUrl(url: string): string {
  return url.replace(/([^:]\/)\/+/g, '$1');
}

export default function ApplicationCard({ name, href, imageSrc, onHover, onLeave}: ApplicationProps) {
  const src = imageSrc ? normalizeSupabaseUrl(imageSrc) : '';
  const isRemote = src.startsWith('http://') || src.startsWith('https://');

  return (
    <a 
      href={href} 
      target="_blank" 
      className="relative block w-40 h-40 rounded-full overflow-hidden shadow-md group"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <div className="absolute inset-0">
        <Image
          src={src || '/join-us/placeholder.png'}
          alt={name}
          fill
          sizes="10rem"
          unoptimized={isRemote}
          className="object-cover rounded-full transition-opacity duration-300 group-hover:opacity-80"
        />
      </div>

        <div className="absolute inset-0 bg-black/50 group-hover:bg-black/60 transition-colors"></div>

     
      <div className="absolute inset-0 flex items-center justify-center">
        <p className="text-white text-lg font-semibold drop-shadow-md text-center">
          {name}
        </p>
      </div>
    </a>
  );
}
