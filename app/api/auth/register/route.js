import connectDB from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req) {
  // Connect to the database
  await connectDB();

  try {
    // Get the body data
    const { email, password } = await req.json();
    
    // Check if both email and password are provided
    if (!email || !password) {
      return new Response(JSON.stringify({ error: "Email and password are required" }), { status: 400 });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new Response(JSON.stringify({ error: "User already exists" }), { status: 409 });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user in the database
    const newUser = new User({
      email,
      password: hashedPassword,
    });

    // Save the new user
    await newUser.save();

    // Create a JWT token for the new user
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    // Return the token in the response
    return new Response(JSON.stringify({ token }), { status: 201 });
  } catch (error) {
    // Log the error
    console.error("Error during registration:", error);

    // Return the error message
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
