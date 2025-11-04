import { useParams, useSearchParams } from "react-router-dom";
import { useWeatherQuery, useForecastQuery } from "@/hooks/use-weather";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import { CurrentWeather } from "../components/current-weather";
import { HourlyTemperature } from "../components/hourly-temprature";
import { WeatherDetails } from "../components/weather-details";
import { WeatherForecast } from "../components/weather-forecast";
import WeatherSkeleton from "../components/loading-skeleton";
import { FavoriteButton } from "@/components/favorite-button";

export function CityPage() {
  const [searchParams] = useSearchParams();
  const params = useParams();
  const lat = parseFloat(searchParams.get("lat") || "0");
  const lon = parseFloat(searchParams.get("lon") || "0");

  const coordinates = { lat, lon };
  const weatherQuery = useWeatherQuery(coordinates);
  const forecastQuery = useForecastQuery(coordinates);

  if (weatherQuery.error || forecastQuery.error) {
    return (
      <Alert variant="destructive" className="rounded-2xl">
        <AlertTriangle className="w-4 h-4" />
        <AlertDescription>
          Failed to load weather data. Please try again.
        </AlertDescription>
      </Alert>
    );
  }

  if (!weatherQuery.data || !forecastQuery.data || !params.cityName) {
    return <WeatherSkeleton />;
  }

  return (
    <div className="space-y-6">
      <div className="p-5 border-none shadow-sm rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 backdrop-blur dark:from-slate-900 dark:to-slate-800">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div className="min-w-0">
            <h1 className="text-3xl font-bold tracking-tight truncate">
              {params.cityName}
            </h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="rounded-full border px-2 py-0.5 text-xs text-muted-foreground">
                {weatherQuery.data.sys.country}
              </span>
              <span className="text-xs text-muted-foreground">
                {Math.round(weatherQuery.data.main.temp)}°
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <FavoriteButton data={{ ...weatherQuery.data, name: params.cityName }} />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="grid gap-6">
        <CurrentWeather data={weatherQuery.data} />
        <HourlyTemperature data={forecastQuery.data} />

        <div className="grid items-start gap-6 md:grid-cols-2">
          <WeatherDetails data={weatherQuery.data} />
          <WeatherForecast data={forecastQuery.data} />
        </div>
      </div>
    </div>
  );
}

