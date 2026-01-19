'use client';

import { useState } from "react";
import { useTheme } from '../../components/ThemeProvider';
import ApplicationCardForTeams from "@/components/ApplicationCardForTeams";
import { FaLinkedin } from 'react-icons/fa';
import applications from "../departments.json";
import teamData from "./team-headshots.json";
import type { Headshot } from "./headshots";
import "./card.css";
import Image from "next/image";

let defaultText = "";

export default function TeamPage() {
  const [bottomText, setBottomText] = useState(defaultText);
  const [department, setDepartment] = useState(0);

  // Use static data directly
  const data: Headshot = teamData as Headshot;

  // Map department names to team names for scrolling
  const departmentToTeamMap: { [key: string]: string } = {
    "Business": "Business",
    "Analysis": "Analysis",
    "Composites": "Composites",
    "Drivetrain & Braking": "Drivetrain and Braking",
    "Embedded Software": "Embedded Systems",
    "Hardware & Electronics": "Hardware and Electronics",
    "HV Systems": "HV Systems",
    "Manufacturing": "Manufacturing",
    "Web Software": "Software",
    "Suspension": "Suspension",
    "Vehicle Dynamics": "Vehicle Dynamics"
  };

  const list = applications.applications.map((dept) => {
    // Get the team name for scrolling, or use department name if no mapping exists
    const teamName = departmentToTeamMap[dept.name] || dept.name;
    return (
      <ApplicationCardForTeams
        name={dept.name}
        href={teamName}
        imageSrc={dept.image}
        key={dept.name}
        onHover={() => {
          setBottomText(dept.description)
        }}
        onLeave={() => {
          setBottomText(defaultText)
        }}
      />
    );
  });

  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const bg = isDark ? 'bg-[rgb(34,34,34)]' : 'bg-gray-200';
  const text = isDark ? 'text-white' : 'text-gray-900';

  if (!data.length) return <p>No data found.</p>;

  return (
    <>
      <div>
        <div
          className="min-h-screen bg-cover bg-center bg-fixed"
          style={{ backgroundImage: "url('/home-crew.png')" }}
        >
          <div className="pt-10 bg-black/50 min-h-screen">
            <div className="flex justify-center items-center min-h-screen">
              <div className="mt-[-150] grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
                {list}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`${bg} ${theme}`}>
        {data.map((teamObj, index) => (
          <div key={index} className="flex flex-col items-center">
            <h2 id={teamObj.team} className={`${teamObj.team} mt-5 mb-3 text-2xl font-bold underline block ${isDark ? 'text-white' : 'text-gray-900'}`}>{`${teamObj.team} Team`}</h2>
            <div className="flex flex-row flex-wrap gap-6 justify-center">
              {teamObj["team-members"].map((member, index) => (
                <div key={index} className="flex flex-col items-start card-container">
                  <div className="card">
                    <div className="card-front flex flex-col items-center justify-center bg-linear-to-tl from-black to-neutral-800">
                      <div className="w-30 h-30 rounded-full border-4 border-orange-500 overflow-hidden relative flex items-center justify-center bg-black">
                        
                        {member["image-name"] ? (
                          <Image
                            src={member["image-name"]}
                            alt={member.name}
                            fill
                            sizes="200px"
                            className="w-full h-full object-cover"
                            priority={false}
                          />
                        ) : (
                          <div className="w-full h-full bg-black rounded-full" />
                        )}

                      </div>

                      <p className="text-white font-bold text-lg text-center mx-5">
                        {member["name"]}
                      </p>
                      <p className="text-white">{member["role"]}</p>
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