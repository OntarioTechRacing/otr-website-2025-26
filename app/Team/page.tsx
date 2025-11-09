'use client';

import Image from "next/image";
import CarouselComponent from "@/components/Carousel";
import { useTheme } from '../../components/ThemeProvider';
import type { Headshot } from "./headshots";
import { useEffect, useState } from "react";
import "./card.css";
import { FaLinkedin } from 'react-icons/fa';




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

  const [data, setData] = useState<Headshot>([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/team-headshots.json')
      .then((res) => res.json())
      .then((data: Headshot) => {
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
    <div className={`${bg} ${theme}`}>
      <img src="/home-crew.png" className="w-full mt-[-100]"/>
        {data.map((teamObj, index) => (
          <div key={index} className="flex flex-col items-center">
            <h2 className={`${teamObj.team} mt-5 mb-3 text-2xl font-bold underline block ${isDark ? 'text-white' : 'text-gray-900'}`}>{`${teamObj.team} Team`}</h2>
            <div className="flex flex-row flex-wrap gap-6 justify-center">
            {teamObj["team-members"].map((member, index) => (
              <div key={index} className="flex flex-col items-start card-container">
                <div className="card">
                  <div className="card-front flex flex-col items-center justify-center bg-linear-to-tl from-black to-neutral-800">
                    <img src={member["image-name"]} alt={member.name}/>
                    <p className="font-bold text-lg">{member["name"]}</p>
                    <p>{member["role"]}</p>
                  </div>
                  <div className="card-back flex flex-col items-center justify-center">
                    <a href={member["linkedin-link"]} className="underline">
                      <FaLinkedin className="linkedin-icon" color="white" />
                    </a>
                    <p>{member["name"]}</p>
                  </div>
                </div>
              </div>
            ))}
            </div>
          </div>
          ))}
      </div>
    </>

  );
}
