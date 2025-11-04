import { useNavigate } from "react-router-dom";
import { useWeatherQuery } from "@/hooks/use-weather";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFavorites } from "@/hooks/use-favorite";
import { toast } from "sonner";

interface FavoriteCityTabletProps {
  id: string;
  name: string;
  lat: number;
  lon: number;
  onRemove: (id: string) => void;
}

function FavoriteCityTablet({
  id,
  name,
  lat,
  lon,
  onRemove,
}: FavoriteCityTabletProps) {
  const navigate = useNavigate();
  const { data: weather, isLoading } = useWeatherQuery({ lat, lon });

  const handleClick = () => {
    navigate(`/city/${name}?lat=${lat}&lon=${lon}`);
  };

  return (
    <div
      onClick={handleClick}
      role="button"
      tabIndex={0}
      className={[
        "group relative min-w-[220px] snap-start",
        "rounded-2xl border bg-gradient-to-br from-blue-50 to-indigo-50 p-4 shadow-sm",
        "dark:from-slate-900 dark:to-slate-800",
        "transition-all hover:shadow-md hover:-translate-y-0.5 focus-visible:outline-none"
      ].join(" ")}
    >
      <Button
        aria-label={`Remove ${name} from favorites`}
        variant="ghost"
        size="icon"
        className={[
          "absolute right-2 top-2 h-7 w-7 rounded-full",
          "bg-background/70 backdrop-blur ring-1 ring-border",
          "opacity-0 transition-opacity group-hover:opacity-100"
        ].join(" ")}
        onClick={(e) => {
          e.stopPropagation();
          onRemove(id);
          toast.error(`Removed ${name} from Favorites`);
        }}
      >
        <X className="w-4 h-4" />
      </Button>

      <div className="flex items-start gap-3">
        <div className="relative w-10 h-10 shrink-0">
          {isLoading ? (
            <div className="grid w-full h-full place-items-center">
              <Loader2 className="w-4 h-4 animate-spin" />
            </div>
          ) : weather ? (
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
              alt={weather.weather[0].description}
              className="w-10 h-10 drop-shadow-sm"
            />
          ) : null}
        </div>

        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <p className="font-semibold truncate">{name}</p>
            {weather?.sys.country && (
              <span className="rounded-full border px-2 py-0.5 text-[10px] text-muted-foreground">
                {weather.sys.country}
              </span>
            )}
          </div>
          <p className="mt-0.5 line-clamp-1 text-xs capitalize text-muted-foreground">
            {weather?.weather?.[0]?.description ?? ""}
          </p>
        </div>

        <div className="ml-auto text-right">
          {isLoading ? (
            <div className="mt-1">
              <Loader2 className="w-4 h-4 animate-spin" />
            </div>
          ) : weather ? (
            <p className="text-2xl font-bold leading-none">
              {Math.round(weather.main.temp)}°
            </p>
          ) : null}
        </div>
      </div>

      {!isLoading && weather && (
        <div className="flex items-center justify-between px-3 py-2 mt-3 text-xs rounded-xl bg-background/60 backdrop-blur">
          <div className="text-muted-foreground">
            {(+lat).toFixed(2)}, {(+lon).toFixed(2)}
          </div>
          <div className="text-muted-foreground">
            feels like <span className="font-medium">{Math.round(weather.main.feels_like)}°</span>
          </div>
        </div>
      )}
    </div>
  );
}

export function FavoriteCities() {
  const { favorites, removeFavorite } = useFavorites();

  if (!favorites.length) return null;

  return (
    <>
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-xl font-bold tracking-tight">Favorites</h1>
      </div>

      <ScrollArea className="w-full pb-4">
        <div
          className={[
            "flex gap-4",
            "snap-x snap-mandatory overflow-x-auto px-0"
          ].join(" ")}
        >
          {favorites.map((city) => (
            <FavoriteCityTablet
              key={city.id}
              {...city}
              onRemove={() => removeFavorite.mutate(city.id)}
            />
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="mt-2" />
      </ScrollArea>
    </>
  );
}

