import axios from "axios";

export async function getCitySuggestions(input: string) {
  const response = await axios.get(
    "https://maps.googleapis.com/maps/api/place/autocomplete/json",
    {
      params: {
        input,
        key: process.env.GOOGLE_API_KEY,
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
