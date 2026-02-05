'use client';

import "./card.css";
import ApplicationCardForTeams from "@/components/ApplicationCardForTeams";
import teamData from "./team-headshots.json";
import applications from "../departments.json";
import Image from "next/image";
import { useState } from "react";
import { useTheme } from '../../components/ThemeProvider';
import { FaLinkedin } from 'react-icons/fa';
import { addMember } from "../actions";
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
  const [open, setOpen] = useState(false);

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
  const inputStyleDark =
    "w-full px-4 py-2 rounded-md bg-neutral-800 border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-orange-500";
  const inputStyleLight =
    "w-full px-4 py-2 rounded-md bg-neutral-200 border border-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-500";


  if (!data.length) return <p>No data found.</p>;

  return (
    <>
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
        
      <div className={`${bg} ${theme}`}>
        {/* Used to insert member */}
    <div className="insert-member flex flex-col items-center p-10">
    {/* <form action={addMember}>
      <input type="text" name="memberName" placeholder="Name" required />
      <input type="text" name="memberDepartment" placeholder="Department" required />
      <input type="file" name="memberHeadshot" accept="image/*" required />
      <input type="text" name="memberRole" />
      <input type="text" name="memberLinkedIn" />
      <button type="submit">Add Member</button>
    </form> */}
      <button
        onClick={() => setOpen(true)}
        className={`px-5 py-2 ${isDark ? "bg-orange-500 text-white hover:bg-orange-600" : "bg-[#48B4FF] text-black hover:bg-blue-600"} font-semibold rounded-lg transition shadow hover:scale-110`}
      >
        Add Member
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-black/40 backdrop-blur-md"
          />
          <div className={`relative w-[90%] max-w-md p-8 ${isDark ? "bg-neutral-900 text-white" : "bg-neutral-200 text-black"} rounded-2xl shadow-2xl border border-neutral-700`}>
            <h2 className="text-2xl font-bold mb-6 text-center">
              Add New Member
            </h2>
            <form action={addMember} className="space-y-4">
              <input name="memberName" placeholder="Name" required className={isDark ? inputStyleDark : inputStyleLight} />
              <input name="memberDepartment" placeholder="Department" required className={isDark ? inputStyleDark : inputStyleLight} />
              <input
                type="file"
                name="memberHeadshot"
                required
                accept="image/*"
                className={`w-full text-sm file:mr-3 file:py-2 file:px-4 file:rounded-md file:border-0 ${isDark ? "file:bg-orange-500 file:text-white hover:file:bg-orange-600" : "file:bg-blue-500 file:text-black hover:file:bg-blue-600"}`}
              />
              <input name="memberRole" placeholder="Role" className={isDark ? inputStyleDark : inputStyleLight} />
              <input name="memberLinkedIn" placeholder="LinkedIn URL" className={isDark ? inputStyleDark : inputStyleLight} />
              <div className="flex justify-between pt-4">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className={`px-4 py-2 ${isDark ? "bg-neutral-700 hover:bg-neutral-600" : "bg-neutral-200 hover:bg-neutral-100"} rounded-md  transition`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`px-5 py-2 ${isDark ? "bg-orange-500 hover:bg-orange-600" : "bg-blue-500 hover:bg-blue-600"} rounded-md font-semibold transition`}
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
      
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
                      <div className={`card-front flex flex-col items-center justify-center ${isDark ? "bg-linear-to-tl from-black to-neutral-800" : "bg-linear-to-tl from-neutral-300 to-white"}`}>
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

                        <p className={`${isDark ? "text-white" : "text-black"} font-bold text-lg text-center mx-5`}>
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