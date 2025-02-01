"use client";
import React, { useEffect } from "react";
import Button from "/components/ui/Button";
import { TextGenerateEffect } from "/components/ui/TextGenerateEffect";
import { ScrollTrigger } from "gsap/all";

import gsap from "gsap";

const Home_2 = () => {


  useEffect(() => {
    {

      gsap.registerPlugin(ScrollTrigger);

    
      gsap.to(".animated-bg", {
        opacity: 1,
        y: 0,
        duration: 2,
        ease: "power2.out",
        // delay: 4,
      });
      gsap.to(".text", {
        opacity: 1,
        y: 0,
        duration: 2,
        ease: "power2.out",
        // delay: 4,
        stagger: 0.5,
      });

      gsap.to(".btn", {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.3,
        ease: "power2.out",
        // delay: 4,
      });


 
    }
  }, []);

  // 121

  // 168

  // -20

  // reflect-below

  return (
 <section className=" ">
     <div className="overflow-hidden w-screen h-screen relative flex items-center justify-center font-serif back-animation" >
   
      <div 
        id="home"
        className="animated-bg bg-gradient-radial from-black via-black to-mainColor lg:h-[180vw] max-lg:h-[180vw] max-md:h-[180vh] max-sm:h-[180vh] w-[220vw] absolute 
       left-1/2 -translate-x-1/2 rounded-full -top-[10%] max-lg:-top-[10%] max-md:-top-[10%] max-sm:-top-[10%]  -translate-y-96 opacity-0"
        style={{
          background:
            "radial-gradient(circle, #000100 48%, #9a3412 85%, #ea580c 90%, #fdba74 95%)",
          // "radial-gradient(circle, #000100 48%, ##c2410c 85%, #ea580c 90%, #fdba74 95%)",
        }}
      />

      <div className="flex justify-center relative my-20 z-10">
        <div className="max-w-[89vw] md:max-w-2xl lg:max-w-[60vw] flex flex-col items-center justify-center gap-20 ">
          <TextGenerateEffect
            className=" text-center text opacity-0 translate-y-5"
            words="Résoudre Aujourd'hui Innover Demain Transformer Ensemble"
          />

       

          <p className="uppercase tracking-widest text-xs text-center text-blue-100 max-w-[500px] text opacity-0 translate-y-5">
            Ensemble, nous transformons les défis d&apos;aujourd&apos;hui en solutions
            innovantes pour un avenir meilleur.{" "}
          </p>

          <div className=" flex gap-8">
            <a href="#about" className="btn translate-y-10 opacity-0">
              <Button title="Get Started" position="right" />
            </a>
            <a href="#about" className="btn translate-y-10 opacity-0">
              <Button title="Learn more" position="right" />
            </a>
          </div>
        </div>
      </div>
    </div>
 </section>
  );
};

export default Home_2;
