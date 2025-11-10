'use client';
import ApplicationCard from "@/components/ApplicationCard";
import applications from "./applications.json";
import { useState } from "react";

export default function joinUs() {

    let defaultText = "At Ontario Tech Racing, students have the opportunity to gain valuable EV motorsport experiences with hands-on work in the mechanical, electrical, or business realms. Apply today!"

    const [bottomText, setBottomText] = useState(defaultText)

    const list = applications.applications.map((dept) => (
        <ApplicationCard name={dept.name} href={dept.link} imageSrc={dept.image} key={dept.name} onHover={() => {
            setBottomText(dept.description)
        }} onLeave={() => {
            setBottomText(defaultText)
        }}></ApplicationCard>
    ));

    
    return <>

    <div className="min-h-screen bg-cover bg-center bg-fixed"
         style={{backgroundImage: "url('/join-us/backgroundPic.png')"}}>

        <div className="pt-10 bg-black/50 min-h-screen">

            <div className="mt-5">
                <h2 className="text-2xl font-bold flex justify-center">Apply to a Department</h2>
                <hr className="w-[50%] mx-auto border-t-2 mt-2"></hr>
            </div>


            
            <div className="flex justify-center">
                <div className="grid grid-cols-5 gap-5 mt-5">
                    {list}
                </div>

            </div>

            <div className="text-center mt-25 text-3xl">
                    <div
                        key={bottomText} 
                        className="opacity-0 translate-y-2 animate-[fadeInUp_300ms_ease-out_forwards]">
                        {bottomText}
                    </div>
            </div>


        </div>

        
    </div>

        
        </>


}