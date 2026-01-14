import { Card, CardContent, Typography, Stack, Avatar } from "@mui/material";
import type { DailyForecast } from "../utils/forecastMapper";

interface Props {
  days: DailyForecast[];
  onSelectDay: (day: DailyForecast) => void;
}

export const DailyForecastList = ({ days, onSelectDay }: Props) => {
  return (
    <Stack spacing={2}>
      {days.map((day) => (
        <Card
          key={day.date}
          onClick={() => onSelectDay(day)}
          sx={{
            cursor: "pointer",
            bgcolor: "#ffffff",
            color: "text.primary",
            "&:hover": { boxShadow: 6 },
          }}
        >
          <CardContent sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Typography>{day.date}</Typography>
            <Avatar
              src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
              alt={day.weather}
            />
            <Typography>
              {Math.round(day.tempMin)}° / {Math.round(day.tempMax)}°
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Stack>
  );
};
