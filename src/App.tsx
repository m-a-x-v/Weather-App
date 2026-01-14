import { useState, useMemo } from "react";
import { Button, TextField, Stack, Typography, Box } from "@mui/material";
import { useForecast } from "./hooks/useForecast";
import { mapForecastToDaily } from "./utils/forecastMapper";
import type { DailyForecast } from "./utils/forecastMapper";
import { DailyForecastList } from "./components/DailyForecast";

function App() {
  const [city, setCity] = useState("");
  const [selectedDay, setSelectedDay] = useState<DailyForecast | null>(null);
  const { data, loading, error, loadByCity, loadByGeolocation } =
    useForecast();

  const dailyForecasts = useMemo(
    () => (data ? mapForecastToDaily(data) : []),
    [data]
  );

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Stack spacing={2} sx={{ p: 4, maxWidth: 400, width: "100%" }}>
        <Typography variant="h5" textAlign="center">
          Weather Forecast
        </Typography>

        <Button variant="contained" onClick={loadByGeolocation}>
          Use my location
        </Button>

        <TextField
          label="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />

        <Button
          variant="outlined"
          onClick={() => loadByCity(city)}
          disabled={!city}
        >
          Search
        </Button>

        {loading && <Typography>Loading...</Typography>}
        {error && <Typography color="error">{error}</Typography>}

        {dailyForecasts.length > 0 && !selectedDay && (
          <DailyForecastList days={dailyForecasts} onSelectDay={setSelectedDay} />
        )}

        {selectedDay && (
          <Typography>Drill-down UI will go here for {selectedDay.date}</Typography>
        )}
      </Stack>
    </Box>
  );
}

export default App;
