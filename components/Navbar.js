"use client";
import React, { useState,useEffect } from "react";
import { RiCloseLine, RiMenu3Line } from "react-icons/ri";
import gsap from "gsap";
import Link from "next/link"; // Import Link component

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [scrollDirection, setScrollDirection] = useState("up");
  const [navbarBg, setNavbarBg] = useState("transparent");

  // Handle scroll direction and background color
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setScrollDirection("down");
      } else {
        setScrollDirection("up");
      }

      if (window.scrollY > 450) {
        setNavbarBg("#000100");
      } else {
        setNavbarBg("transparent");
      }

      lastScrollY = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);

    gsap.to(".navbar", {
      opacity: 1,
      y: 0,
      duration: 1.5,
      ease: "ease",
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 transition-transform duration-500 ease-in-out ${scrollDirection === "down" ? "-translate-y-full" : "translate-y-0"
        }`}
      style={{ backgroundColor: navbarBg }}
    >
      <div className="flex justify-between items-center container mx-auto py-10 z-50">
        <div className="navbar w-full flex justify-between items-center py-2 px-4 rounded-full mx-6 lg:border lg:border-black lg:bg-slate-950 lg:shadow-sm lg:shadow-mainColor opacity-0 -translate-y-24">
          <div className="flex items-center flex-1">
            <div className="mr-8">
              {/* Logo */}
            </div>
            <div className="hidden lg:flex flex-row items-center gap-10">
              <p className="capitalize cursor-pointer">
                <Link
                  href="/" // Scrolls to Home component
                  className="text-white font-open-sans font-500 -tracking-wider text-[17px]"
                >
                  Home
                </Link>
              </p>
              <p className="capitalize cursor-pointer">
                <Link
                  href="#about" // Scrolls to About component
                  className="text-white font-open-sans font-500 -tracking-wider text-[17px]"
                >
                  About
                </Link>
              </p>
              <p className="capitalize cursor-pointer">
                <Link
                  href="#activities" // Scrolls to Activities component
                  className="text-white font-open-sans font-500 -tracking-wider text-[17px]"
                >
                  Activities
                </Link>
              </p>
              <p className="capitalize cursor-pointer">
                <Link
                  href="#events" // Scrolls to Events component
                  className="text-white font-open-sans font-500 -tracking-wider text-[17px]"
                >
                  Events
                </Link>
              </p>
              <p className="capitalize cursor-pointer">
                <Link
                  href="#contact" // Scrolls to Contact component
                  className="text-white font-open-sans font-500 -tracking-wider text-[17px]"
                >
                  Contact
                </Link>
              </p>
            </div>
          </div>
          {/* Other Navbar content */}
          <div className="flex items-center gap-10">
            <p className="text-black bg-white font-medium text-[17px] capitalize cursor-pointer hidden sm:block py-1 px-3 rounded-full">
              <a href="/page/login">Sign up</a>
            </p>
          </div>
        </div>
        {/* Mobile Navbar */}
      </div>
    </div>
  );
};

export default Navbar;
