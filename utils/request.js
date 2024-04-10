const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;

//fetch all property

async function fetchProperties() {
  try {
    //handle case where domain is not avaible
    if (!apiDomain) {
      return [];
    }

    const res = await fetch(`${apiDomain}/properties`);
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    return res.json();
  } catch (err) {
    console.log(err);
    return [];
  }
}

//fetch single property
async function fetchProperty(id) {
  try {
    //handle case where domain is not avaible
    if (!apiDomain) {
      return null;
    }

    const res = await fetch(`${apiDomain}/properties/${id}`);
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    return res.json();
  } catch (err) {
    console.log(err);
    return null;
  }
}

export { fetchProperties, fetchProperty };
