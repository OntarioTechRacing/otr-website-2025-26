'use client';

import Image from "next/image";
import CarouselComponent from "@/components/Carousel";
import { useTheme } from '../../components/ThemeProvider';
import type { Headshot } from "./headshots";
import { useEffect, useState } from "react";
import "./card.css";
import { FaLinkedin } from 'react-icons/fa';
import { start } from "repl";




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
  const [department, setDepartment] = useState(0);

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
  const teams = data.map(team => team.team);
  console.log(teams);

  const isDark = theme === 'dark';
  const bg = isDark ? 'bg-[rgb(34,34,34)]' : 'bg-white';
  const text = isDark ? 'text-white' : 'text-gray-900';

  if (isLoading) return <p>Loading...</p>;
  if (!data.length) return <p>No data found.</p>;

  return (
    <>
    <div className={`${bg} ${theme}`}>
      <img src="/home-crew.png" className="w-full mt-[-100]"/>
      <button onClick={() => {
        setDepartment(prev => (prev - 1 + teams.length) % teams.length)
      }}>Previous</button>
        <h3
          onClick={() => {
            const id = teams[department];
            const departmentID = document.getElementById(id);

            if (departmentID) {
              departmentID.scrollIntoView({
                behavior: "smooth",
                block: "start"
              });
            }
          }}
          style={{ cursor: "pointer" }}
        >
          {teams[department]}
        </h3>
      <button onClick={() => {
        setDepartment(prev => (prev + 1) % teams.length)
      }}>Next</button>
        {data.map((teamObj, index) => (
          <div key={index} className="flex flex-col items-center">
            <h2 id={teamObj.team} className={`${teamObj.team} mt-5 mb-3 text-2xl font-bold underline block ${isDark ? 'text-white' : 'text-gray-900'}`}>{`${teamObj.team} Team`}</h2>
            <div className="flex flex-row flex-wrap gap-6 justify-center">
            {teamObj["team-members"].map((member, index) => (
              <div key={index} className="flex flex-col items-start card-container">
                <div className="card">
                  <div className="card-front flex flex-col items-center justify-center bg-linear-to-tl from-black to-neutral-800">
                    <div className="w-24 h-24 rounded-full border-4 border-orange-500 overflow-hidden">
                      <img src={member["image-name"]} alt={member.name} className="w-full h-full object-cover"/>
                    </div>
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
