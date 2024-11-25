"use client"
import React from 'react';
import { FaCode } from "react-icons/fa";
import { HoverEffect} from '/components/ui/card-hover-effect'; 

const Department = () => {
  const departments = [
    {
      title: "president",
      description: "Khaled Abdellatif",
      link: "/web-development",
    },
    {
      title: "Web Development",
      description: "Team Leader: Rayen Hammami",
      link: "/web-development",
    },
    {
      title: "Problem Solving",
      description: "Team Leader: Amir benzarti",
      link: "/mobile-development", 
    },
    {
      title: "Marketing department",
      description: "Team Leader: Emna Kaaniche",
      link: "/data-science", 
    },
    {
      title: "Finance departmenr",
      description: "Team Leader: Adem Hamroun",
      link: "/ui-ux-design", 
    },
    {
      title: "Sponsor department",
      description: "Team Leader: Zahia B'lk",
      link: "/devops", 
    },
  ];

  return (
    <div className=" p-12 " id='department'>
      <h1 className="text-4xl  text-white text-center"><strong>OUR DEPARTMENT</strong></h1>
      <HoverEffect items={departments} className="flex justify-center flex-wrap" />
    </div>
  );
};

export default Department;
