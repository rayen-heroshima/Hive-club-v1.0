import mongoose from "mongoose";
const EventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  organizer: { type: String, required: true },
  image: {
    url: { type: String, required: true },
    publicId: { type: String, required: true },
  },
});

export default mongoose.models.Event || mongoose.model("Event", EventSchema);
