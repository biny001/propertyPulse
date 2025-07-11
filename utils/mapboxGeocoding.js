// Mapbox Geocoding API utility functions

/**
 * Geocode an address using Mapbox Geocoding API
 * @param {string} address - The address to geocode
 * @returns {Promise<{lat: number, lng: number} | null>} - Returns coordinates or null if not found
 */
export const geocodeAddress = async (address) => {
  try {
    const accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
    
    if (!accessToken) {
      throw new Error('Mapbox access token is required');
    }

    // Encode the address for URL
    const encodedAddress = encodeURIComponent(address);
    
    // Make request to Mapbox Geocoding API
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedAddress}.json?access_token=${accessToken}&country=us,et&types=address,poi,place`
    );

    if (!response.ok) {
      throw new Error(`Geocoding request failed: ${response.status}`);
    }

    const data = await response.json();

    // Check if we have results
    if (data.features && data.features.length > 0) {
      const [lng, lat] = data.features[0].center;
      return { lat, lng };
    }

    return null;
  } catch (error) {
    console.error('Geocoding error:', error);
    return null;
  }
};

/**
 * Reverse geocode coordinates to get address
 * @param {number} lat - Latitude
 * @param {number} lng - Longitude
 * @returns {Promise<string | null>} - Returns address or null if not found
 */
export const reverseGeocode = async (lat, lng) => {
  try {
    const accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
    
    if (!accessToken) {
      throw new Error('Mapbox access token is required');
    }

    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${accessToken}&types=address,poi,place`
    );

    if (!response.ok) {
      throw new Error(`Reverse geocoding request failed: ${response.status}`);
    }

    const data = await response.json();

    if (data.features && data.features.length > 0) {
      return data.features[0].place_name;
    }

    return null;
  } catch (error) {
    console.error('Reverse geocoding error:', error);
    return null;
  }
}; 