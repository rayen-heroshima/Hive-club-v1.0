import React from "react";
import Home from "@/components/Home";
import Navbar from "@/components/Navbar";
import Events from "@/components/Events";
import Activities from "@/components/Activities";
import Contact from "@/components/Contact";
import Department from "@/components/Department";
import About from "@/components/About";
import Footer from "@/components/Footer";

const page = () => {
  return (
    <div className="relative">
      <Navbar />
      <Home />
      <About />
      <Department />
      <Activities />
      <Events />
      <Contact />
      <Footer />
    </div>
  );
};

export default page;
