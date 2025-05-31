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
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  });
}

export async function getUserCurrentCity(): Promise<string | null> {
  try {
    const coords = await getUserCoordinates();

    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${coords.lat}&lon=${coords.lng}`
    );
    const data = await response.json();

    return (
      data?.address?.city ||
      data?.address?.town ||
      data?.address?.village ||
      null
    );
  } catch (error: any) {
    console.error("Erro ao obter cidade atual:", error.message || error);
    return null;
  }
}
