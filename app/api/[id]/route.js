import Event from "@/models/Event"; // Import the Mongoose model
import connectDB from "@/lib/db";
import cloudinary from '@/lib/cloudinary';

// DELETE an event
export async function DELETE(req, { params }) {
  try {
    // Connect to the database
    await connectDB();

    // Extract the event ID from the dynamic route
    const { id } = params;

    if (!id) {
      return new Response("Invalid ID provided", { status: 400 });
    }

    // Find the event by ID to check if it exists
    const eventToDelete = await Event.findById(id);

    // If the event is not found, return a 404 error
    if (!eventToDelete) {
      return new Response("Event not found", { status: 404 });
    }

    // Delete the event from the database
    const deletedEvent = await Event.findByIdAndDelete(id);

    // If the event has an image, remove it from Cloudinary
    if (eventToDelete.image && eventToDelete.image.publicId) {
      const cloudinaryDeleteResult = await cloudinary.uploader.destroy(
        eventToDelete.image.publicId
      );

      // Log the result of the Cloudinary delete operation
      console.log("Cloudinary Image Delete Result:", cloudinaryDeleteResult);
    }

    // Return a success response
    return new Response("Event deleted successfully", { status: 200 });
  } catch (error) {
    console.error("Error deleting event:", error); // Log the error for debugging
    return new Response(`Error deleting event: ${error.message}`, { status: 500 });
  }
}
