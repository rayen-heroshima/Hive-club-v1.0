"use client"
import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import Button from "/components/ui/Button";

const Contact = () => {
  const form = useRef();
  const [status, setStatus] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        process.env.SERVICE_ID, // Replace with your service ID
        process.env.TEMPLATE_ID, // Replace with your template ID
        form.current,
        {
          publicKey: process.env.PUBLIC_KEY // Replace with your public key
        }
      )
      .then(
        () => {
          setStatus("Message sent successfully!");
        },
        (error) => {
          setStatus(`Error: ${error.text}`);
        }
      );
  };

  return (
    <div className="container mx-auto p-4" id="contact">
      <div className="rounded p-8 w-full">
        <h2 className="text-6xl text-white text-center mb-12">Contact us</h2>
        <div className="flex justify-between items-center w-full gap-5">
          <div className="flex flex-col gap-2">
            <h1 className="text-mainColor text-3xl font-bold uppercase">
              WE APPRECIATE YOUR MESSAGE!
            </h1>
            <p className="text-white text-[16px]">
              Your message will help us to improve our web hosting quality
              products and customer services.
            </p>
          </div>
          <div>
            <form ref={form} onSubmit={sendEmail} className="space-y-3 text-gray-800">
              <div className="flex justify-between gap-2">
                <input
                  type="text"
                  name="user_name"
                  placeholder="Name"
                  className="w-full bg-gray-100 rounded py-3 px-6 text-sm outline-none border-mainColor"
                />
                <input
                  type="email"
                  name="user_email"
                  placeholder="Email"
                  className="w-full bg-gray-100 rounded py-3 px-6 text-sm outline-none border-mainColor"
                />
              </div>
              <textarea
                name="message"
                placeholder="Message"
                rows="3"
                className="w-full bg-gray-100 rounded px-6 text-sm pt-3 outline-none"
              ></textarea>
              <Button title="Send message" position="right" />
            </form>
            {status && <p className="mt-4 text-center text-white">{status}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
