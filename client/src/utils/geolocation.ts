import api from "../services/api";

export function getUserCoordinates(): Promise<{ lat: number; lng: number }> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocalização não suportada"));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        console.log(error);
        reject(new Error("Erro ao obter localização"));
      }
    );
  });
}

export async function getUserCurrentCity(): Promise<string | null> {
  try {
    const coords = await getUserCoordinates();

    const response = await api.get("/places/from-coordinates", {
      params: {
        lat: coords.lat,
        lng: coords.lng,
      },
    });

    return response?.data?.city || null;
  } catch (error) {
    console.error("Erro ao obter cidade atual:", error);
    return null;
  }
}
