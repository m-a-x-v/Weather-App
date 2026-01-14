import { mapForecastToDaily } from "../utils/forecastMapper";
import type { DailyForecast } from "../utils/forecastMapper";
import type { OpenWeatherResponse } from "../utils/forecastMapper";

const mockApiResponse: OpenWeatherResponse = {
  cod: "200",
  message: 0,
  cnt: 2,
  list: [
    {
      dt: 1670000000,
      main: { temp: 10, temp_min: 10, temp_max: 12 },
      weather: [{ main: "Clouds", icon: "04d" }],
      dt_txt: "2026-01-14 09:00:00",
    },
    {
      dt: 1670010000,
      main: { temp: 14, temp_min: 14, temp_max: 14 },
      weather: [{ main: "Clear", icon: "01d" }],
      dt_txt: "2026-01-14 12:00:00",
    },
  ],
  city: { id: 123, name: "Test City", country: "TC" },
};

describe("mapForecastToDaily", () => {
  it("maps API response to daily forecast correctly", () => {
    const daily: DailyForecast[] = mapForecastToDaily(mockApiResponse);

    expect(daily).toHaveLength(1);
    expect(daily[0].date).toBe("2026-01-14");
    expect(daily[0].tempMin).toBe(10);
    expect(daily[0].tempMax).toBe(14);
    expect(daily[0].hours).toHaveLength(2);
    expect(daily[0].hours[0].time).toBe("09:00");
  });
});
