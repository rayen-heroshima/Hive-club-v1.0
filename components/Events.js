"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { data } from "../lib/data";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Timer logic
  const calculateTimeLeft = (date) => {
    const eventDate = new Date(date);
    const currentDate = new Date();
    const timeLeft = eventDate - currentDate;
    if (timeLeft < 0) return null;
    
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    return `${days}d ${hours}h ${minutes}m`;
  };

  // Using useEffect to set events after the initial render
  useEffect(() => {
    try {
      setEvents(data.events); // Set events from your data
      setLoading(false); // Data has loaded
    } catch (err) {
      setError("Failed to load events"); // Error handling if needed
      setLoading(false); // Stop loading indicator
    }
  }, []); // Empty dependency array ensures this runs only once after initial render

  if (loading) {
    return <div className="text-center text-xl py-10">Loading events...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 py-10">{error}</div>;
  }

  return (
    <div className="py-12 bg-[#000100]" id="events">
      <h2 className="text-center text-4xl font-bold text-[#FBA705] mb-12">
        Upcoming Events
      </h2>
      <div className="max-w-screen-xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            {event.image?.url ? (
              <Image
                src={event.image.url}
                alt={event.title || "Event"}
                width={500}
                height={300}
                className="w-full h-48 object-cover rounded-t-lg"
              />
            ) : (
              <div className="w-full h-48 bg-gray-300 flex items-center justify-center text-white text-lg rounded-t-lg">
                No Image
              </div>
            )}
            <div className="p-6 space-y-4">
              <h3 className="text-2xl font-semibold text-neutral-900 hover:text-[#FBA705] transition-colors duration-200">
                {event.title || "Untitled Event"}
              </h3>
              <p className="text-sm text-neutral-500">{event.description || "No description available."}</p>
              
              {/* Countdown Timer */}
              <div className="text-sm text-[#FBA705]">
                {event.date ? (
                  <span>
                    Time Left: {calculateTimeLeft(event.date) || "Event has passed"}
                  </span>
                ) : (
                  "No date provided"
                )}
              </div>

              <div className="flex justify-between items-center text-sm text-neutral-400 mt-4">
                <p className="text-neutral-600">
                  Location: {event.location || "Not specified"}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;
