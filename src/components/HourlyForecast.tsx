import { Button, Card, CardContent, Typography, Stack, Avatar } from "@mui/material";
import type { HourlyForecast } from "../utils/forecastMapper";

interface Props {
  hours: HourlyForecast[];
  onBack: () => void;
}

export const HourlyForecastList = ({ hours, onBack }: Props) => {
  return (
    <Stack spacing={2}>

      <Stack direction="row" justifyContent="center">
        <Button
          variant="contained"
          onClick={onBack}
        >
          ← Back to 5-day forecast
        </Button>
      </Stack>

      {hours.map((hour) => (
        <Card
          key={hour.time}
          sx={{ bgcolor: "#ffffff", color: "text.primary" }}
        >
          <CardContent sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Typography>{hour.time}</Typography>
            <Avatar
              src={`https://openweathermap.org/img/wn/${hour.icon}@2x.png`}
              alt={hour.weather}
            />
            <Typography>{Math.round(hour.temp)}°C</Typography>
            <Typography>{hour.weather}</Typography>
          </CardContent>
        </Card>
      ))}
    </Stack>
  );
};
