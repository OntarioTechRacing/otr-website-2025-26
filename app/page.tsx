import Image from "next/image";
import StatsCard from "@/components/StatsCard";

export default function Home() {
  return (
    <>
      <video src="/otrVideo.mp4" autoPlay loop muted playsInline className="w-full" />
      
      <div className="bg-[rgb(34,34,34)] min-h-screen flex items-center justify-center gap-24">
        <div className="flex-1 max-w-2xl">
          <p className="text-orange-500 text-lg font-bold mb-3 tracking-wide">Ontario Tech Racing</p>
          <h1 className="text-white text-6xl font-bold mb-3 leading-tight">Who are we?</h1>
          <div className="w-16 h-1 bg-orange-500 mb-4"></div>
          <p className="text-gray-300 text-base leading-relaxed mb-12">
            We are a team of 71 passionate engineering and business students who design, manufacture, and market a Formula-style electric race car while staying within a strict budget. Every year at the Michigan International Speedway, the team competes in Formula SAE with other universities across America, showcasing innovation in vehicle design, build quality, and team operations. With ten technical and three business departments, the team of students gain incredible hands-on experiences as a fully functioning motorsports team.
          </p>

          <div className="flex flex-wrap gap-5">
            <StatsCard value="6" label="Years of<br />Experience" />
            <StatsCard value="4" label="Electric Cars<br />Built" />
            <StatsCard value="13" label="Departments" />
            <StatsCard value="71" label="Skilled<br />Members" />
          </div>
        </div>

        <div>
          <img src="/home-crew.png" alt="Ontario Tech Racing Team" className="w-full max-w-2xl rounded-2xl border-4 border-orange-500 shadow-2xl" />
        </div>
      </div>
    </>
  );
}
