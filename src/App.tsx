import { useState, useMemo } from "react";
import {
  Button,
  TextField,
  Stack,
  Typography,
  Box,
  Skeleton,
  Paper,
} from "@mui/material";
import { useForecast } from "./hooks/useForecast";
import { mapForecastToDaily } from "./utils/forecastMapper";
import type { DailyForecast } from "./utils/forecastMapper";
import { DailyForecastList } from "./components/DailyForecast";
import { HourlyForecastList } from "./components/HourlyForecast";

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
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "#f5f5f5",
      }}
    >
      <Paper elevation={3} sx={{ p: 4, maxWidth: 420, width: "100%" }}>
        <Stack spacing={3}>
          <Typography variant="h4" textAlign="center" color="text.primary">
            Weather Forecast
          </Typography>

          <Stack direction="row" justifyContent="center" spacing={2}>
            <Button
              variant="contained"
              onClick={loadByGeolocation}
            >
              Use my location
            </Button>
          </Stack>

          <TextField
            label="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            fullWidth
          />

          <Button
            variant="outlined"
            onClick={() => loadByCity(city)}
            disabled={!city}
          >
            Search
          </Button>

          {loading && (
            <Stack spacing={2}>
              {[...Array(5)].map((_, i) => (
                <Skeleton
                  key={i}
                  variant="rectangular"
                  height={80}
                  sx={{ borderRadius: 1 }}
                />
              ))}
            </Stack>
          )}

          {error && (
            <Typography color="error" textAlign="center">
              {error}
            </Typography>
          )}

          {!loading && dailyForecasts.length > 0 && !selectedDay && (
            <DailyForecastList days={dailyForecasts} onSelectDay={setSelectedDay} />
          )}

          {!loading && selectedDay && (
            <HourlyForecastList
              hours={selectedDay.hours}
              onBack={() => setSelectedDay(null)}
            />
          )}
        </Stack>
      </Paper>
    </Box>
  );
}

export default App;
