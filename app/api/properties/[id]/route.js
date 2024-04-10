// Importing necessary modules
import connectDB from "@/config/database";
import Property from "@/models/Property";

// Get /api/properties/:id
export const GET = async (request, { params }) => {
  try {
    await connectDB(); // Assuming this connects to your database

    // Fetch by id
    const property = await Property.findById(params.id);

    if (!property) {
      return new Response("Property not Found", { status: 404 });
    }

    // Return properties as a JSON response
    return new Response(JSON.stringify(property), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Error fetching properties:", err);

    // Return an error response if something goes wrong
    return new Response("Something went wrong", { status: 500 });
  }
};
