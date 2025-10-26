'use client';

interface applicationProps {
    name: string;
    href: string;
}

export default function ApplicationCard({name, href}: applicationProps) {
    return <>
    <a href={href} target="_blank">
        <div className="bg-white text-black rounded-full w-40 h-40 flex justify-center items-center shadow-md hover:scale-105 transition-transform">
            <p className="text-lg font-semibold text-center">{name}</p>
        </div>
    </a>
    
    
    
    </>
} 
