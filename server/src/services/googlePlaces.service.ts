import axios from "axios";

export async function getCitySuggestions(input: string) {
  const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY!;
  const response = await axios.get(
    "https://maps.googleapis.com/maps/api/place/autocomplete/json",
    {
      params: {
        input,
        key: GOOGLE_API_KEY,
        types: "(regions)",
        language: "pt_BR",
        components: "country:br",
      },
    }
  );

  return response.data.predictions.map((p: any) => ({
    description: p.description,
    place_id: p.place_id,
  }));
}

export async function getCityByCoordinates(
  lat: number,
  lng: number
): Promise<string | null> {
  const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY!;
  const response = await axios.get(
    "https://maps.googleapis.com/maps/api/geocode/json",
    {
      params: {
        latlng: `${lat},${lng}`,
        key: GOOGLE_API_KEY,
        language: "pt-BR",
        result_type: "locality",
      },
    }
  );

  const result = response.data.results?.[0];
  const city = result?.address_components?.find((comp: any) =>
    comp.types.includes("locality")
  )?.long_name;

  return city ?? null;
}
