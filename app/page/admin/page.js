"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import AsideNavBar from "@/components/AsideNavBar";

const AdminPage = () => {
  const [eventData, setEventData] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    organizer: "",
    image: null,
  });

  // Fetch events from the backend
  useEffect(() => {
    axios
      .get("/api/events")
      .then((response) => setEventData(response.data))
      .catch((error) => console.error("Error fetching events:", error));
  }, []);

  // Handle file change for the event image
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData({
        ...formData,
        image: file, // Set the file object directly for Cloudinary upload
      });
    }
  };

  // Handle adding a new event
  const handleAdd = () => {
    const formDataPayload = new FormData();
    formDataPayload.append('title', formData.title);
    formDataPayload.append('description', formData.description);
    formDataPayload.append('date', formData.date);
    formDataPayload.append('location', formData.location);
    formDataPayload.append('organizer', formData.organizer);
  
    if (formData.image) {
      formDataPayload.append('image', formData.image);
    }
  
    axios
      .post('/api/events', formDataPayload, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        setEventData([...eventData, response.data.event]);
        setFormData({
          title: '',
          description: '',
          date: '',
          location: '',
          organizer: '',
          image: null,
        });
      })
      .catch((error) => console.error('Error adding event:', error));
  };

  // Handle editing an event
  const handleEdit = () => {
    const updatedData = [...eventData];
    const eventId = updatedData[index]._id;

    const eventPayload = {
      title: formData.title,
      description: formData.description,
      date: formData.date,
      location: formData.location,
      organizer: formData.organizer,
      image: formData.image,
    };

    axios
      .put(`/api/events/${eventId}`, eventPayload)
      .then((response) => {
        updatedData[index] = response.data;
        setEventData(updatedData);
        setFormData({
          title: "",
          description: "",
          date: "",
          location: "",
          organizer: "",
          image: null,
        });
      })
      .catch((error) => console.error("Error editing event:", error));
  };

  // Handle deleting an event
  const handleDelete = (index) => {
    const eventId = eventData[index]._id;  // Access the event ID using the index
    
    axios
      .delete(`/api/${eventId}`)
      .then(response => {
        console.log("Event deleted:", response.data);
        // Optionally, update the state to remove the event from the list
      })
      .catch(error => {
        console.error("Error deleting event:", error);
      });
  };

  return (
    <div className="flex bg-gray-100">
      <AsideNavBar />
      <main className="flex-grow p-6 ml-64"> {/* Add left margin to account for the fixed navbar */}
        <h1 className="text-2xl font-bold mb-4">Manage Events</h1>

        {/* Event Form */}
        <div className="mb-6">
          <div className="mb-4">
            <label className="block text-sm font-bold">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="border rounded p-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="border rounded p-2 w-full"
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold">Date</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
              className="border rounded p-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold">Location</label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              className="border rounded p-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold">Organizer</label>
            <input
              type="text"
              value={formData.organizer}
              onChange={(e) =>
                setFormData({ ...formData, organizer: e.target.value })
              }
              className="border rounded p-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold">Event Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="border rounded p-2 w-full"
            />
          </div>
          <button
            onClick={handleAdd}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add Event
          </button>
        </div>

        {/* Events Table */}
        <h2 className="text-xl font-bold mb-4">Event Data</h2>
        <table className="table-auto w-full border">
          <thead>
            <tr>
              <th className="border px-4 py-2">Title</th>
              <th className="border px-4 py-2">Description</th>
              <th className="border px-4 py-2">Date</th>
              <th className="border px-4 py-2">Location</th>
              <th className="border px-4 py-2">Organizer</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {eventData.map((event, index) => (
              <tr key={event._id}>
                <td className="border px-4 py-2">{event.title}</td>
                <td className="border px-4 py-2">{event.description}</td>
                <td className="border px-4 py-2">{event.date}</td>
                <td className="border px-4 py-2">{event.location}</td>
                <td className="border px-4 py-2">{event.organizer}</td>
                <td className="border px-4 py-2 space-x-2">
                  
                  <button
                    onClick={() => handleDelete(index)}
                    className="bg-red-500 text-white px-4 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default AdminPage;
