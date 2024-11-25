import connectDB from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req) {
  
  await connectDB();

  try {
    // Read the body data
    const { email, password } = await req.json();
    
    // Check if both email and password are provided
    if (!email || !password) {
      return new Response(JSON.stringify({ error: "Email and password are required" }), { status: 400 });
    }

    // Find the user in the database
    const user = await User.findOne({ email });
    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
    }

    // Check if the password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return new Response(JSON.stringify({ error: "Invalid credentials" }), { status: 401 });
    }

    // Create a JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // Return the token as a JSON response
    return new Response(JSON.stringify({ token }), { status: 200 });
  } catch (error) {
    // Log the error to the server console for debugging
    console.error("Error during authentication:", error);

    // Return the error message in the response
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
