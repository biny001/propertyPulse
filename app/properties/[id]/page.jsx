"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchProperty } from "@/utils/request";
import PropertyHeaderImage from "@/components/PropertyHeaderImage";
import Link from "next/link";
import {} from "react-icons/fa";

const PropertyPage = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPropertyData() {
      if (!id) return null;

      try {
        const propertyData = await fetchProperty(id);

        console.log(propertyData);

        setProperty(propertyData);
      } catch (err) {
        console.error("error fetching property:", err);
      } finally {
        setLoading(false);
      }
    }
    if (property === null) fetchPropertyData();
  }, [id, property]);

  if (!property && !loading)
    return (
      <h1 className=" text-center  text-2xl font-bold  mt-10">
        Property not found
      </h1>
    );

  return (
    <>
      {!loading && property && (
        <>
          <PropertyHeaderImage image={property?.images[0]} />
          <section>
            <div class="container m-auto py-6 px-6">
              <Link
                href="/properties.html"
                class="text-blue-500 hover:text-blue-600 flex items-center"
              >
                <i class="fas fa-arrow-left mr-2"></i> Back to Properties
              </Link>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default PropertyPage;
