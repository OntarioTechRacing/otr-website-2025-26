'use client';

import Image from "next/image";
import CarouselComponent from "@/components/Carousel";
import { useTheme } from '../../components/ThemeProvider';
import { Headshot } from "./headshots";
import { useEffect, useState } from "react";




const departments = [
  {
    id: "business-team",
    team: "Business"
  }, 
  {
    id: "analysis-team",
    team: "Analysis"
  }, 
  {
    id: "composites-team",
    team: "Composites"
  },
  {
    id: "drivetrain-and-braking-team",
    team: "Drivetrain & Braking"
  },
  {
    id: "embedded-systems-team",
    team: "Embedded Systems"
  },
  {
    id: "hardware-and-electronics-team",
    team: "Hardware & Electronics"
  },
  {
    id: "hv-systems-team",
    team: "HV Systems"
  },
  {
    id: "manufacturing-team",
    team: "Manufacturing"
  },
  {
    id: "software-team",
    team: "Software"
  },
  {
    id: "suspension-team",
    team: "Suspension"
  },
  {
    id: "vehicle-dynamics-team",
    team: "Vehicle Dynamics"
  }
];

export default function TeamPage() {

  const [data, setData] = useState<Headshot[]>([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/team-headshots.json')
      .then((res) => res.json())
      .then((data: Headshot[]) => {
        setData(data);
        setLoading(false);
        console.log(data);
      });
  }, []);



  const {theme, setTheme} = useTheme();


  const isDark = theme === 'dark';
  const bg = isDark ? 'bg-[rgb(34,34,34)]' : 'bg-white';
  const text = isDark ? 'text-white' : 'text-gray-900';

  if (isLoading) return <p>Loading...</p>;
  if (!data.length) return <p>No data found.</p>;

  return (
    <>
      <img src="/home-crew.png" className="w-full"/>
      <div className={`${bg} ${theme}`}>
        {departments.map((department, index) => ( 
          <div key={index} className="flex justify-center">
          <h2 className={`${department.id} text-2xl font-bold underline ${isDark ? 'text-white' : 'text-gray-900'}`}>{`${department.team} Team`}</h2>
          </div>
          ))}
      </div>
    </>

  );
}
