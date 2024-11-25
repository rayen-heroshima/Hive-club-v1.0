"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch events from API on component mount
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("/api/events"); // Replace with your actual API endpoint
        console.log("Events:", response.data);
        setEvents(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch events. Please try again later.");
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return <div className="text-center text-xl py-10">Loading events...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 py-10">{error}</div>;
  }

  return (
    <div className="py-12" id="events">
      <h2 className="text-center text-4xl font-bold text-neutral-800 mb-8">
        Events
      </h2>
      <div className="max-w-screen-xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event, index) => (
  <div
    key={index}
    className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
  >
    {event.image?.url ? (
      <Image
        src={event.image.url}
        alt={event.title || "Event"}
        width={500}
        height={300}
        className="w-full h-48 object-cover"
      />
    ) : (
      <div className="w-full h-48 bg-gray-300 flex items-center justify-center text-white text-lg">
        No Image
      </div>
    )}
    <div className="p-6">
      <h3 className="text-xl font-semibold mb-2 text-neutral-900">
        {event.title || "Untitled Event"}
      </h3>
      <p className="text-sm text-neutral-500 mb-4">
        {event.description || "No description available."}
      </p>
      <p className="text-sm text-neutral-400">
        {event.date
          ? new Date(event.date).toLocaleDateString()
          : "No date provided"}
      </p>
      <p className="mt-2 text-neutral-600">
        Location: {event.location || "Not specified"}
      </p>
    </div>
  </div>
))}


      </div>
    </div>
  );
};

export default Events;
