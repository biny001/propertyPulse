// Importing necessary modules
import connectDB from "@/config/database";
import Property from "@/models/Property";

// Get /api/properties
export const GET = async (request) => {
  try {
    await connectDB(); // Assuming this connects to your database

    // Fetch all properties from the database
    const properties = await Property.find({});

    // Return properties as a JSON response
    return new Response(JSON.stringify(properties), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Error fetching properties:", err);

    // Return an error response if something goes wrong
    return new Response("Something went wrong", { status: 500 });
  }
};
