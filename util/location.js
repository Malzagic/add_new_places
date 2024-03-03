import axios from "axios";
const API_KEY = process.env.GOOGLE_MAP_API;

export function getMapPreview(lat, lon) {
  const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lon}&zoom=13&size=400x200&maptype=roadmap&markers=color:red%7Clabel:S%7C${lat},${lon}&key=${API_KEY}`;
  return imagePreviewUrl;
}

export async function getAddress(lat, lon) {
  const URL = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${GOOGLE_MAP_API}`;

  try {
    const response = await axios.get(URL);
    const address = response.data.results[0].formatted_address;
    return address;
  } catch (err) {
    console.error(err);
  }
}
