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
  
  export const mapForecastToDaily = (data: any): DailyForecast[] => {
    const days: Record<string, DailyForecast> = {};
  
    data.list.forEach((item: any) => {
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
  