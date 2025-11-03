'use client';

import Image from "next/image";

interface ApplicationProps {
  name: string;
  href: string;
  imageSrc: string;
}

export default function ApplicationCard({ name, href, imageSrc }: ApplicationProps) {
  return (
    <a href={href} target="_blank" className="group [perspective:1000px]">
      <div className="relative w-40 h-40 rounded-full [transform-style:preserve-3d] duration-700 group-hover:[transform:rotateY(180deg)] shadow-md">
        
        {/* Front side (text) */}
        <div className="absolute inset-0 flex items-center justify-center bg-white text-black rounded-full [backface-visibility:hidden]">
          <p className="text-lg font-semibold text-center">{name}</p>
        </div>

        {/* Back side (image) */}
        <div className="absolute inset-0 rounded-full overflow-hidden [transform:rotateY(180deg)] [backface-visibility:hidden]">
          <Image
            src={imageSrc}
            alt={name}
            fill
            className="object-cover rounded-full"
          />
        </div>
      </div>
    </a>
  );
}
