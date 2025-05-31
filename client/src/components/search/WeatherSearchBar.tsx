import { Close, MyLocation, SearchOutlined } from "@mui/icons-material";
import {
  Backdrop,
  CircularProgress,
  IconButton,
  InputAdornment,
  InputBase,
  Paper,
  Tooltip,
} from "@mui/material";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useAppDispatch } from "../../hooks/reduxHooks";
import api from "../../services/api";
import { setSelectedQuery } from "../../store/reducers/weatherSlice";
import { getUserCurrentCity } from "../../utils/geolocation";
import SuggestionsList from "./SuggestionsList";
import type { Suggestion } from "./types";

async function fetchCitySuggestions(query: string) {
  const res = await api.get("/places/autocomplete", {
    params: {
      input: query,
    },
  });
  return res?.data?.suggestions || [];
}

const WeatherSearchBar = () => {
  const dispatch = useAppDispatch();
  const [params, setParams] = useSearchParams();
  const [query, setQuery] = useState(params.get("city") || "");
  const [suggestions, setSuggestions] = useState([]);
  const [focusing, setFocusing] = useState(false);
  const [searching, setSearching] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (query.trim().length > 1 && focusing) {
        setSearching(true);
        fetchCitySuggestions(query)
          .then(setSuggestions)
          .catch(console.error)
          .finally(() => setSearching(false));
      } else {
        setSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  useEffect(() => {
    if (params.get("city")) {
      dispatch(setSelectedQuery(params.get("city") || ""));
    }
  }, []);

  const submitQuery = useCallback(
    (value: string) => {
      const trimmed = value.trim();
      if (!trimmed) return;

      dispatch(setSelectedQuery(trimmed));
      setFocusing(false);
      setQuery(trimmed);
      params.set("city", trimmed);
      setParams(params);
      setSearching(false);
    },
    [params]
  );

  const handleSelectSuggestion = useCallback(
    (value: Suggestion) => {
      submitQuery(value.description);
    },
    [submitQuery]
  );

  const handleClickMyLocation = async () => {
    setSearching(true);
    const city = await getUserCurrentCity();
    if (city) {
      submitQuery(city);
    }
  };

  const handleClear = () => {
    setQuery("");
    inputRef?.current?.focus?.();
    params.delete("city");
    setParams(params);
  };

  return (
    <>
      <Paper
        elevation={1}
        sx={{
          border: "none",
          display: "flex",
          alignItems: "center",
          height: 50,
          maxWidth: 540,
          width: '100%',
          boxShadow: focusing
            ? `0 0px 20px rgba(34, 105, 239, 0.3)`
            : `0 0px 3px rgba(34, 105, 239, 0.2)`,
          position: "relative",
          borderTopLeftRadius: focusing ? 25 : 100,
          borderTopRightRadius: focusing ? 25 : 100,
          borderBottomRightRadius: focusing ? 0 : 100,
          borderBottomLeftRadius: focusing ? 0 : 100,
          zIndex: 100,
        }}
      >
        <InputBase
          inputRef={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocusing(true)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              submitQuery(query);
            }
          }}
          startAdornment={
            <InputAdornment position="start">
              <SearchOutlined />
            </InputAdornment>
          }
          endAdornment={
            <InputAdornment position="end">
              {searching && (
                <CircularProgress
                  size={20}
                  sx={{ mr: 1 }}
                  thickness={6}
                  color="secondary"
                />
              )}
              <Tooltip title="Minha cidade">
                <IconButton
                  disabled={searching}
                  onClick={handleClickMyLocation}
                  color="primary"
                >
                  <MyLocation />
                </IconButton>
              </Tooltip>
              {Boolean(query) && (
                <IconButton onClick={handleClear}>
                  <Close />
                </IconButton>
              )}
            </InputAdornment>
          }
          placeholder="Pesquise por cidades"
          sx={{
            px: 2,
            height: "100%",
            width: "100%",
          }}
        />
        {focusing && (
          <SuggestionsList
            suggestions={suggestions}
            onSelect={handleSelectSuggestion}
          />
        )}
      </Paper>
      <Backdrop
        open={focusing}
        onClick={() => setFocusing(false)}
        slotProps={{
          root: {
            sx: {
              backgroundColor: "transparent",
            },
          },
        }}
      />
    </>
  );
};

export default memo(WeatherSearchBar);
