'use client';
import ApplicationCard from "@/components/ApplicationCard";
import applications from "./applications.json";

export default function joinUs() {

    const list = applications.applications.map((dept) => (
        <ApplicationCard name={dept.name} href={dept.link} key={dept.name}></ApplicationCard>
    ));

    
    return <>
    
    <div className="mt-5">
        <h2 className="text-2xl font-bold flex justify-center">Apply to a Department</h2>
        <hr className="w-[50%] mx-auto border-t-2 mt-2"></hr>
    </div>


    
    <div className="flex justify-center">
        <div className="grid grid-cols-5 gap-5 mt-5">
            {list}
        </div>

    </div>

    
    </>


}