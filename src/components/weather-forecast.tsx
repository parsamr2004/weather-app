import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  ThermometerSun,
  ThermometerSnowflake,
  Droplets,
  Wind,
} from "lucide-react";
import { format } from "date-fns";
import type { ForecastData } from "@/api/types";

interface WeatherForecastProps {
  data: ForecastData;
}

interface DailyForecast {
  date: number;
  temp_min: number;
  temp_max: number;
  humidity: number;
  wind: number;
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  };
}

export function WeatherForecast({ data }: WeatherForecastProps) {
  const dailyForecasts = data.list.reduce((acc, forecast) => {
    const date = format(new Date(forecast.dt * 1000), "yyyy-MM-dd");
    if (!acc[date]) {
      acc[date] = {
        temp_min: forecast.main.temp_min,
        temp_max: forecast.main.temp_max,
        humidity: forecast.main.humidity,
        wind: forecast.wind.speed,
        weather: forecast.weather[0],
        date: forecast.dt,
      };
    } else {
      acc[date].temp_min = Math.min(acc[date].temp_min, forecast.main.temp_min);
      acc[date].temp_max = Math.max(acc[date].temp_max, forecast.main.temp_max);
    }
    return acc;
  }, {} as Record<string, DailyForecast>);

  const nextDays = Object.values(dailyForecasts).slice(1, 6);
  const formatTemp = (t: number) => `${Math.round(t)}°`;

  return (
    <Card className="overflow-hidden border-none shadow-sm rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">5-Day Forecast</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3">
          {nextDays.map((day) => (
            <div
              key={day.date}
              className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 rounded-xl bg-background/60 p-4 backdrop-blur shadow-sm"
            >
              <div className="min-w-0">
                <p className="font-semibold">
                  {format(new Date(day.date * 1000), "EEE, MMM d")}
                </p>
                <p className="text-sm capitalize truncate text-muted-foreground">
                  {day.weather.description}
                </p>
              </div>

              <div className="mx-auto">
                <img
                  src={`https://openweathermap.org/img/wn/${day.weather.icon}.png`}
                  alt={day.weather.description}
                  className="w-10 h-10"
                />
              </div>

              <div className="flex flex-wrap items-center justify-end gap-2">
                <span className="flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400">
                  <ThermometerSun className="w-4 h-4" />
                  {formatTemp(day.temp_max)}
                </span>
                <span className="flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-400">
                  <ThermometerSnowflake className="w-4 h-4" />
                  {formatTemp(day.temp_min)}
                </span>
                <span className="hidden w-px h-4 ml-2 bg-border sm:inline-block" />
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Droplets className="w-4 h-4 text-sky-500" />
                  {day.humidity}%
                </span>
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Wind className="w-4 h-4 text-sky-500" />
                  {day.wind} m/s
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

