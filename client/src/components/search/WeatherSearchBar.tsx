import { Close, SearchOutlined } from "@mui/icons-material";
import {
  Backdrop,
  IconButton,
  InputAdornment,
  InputBase,
  Paper,
} from "@mui/material";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useAppDispatch } from "../../hooks/reduxHooks";
import api from "../../services/api";
import { setSelectedQuery } from "../../store/reducers/weatherSlice";
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
  const inputRef = useRef<HTMLInputElement | null>(null);

  const visibleSuggestions = useMemo(
    () => Boolean(suggestions.length) && Boolean(query?.trim()) && focusing,
    [suggestions.length, query, focusing]
  );

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (query.trim().length > 1 && focusing) {
        fetchCitySuggestions(query).then(setSuggestions).catch(console.error);
      } else {
        setSuggestions([]);
      }
    }, 500);

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
    },
    [params]
  );

  const handleSelectSuggestion = useCallback(
    (value: Suggestion) => {
      submitQuery(value.description);
    },
    [submitQuery]
  );

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
          maxWidth: 600,
          minWidth: 500,
          boxShadow: focusing
            ? `0 0px 15px rgba(34, 105, 239, 0.2)`
            : `0 0px 3px rgba(34, 105, 239, 0.2)`,
          position: "relative",
          borderTopLeftRadius: visibleSuggestions ? 25 : 100,
          borderTopRightRadius: visibleSuggestions ? 25 : 100,
          borderBottomRightRadius: visibleSuggestions ? 0 : 100,
          borderBottomLeftRadius: visibleSuggestions ? 0 : 100,
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
            Boolean(query) && (
              <InputAdornment position="end">
                <IconButton onClick={handleClear}>
                  <Close />
                </IconButton>
              </InputAdornment>
            )
          }
          placeholder="Pesquise por cidades"
          sx={{
            px: 2,
            height: "100%",
            width: "100%",
          }}
        />
        {visibleSuggestions && (
          <SuggestionsList
            suggestions={suggestions}
            onSelect={handleSelectSuggestion}
          />
        )}
      </Paper>
      <Backdrop
        open={visibleSuggestions}
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
