import {
  createAsyncThunk,
  createSelector,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { RootState } from "..";
import {
  getForecastByCity,
  getSearchHistory,
  getWeatherByCity,
} from "../../services/weather";
import type { ISearchHistory, IWeatherData } from "../../types/weather";

interface WeatherState {
  selectedQuery: string | null;
  forecast: any | null;
  weather: IWeatherData | null;
  searchHistory: {
    data: Array<ISearchHistory> | null;
    loading: boolean;
    error: string | null;
  };
  loading: boolean;
  error: string | null;
}

const initialState: WeatherState = {
  selectedQuery: null,
  forecast: null,
  weather: null,
  searchHistory: {
    data: [],
    loading: false,
    error: null,
  },
  loading: false,
  error: null,
};

interface FetchWeatherParams {
  city: string;
  background?: boolean;
}

// Thunk para buscar os dados climáticos com base na cidade
export const fetchWeatherData = createAsyncThunk(
  "weather/fetchWeatherData",
  async ({ city }: FetchWeatherParams, { rejectWithValue }) => {
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

// Thunk para buscar o histórico de pesquisa
export const fetchSearchHistory = createAsyncThunk(
  "weather/fetchSearchHistory",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getSearchHistory();
      return data;
    } catch (error) {
      return rejectWithValue("Erro ao buscar histórico");
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
    resetSearchHistory: (state) => {
      state.searchHistory.data = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherData.pending, (state, action) => {
        state.loading = !action.meta.arg.background;
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
      })

      //Histórico
      .addCase(fetchSearchHistory.pending, (state) => {
        state.searchHistory.loading = true;
        state.searchHistory.error = null;
      })
      .addCase(fetchSearchHistory.fulfilled, (state, action) => {
        state.searchHistory.data = action.payload;
        state.searchHistory.loading = false;
      })
      .addCase(fetchSearchHistory.rejected, (state, action) => {
        state.searchHistory.error = action.payload as string;
        state.searchHistory.loading = false;
      });
  },
});

export const { setSelectedQuery, resetSearchHistory } = weatherSlice.actions;
export default weatherSlice.reducer;

export const selectSearchHistory = (state: RootState) =>
  state.weather.searchHistory.data || [];

export const selectSortedSearchHistory = createSelector(
  [selectSearchHistory],
  (searchHistory: Array<ISearchHistory>) =>
    [...searchHistory].sort(
      (a, b) =>
        new Date(b.searchedAt).getTime() - new Date(a.searchedAt).getTime()
    )
);
