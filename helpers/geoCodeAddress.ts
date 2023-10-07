import axios from "axios";

const geocodeAddress = async (address: string) => {
  try {
    const response = await axios.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        address
      )}.json`,
      {
        params: {
          access_token: process.env.MAPGL_TOKEN,
        },
      }
    );

    const [longitude, latitude] = response.data.features[0].center;

    return { latitude, longitude };
  } catch (error) {
    console.error("Error geocoding address:", error);
    return null;
  }
};
export default geocodeAddress;
