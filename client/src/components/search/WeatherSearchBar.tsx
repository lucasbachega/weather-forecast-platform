import { Close, SearchOutlined } from "@mui/icons-material";
import {
    Backdrop,
    IconButton,
    InputAdornment,
    InputBase,
    Paper,
} from "@mui/material";
import { memo, useEffect, useMemo, useState } from "react";
import { useAppDispatch } from "../../hooks/reduxHooks";
import api from "../../services/api";
import SuggestionsList from "./SuggestionsList";

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
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [focusing, setFocusing] = useState(false);

  const visibleSuggestions = useMemo(
    () => Boolean(suggestions.length) && Boolean(query?.trim()) && focusing,
    [suggestions.length, query, focusing]
  );

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (query.trim().length > 1) {
        fetchCitySuggestions(query).then(setSuggestions).catch(console.error);
      } else {
        setSuggestions([]);
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [query]);

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
          boxShadow: `0 0px 3px  rgba(34, 105, 239, 0.2)`,
          position: "relative",
          borderTopLeftRadius: visibleSuggestions ? 25 : 100,
          borderTopRightRadius: visibleSuggestions ? 25 : 100,
          borderBottomRightRadius: visibleSuggestions ? 0 : 100,
          borderBottomLeftRadius: visibleSuggestions ? 0 : 100,
          zIndex: 100,
        }}
      >
        <InputBase
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocusing(true)}
          startAdornment={
            <InputAdornment position="start">
              <SearchOutlined />
            </InputAdornment>
          }
          endAdornment={
            Boolean(query) && (
              <InputAdornment position="end">
                <IconButton onClick={() => setQuery("")}>
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
        {visibleSuggestions && <SuggestionsList suggestions={suggestions} />}
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
