import {
    createAsyncThunk,
    createSlice,
    type PayloadAction,
} from "@reduxjs/toolkit";
import { getForecastByCity, getWeatherByCity } from "../../services/weather";

interface WeatherState {
  selectedQuery: string | null;
  forecast: any | null;
  weather: any | null;
  loading: boolean;
  error: string | null;
}

const initialState: WeatherState = {
  selectedQuery: null,
  forecast: null,
  weather: null,
  loading: false,
  error: null,
};

// Thunk para buscar os dados climáticos com base na cidade
export const fetchWeatherData = createAsyncThunk(
  "weather/fetchWeatherData",
  async (city: string, { rejectWithValue }) => {
    try {
      const [weather, forecast] = await Promise.all([
        getWeatherByCity(city),
        getForecastByCity(city),
      ]);

      return { city, weather, forecast };
    } catch (error) {
      return rejectWithValue("Erro ao buscar dados da previsão do tempo.");
    }
  }
);

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setSelectedQuery: (state, action: PayloadAction<string>) => {
      state.selectedQuery = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeatherData.fulfilled, (state, action) => {
        state.selectedQuery = action.payload.city;
        state.weather = action.payload.weather;
        state.forecast = action.payload.forecast;
        state.loading = false;
      })
      .addCase(fetchWeatherData.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      });
  },
});

export const { setSelectedQuery } = weatherSlice.actions;
export default weatherSlice.reducer;
