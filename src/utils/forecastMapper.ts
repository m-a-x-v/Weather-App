export interface OpenWeatherListItem {
  dt: number;
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
  };
  weather: { main: string; icon: string }[];
  dt_txt: string;
}

export interface OpenWeatherResponse {
  cod: string;
  message: number;
  cnt: number;
  list: OpenWeatherListItem[];
  city: { id: number; name: string; country: string };
}

export interface DailyForecast {
  date: string;
  tempMin: number;
  tempMax: number;
  weather: string;
  icon: string;
  hours: HourlyForecast[];
}

export interface HourlyForecast {
  time: string;
  temp: number;
  weather: string;
  icon: string;
}

export const mapForecastToDaily = (data: OpenWeatherResponse): DailyForecast[] => {
  const days: Record<string, DailyForecast> = {};

  data.list.forEach((item) => {
    const date = item.dt_txt.split(" ")[0];
    const time = item.dt_txt.split(" ")[1].slice(0, 5);

    const hourData: HourlyForecast = {
      time,
      temp: item.main.temp,
      weather: item.weather[0].main,
      icon: item.weather[0].icon,
    };

    if (!days[date]) {
      days[date] = {
        date,
        tempMin: item.main.temp,
        tempMax: item.main.temp,
        weather: item.weather[0].main,
        icon: item.weather[0].icon,
        hours: [hourData],
      };
    } else {
      days[date].tempMin = Math.min(days[date].tempMin, item.main.temp);
      days[date].tempMax = Math.max(days[date].tempMax, item.main.temp);
      days[date].hours.push(hourData);
    }
  });

  return Object.values(days).slice(0, 5);
};