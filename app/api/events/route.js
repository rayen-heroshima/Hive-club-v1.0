import Event from "@/models/Event"; // Import the Mongoose model
import connectDB from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import cloudinary from '@/lib/cloudinary';
import streamifier from 'streamifier'; // Import streamifier to convert Buffer to stream
// Connect to MongoDB


// GET all events
export async function GET() {
  await connectDB();
  try {
    const events = await Event.find(); // Fetch all events from the database
    console.log('Events:', events); // Log the events for debugging
    return new Response(JSON.stringify(events), { status: 200 });

  } catch (error) {
    return new Response("Error fetching events", { status: 500 });
  }
}








export async function POST(req) {
  await connectDB(); // Ensure DB connection

  const formData = await req.formData();
  const title = formData.get('title');
  const description = formData.get('description');
  const date = formData.get('date');
  const location = formData.get('location');
  const organizer = formData.get('organizer');
  const imageFile = formData.get('image'); // The image file from the form data

  // Ensure an image file is provided
  if (!imageFile) {
    return NextResponse.json(
      { message: 'Image file is required' },
      { status: 400 }
    );
  }

  try {
    // Convert the image file to Buffer
    const buffer = Buffer.from(await imageFile.arrayBuffer());

    // Convert Buffer to a stream using streamifier
    const imageStream = streamifier.createReadStream(buffer);

    // Cloudinary upload as a stream
    const uploadResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: 'events', resource_type: 'auto' },
        (error, result) => {
          if (error) {
            return reject(new Error('Cloudinary upload failed: ' + error.message));
          }
          resolve(result); // The result of the upload
        }
      );

      imageStream.pipe(uploadStream); // Pipe the image stream to Cloudinary
    });

    // Log the upload result for debugging
    console.log('Cloudinary Upload Result:', uploadResult);

    // Check if upload was successful and the response has a secure_url
    if (!uploadResult || !uploadResult.secure_url) {
      throw new Error('Image upload failed, secure_url not found.');
    }

    // Create a new event in the database with the image URL
    const newEvent = new Event({
      title,
      description,
      date,
      location,
      organizer,
      image: {
        url: uploadResult.secure_url, // Cloudinary image URL
        publicId: uploadResult.public_id, // Cloudinary public ID
      }
    });

    // Log the new event data for debugging
    console.log('New Event Data:', newEvent);
    
    // Save the event to the database
    await newEvent.save();

    // Return a successful response with the event details
    return NextResponse.json(
      { message: 'Event created successfully', event: newEvent },
      { status: 201 }
    );
  } catch (err) {
    console.error('Error creating event:', err);

    // Return a failure response
    return NextResponse.json(
      { message: 'Error creating event', error: err.message },
      { status: 500 }
    );
  }
}

// PUT to update an existing event
export async function PUT(req) {
    await connectDB();
  try {
    const { id } = req.url.split("/").pop(); // Get event ID from URL
    const data = await req.json();

    // Find the event by ID and update it
    const updatedEvent = await Event.findByIdAndUpdate(id, {
      title: data.title,
      description: data.description,
      date: data.date,
      location: data.location,
      organizer: data.organizer,
      image: data.image ? Buffer.from(data.image.data) : null,
    }, { new: true });

    if (!updatedEvent) {
      return new Response("Event not found", { status: 404 });
    }

    return new Response(JSON.stringify(updatedEvent), { status: 200 });
  } catch (error) {
    return new Response("Error updating event", { status: 500 });
  }
}

// DELETE an event
export async function DELETE(req) {
    await connectDB();
    try {
      const { id } = req.url.split("/").pop(); // Get event ID from URL
  
      // Find and delete the event by ID
      const deletedEvent = await Event.findByIdAndDelete(id);
  
      if (!deletedEvent) {
        return new Response("Event not found");
      }
  
      return new Response("Event deleted successfully", { status: 200 });
    } catch (error) {
      console.error("Error deleting event:", error); // Log the error for debugging
      return new Response(`Error deleting event: ${error.message}`, { status: 500 });
    }
  }
  
