'use client';

import Image from "next/image";
import CarouselComponent from "@/components/Carousel";
import { useTheme } from '../../components/ThemeProvider';


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
  const {theme, setTheme} = useTheme();


  const isDark = theme === 'dark';
  const bg = isDark ? 'bg-[rgb(34,34,34)]' : 'bg-white';
  const text = isDark ? 'text-white' : 'text-gray-900';

  return (
    <>
      <img src="/home-crew.png" className="w-full"/>
      <div className={`${bg} ${theme}`}>
        {departments.map((department, index) => ( 
          <div className="flex justify-center">
          <h2 key={index} className={`${department.id} text-2xl font-bold underline ${isDark ? 'text-white' : 'text-gray-900'}`}>{department.team}</h2>
          </div>
          ))}
      </div>
    </>

  );
}
