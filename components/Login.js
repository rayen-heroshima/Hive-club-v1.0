"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Import useRouter
import gsap from "gsap";
import axios from "axios";

const Login = () => {
  const router = useRouter(); // Initialize the router
  const [email, setEmail] = useState(""); // Track email input
  const [password, setPassword] = useState(""); // Track password input
  const [error, setError] = useState(""); // Error message for login failure

  useEffect(() => {
    gsap.to(".circle", {
      opacity: 1,
      duration: 3,
      stagger: 0.5,
      y: 0,
      ease: "bounce",
    });
    gsap.to(".title", {
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger: 0.5,
      ease: "power2.out",
    });
    gsap.to(".input", {
      opacity: 1,
      x: 0,
      y: 0,
      duration: 2.5,
      stagger: 0.5,
      ease: "bounce",
    });
    gsap.to(".btn", {
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger: 0.5,
      ease: "power2.out",
    });
    gsap.to(".img", { opacity: 1, duration: 2, ease: "power2.out" });
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent the default form submission
  
    try {
      const response = await axios.post("/api/auth", {
        email,
        password,
      });
  
      if (response.data) {
        console.log("Login successful:", response.data);
        // Redirect to the admin page
        router.push("/page/admin");
      }
    } catch (error) {
      console.error("Login failed:", error);
      setError("Invalid email or password");
    }
  };
  

  return (
    <section className="container mx-auto w-screen">
      <div className="mb-10">
        <div className="flex max-md:flex-col justify-between items-center h-screen mx-6 lg:items-center">
          <div className="flex flex-col gap-10 md:mb-8 ">
            <p className="capitalize text-5xl text-white opacity-0 title translate-y-10 ">
              Welcome Back
            </p>
            <p className="text-sm capitalize text-white lg:w-2/3 w-full opacity-0 title translate-y-10">
              if you don’t have an account, you can{" "}
              <a href="#" className="text-mainColor">
                Register here!
              </a>
            </p>
          </div>

          <div className="flex max-sm:flex-col items-center lg:gap-6 ">
            <div className="mb-7 img opacity-0">
              <img src="/login.png" width={600} height={250} />
            </div>
            <div className="w-2/4 max-sm:w-full">
              <form onSubmit={handleLogin}>
                <div className="flex flex-col gap-8">
                  <div className="flex flex-col gap-2">
                    <input
                      type="email"
                      placeholder="Enter email"
                      className="placeholder:text-[#4F555A] placeholder:text-sm px-1 py-2 rounded-md outline-none input translate-x-96 opacity-0"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)} // Update email state
                    />
                    <input
                      type="password"
                      placeholder="Enter password"
                      className="placeholder:text-[#4F555A] placeholder:text-sm px-1 py-2 rounded-md outline-none input translate-x-96 opacity-0"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)} // Update password state
                    />
                    <p className="capitalize text-xs text-white ml-auto title opacity-0">
                      Recovery password?
                    </p>
                  </div>
                  {error && (
                    <p className="text-red-500 text-xs mt-2">{error}</p> // Show error if login fails
                  )}
                  <button type="submit">
                    <p className="capitalize text-sm text-white bg-mainColor py-2 rounded-md input opacity-0 translate-y-10">
                      Login
                    </p>
                  </button>
                  <div className="flex justify-center items-center gap-2 title opacity-0">
                    <div className="bg-white w-1/4 h-[1px]" />
                    <p className="text-xs text-white">Or continue with </p>
                    <div className="bg-white w-1/4 h-[1px]" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="bg-white px-4 py-1 rounded-md opacity-0 btn translate-y-10">
                      <img src="/facebook.png" alt="facebook" width={30} height={30} />
                    </div>
                    <div className="bg-white px-4 py-1 rounded-md opacity-0 btn translate-y-10">
                      <img src="/github.png" alt="github" width={30} height={30} />
                    </div>
                    <div className="bg-white px-4 py-1 rounded-md opacity-0 btn translate-y-10">
                      <img src="/gmail.png" alt="gmail" width={30} height={30} />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="w-40 h-40 blur-[100px] bg-mainColor absolute top-[296px] circle opacity-0 -translate-y-96" />
      <div className="w-40 h-40 blur-[100px] bg-[#4461F2] absolute top-[550px] left-[337px] circle opacity-0 -translate-y-96" />
      <div className="w-40 h-40 blur-[100px] bg-[#DD602A] absolute top-[600px] left-[1030px] circle opacity-0 -translate-y-96" />
    </section>
  );
};

export default Login;
