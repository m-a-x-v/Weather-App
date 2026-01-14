import { Card, CardContent, Typography, Stack, Avatar } from "@mui/material";
import type { HourlyForecast } from "../utils/forecastMapper";

interface Props {
  hours: HourlyForecast[];
  onBack: () => void;
}

export const HourlyForecastList = ({ hours, onBack }: Props) => {
  return (
    <Stack spacing={2}>
      <Card>
        <CardContent>
          <Typography
            variant="button"
            onClick={onBack}
            sx={{ cursor: "pointer", color: "primary.main" }}
          >
            ← Back to 5-day forecast
          </Typography>
        </CardContent>
      </Card>

      {hours.map((hour) => (
        <Card key={hour.time}>
          <CardContent
            sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
          >
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
