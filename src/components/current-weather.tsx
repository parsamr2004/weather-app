import { Card, CardContent } from "./ui/card";
import { ArrowDown, ArrowUp, Droplets, Wind } from "lucide-react";
import type { WeatherData, GeocodingResponse } from "@/api/types";

interface CurrentWeatherProps {
  data: WeatherData;
  locationName?: GeocodingResponse;
}

export function CurrentWeather({ data, locationName }: CurrentWeatherProps) {
  const {
    weather: [currentWeather],
    main: { temp, feels_like, temp_min, temp_max, humidity },
    wind: { speed },
  } = data;

  const formatTemp = (t: number) => `${Math.round(t)}°`;

  return (
    <Card className="overflow-hidden border-none shadow-sm rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800">
      <CardContent className="p-6">
        <div className="grid items-center gap-6 md:grid-cols-3">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-semibold leading-none truncate">
                {locationName?.name}
              </h2>
              {locationName?.state && (
                <span className="rounded-full border px-2 py-0.5 text-[10px] text-muted-foreground">
                  {locationName.state}
                </span>
              )}
            </div>
            <p className="text-sm text-muted-foreground">{locationName?.country}</p>
          </div>

          <div className="flex flex-col items-center">
            <div className="relative">
              <span className="font-bold tracking-tighter text-7xl">
                {formatTemp(temp)}
              </span>
              <div className="absolute rounded-full -inset-2 -z-10 bg-white/30 blur-2xl dark:bg-white/5" />
            </div>

            <p className="mt-2 text-sm text-muted-foreground">
              Feels like <span className="font-medium">{formatTemp(feels_like)}</span>
            </p>

            <div className="flex items-center gap-2 mt-3">
              <span className="flex items-center gap-1 px-2 py-1 text-xs font-medium text-blue-600 rounded-full bg-blue-500/10 dark:text-blue-400">
                <ArrowDown className="w-3 h-3" />
                {formatTemp(temp_min)}
              </span>
              <span className="flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400">
                <ArrowUp className="w-3 h-3" />
                {formatTemp(temp_max)}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="relative flex aspect-square w-full max-w-[180px] items-center justify-center">
              <img
                src={`https://openweathermap.org/img/wn/${currentWeather.icon}@4x.png`}
                alt={currentWeather.description}
                className="object-contain w-full h-full drop-shadow-sm"
              />
              <div className="absolute px-3 py-1 text-xs font-medium capitalize -translate-x-1/2 rounded-full bottom-1 left-1/2 bg-background/70 backdrop-blur">
                {currentWeather.description}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-6 md:grid-cols-4">
          <div className="flex items-center gap-2 p-3 rounded-xl bg-background/60 backdrop-blur">
            <Droplets className="w-4 h-4 text-blue-500" />
            <div className="leading-tight">
              <p className="text-xs text-muted-foreground">Humidity</p>
              <p className="text-sm font-medium">{humidity}%</p>
            </div>
          </div>

          <div className="flex items-center gap-2 p-3 rounded-xl bg-background/60 backdrop-blur">
            <Wind className="w-4 h-4 text-blue-500" />
            <div className="leading-tight">
              <p className="text-xs text-muted-foreground">Wind</p>
              <p className="text-sm font-medium">{speed} m/s</p>
            </div>
          </div>

          <div className="flex items-center gap-2 p-3 rounded-xl bg-background/60 backdrop-blur">
            <ArrowDown className="w-4 h-4 text-blue-500" />
            <div className="leading-tight">
              <p className="text-xs text-muted-foreground">Min</p>
              <p className="text-sm font-medium">{formatTemp(temp_min)}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 p-3 rounded-xl bg-background/60 backdrop-blur">
            <ArrowUp className="w-4 h-4 text-red-500" />
            <div className="leading-tight">
              <p className="text-xs text-muted-foreground">Max</p>
              <p className="text-sm font-medium">{formatTemp(temp_max)}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

