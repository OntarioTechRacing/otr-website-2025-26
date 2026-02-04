'use client';

import "./card.css";
import ApplicationCardForTeams from "@/components/ApplicationCardForTeams";
import teamData from "./team-headshots.json";
import applications from "../departments.json";
import Image from "next/image";
import { useState } from "react";
import { useTheme } from '../../components/ThemeProvider';
import { FaLinkedin } from 'react-icons/fa';
// import { createClient } from "@/lib/supabase/client";
import { Suspense } from "react";
import type { Headshot } from "./headshots";

let defaultText = "";

type Member = {
  id: number;
  Name: string;
  Department: string;
  Headshot: string | null;
  LinkedIn: string | undefined;
  Role: string | null;
  // add other fields you use
};

const Departments = [
  "Business",
  "Analysis",
  "Composites",
  "Drivetrain and Braking",
  "Embedded Software",
  "Hardware and Electronics",
  "HV Systems",
  "Manufacturing",
  "Software",
  "Suspension",
  "Vehicle Dynamics"
]

// async function TeamMembers() {
//   const supabase = await createClient();
//   const { data: TeamMembers } = await supabase.from("TeamMembers").select();

// }

export default function TeamPage({ members }: { members: Member[] }) {
  console.log("Members:", members);
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
    "Software": "Software",
    "Suspension": "Suspension",
    "Vehicle Dynamics": "Vehicle Dynamics"
  };

  const grouped = members.reduce<Record<string, Member[]>>((acc, m) => {
    const dept = m.Department ?? "Other";
    (acc[dept] ??= []).push(m);
    return acc;
  }, {});
  

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
  const accentColor = isDark ? 'orange' : '[#48B4FF]';

  if (!data.length) return <p>No data found.</p>;

  return (
    <>
    <div className="p-6 space-y-10">
      
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
        {Departments.map((dept) => {
          const deptMembers = grouped[dept] ?? [];
          if (deptMembers.length === 0) return null;

          return (
            <section key={dept} className="flex flex-col items-center">
            <h3 id={dept} className={`${dept} text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold my-2 md:my-3 leading-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>{`${dept} Team`}</h3>
            <div className="flex flex-row flex-wrap gap-6 justify-center">
            {deptMembers.map((m, index) => (
              <div key={index} className="flex flex-col items-start card-container"> 
                <div className="card">
                  <div className="card-front flex flex-col items-center justify-center bg-linear-to-tl from-black to-neutral-800">
                    <div className={`w-30 h-30 rounded-full border-4 border-${isDark ? 'orange-500' : '[#48B4FF]'} overflow-hidden relative flex items-center justify-center bg-black`}>
                      
                      {m.Headshot ? 
                      (
                        <Image
                          src={`${m.Headshot}?width=200&height=200&resize=cover`}
                          alt={m.Name}
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
                      {m.Name}
                    </p>
                    <p className="text-white">{m.Role}</p>
                  </div>
                  <div className="card-back flex flex-col items-center justify-center">
                    <a href={m.LinkedIn} className="underline">
                      <FaLinkedin className="linkedin-icon" color="white" />
                    </a>
                    <p>{m.Name}</p>
                  </div>
                </div>
              </div> 
              ))}
              </div>
              </section>
                );
              })}

{/* Original Rendering (Pre SupaBase) */}
        {/* {data.map((teamObj, index) => (
          <div key={index} className="flex flex-col items-center">
            <h3 id={teamObj.team} className={`${teamObj.team} text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold my-2 md:my-3 leading-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>{`${teamObj.team} Team`}</h3>
            <div className="flex flex-row flex-wrap gap-6 justify-center">
              {teamObj["team-members"].map((member, index) => (
                <div key={index} className="flex flex-col items-start card-container">
                  <div className="card">
                    <div className="card-front flex flex-col items-center justify-center bg-linear-to-tl from-black to-neutral-800">
                      <div className={`w-30 h-30 rounded-full border-4 border-${isDark ? 'orange-500' : '[#48B4FF]'} overflow-hidden relative flex items-center justify-center bg-black`}>
                        
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
        ))} */}
      </div>
    </>
  );
}