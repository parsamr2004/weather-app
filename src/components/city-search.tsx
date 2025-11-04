import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import {
  Search,
  Loader2,
  Clock,
  Star,
  XCircle,
  Sparkles,
  MapPin,
  ArrowRight,
} from "lucide-react";

import { useLocationSearch } from "@/hooks/use-weather";
import { useSearchHistory } from "@/hooks/use-search-history";
import { useFavorites } from "@/hooks/use-favorite";

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border px-2 py-0.5 text-[10px] leading-none text-muted-foreground">
      {children}
    </span>
  );
}

function Row({
  icon,
  title,
  subtitle,
  right,
}: {
  icon: React.ReactNode;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  right?: React.ReactNode;
}) {
  return (
    <div className="flex items-center w-full gap-2">
      <div className="shrink-0 opacity-80">{icon}</div>
      <div className="flex flex-col min-w-0">
        <div className="truncate">{title}</div>
        {subtitle && (
          <div className="text-xs truncate text-muted-foreground">
            {subtitle}
          </div>
        )}
      </div>
      <div className="ml-auto shrink-0 opacity-60">{right}</div>
    </div>
  );
}

export function CitySearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const navigate = useNavigate();
  const { data: locations, isLoading } = useLocationSearch(query);
  const { favorites } = useFavorites();
  const { history, clearHistory, addToHistory } = useSearchHistory();

  const handleSelect = (cityData: string) => {
    const [lat, lon, name, country] = cityData.split("|");
    addToHistory.mutate({
      query,
      name,
      lat: parseFloat(lat),
      lon: parseFloat(lon),
      country,
    });
    setOpen(false);
    navigate(`/city/${name}?lat=${lat}&lon=${lon}`);
  };

  const trending = [
    { name: "London", country: "GB", lat: 51.5072, lon: -0.1276 },
    { name: "Istanbul", country: "TR", lat: 41.0082, lon: 28.9784 },
    { name: "Tehran", country: "IR", lat: 35.6892, lon: 51.389 },
    { name: "Dubai", country: "AE", lat: 25.276987, lon: 55.296249 },
  ];

  return (
    <>
      <Button
        variant="outline"
        className="relative w-full justify-start text-sm text-muted-foreground sm:pr-12 md:w-48 lg:w-72 backdrop-blur supports-[backdrop-filter]:bg-background/70"
        onClick={() => setOpen(true)}
      >
        <Search className="w-4 h-4 mr-2" />
        Search cities…
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command className="border shadow-sm rounded-xl">
          <div className="flex items-center justify-between px-3 pt-3 pb-1">
            <div className="flex items-center gap-2">
              <div className="grid rounded-lg h-7 w-7 place-items-center bg-primary/10">
                <Sparkles className="w-4 h-4 text-primary" />
              </div>
              <div className="leading-tight">
                <div className="text-sm font-medium">City Finder</div>
              </div>
            </div>
          </div>

          <CommandInput
            placeholder="Search cities..."
            value={query}
            onValueChange={setQuery}
          />

          <CommandList className="pb-2">
            {query.length > 2 && !isLoading && !locations?.length && (
              <CommandEmpty>No cities found.</CommandEmpty>
            )}

            {favorites.length > 0 && !query && (
              <CommandGroup heading="Favorites">
                {favorites.map((city) => (
                  <CommandItem
                    key={`fav-${city.id}`}
                    value={`${city.lat}|${city.lon}|${city.name}|${city.country}`}
                    onSelect={handleSelect}
                  >
                    <Row
                      icon={<Star className="w-4 h-4 text-yellow-500" />}
                      title={
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{city.name}</span>
                          {city.state && <Pill>{city.state}</Pill>}
                          <Pill>{city.country}</Pill>
                        </div>
                      }
                      subtitle="Favorite city"
                      right={<ArrowRight className="w-4 h-4" />}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            )}

            {history.length > 0 && !query && (
              <>
                <CommandSeparator />
                <CommandGroup heading="Recent searches">
                  <div className="flex items-center justify-between mx-2 mb-1">
                    <div className="text-xs text-muted-foreground">
                      Quick access
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="gap-1 px-2 text-xs h-7"
                      onClick={() => clearHistory.mutate()}
                    >
                      <XCircle className="h-3.5 w-3.5" />
                      Clear
                    </Button>
                  </div>

                  {history.map((item) => (
                    <CommandItem
                      key={`his-${item.id}`}
                      value={`${item.lat}|${item.lon}|${item.name}|${item.country}`}
                      onSelect={handleSelect}
                    >
                      <Row
                        icon={
                          <Clock className="w-4 h-4 text-muted-foreground" />
                        }
                        title={
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{item.name}</span>
                            {item.state && <Pill>{item.state}</Pill>}
                            <Pill>{item.country}</Pill>
                          </div>
                        }
                        subtitle={format(item.searchedAt, "MMM d, h:mm a")}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </>
            )}

            {!query && favorites.length === 0 && history.length === 0 && (
              <>
                <CommandSeparator />
                <CommandGroup heading="Trending">
                  {trending.map((t) => (
                    <CommandItem
                      key={`tr-${t.lat}-${t.lon}`}
                      value={`${t.lat}|${t.lon}|${t.name}|${t.country}`}
                      onSelect={handleSelect}
                      className="cursor-pointer"
                    >
                      <Row
                        icon={<MapPin className="w-4 h-4" />}
                        title={
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{t.name}</span>
                            <Pill>{t.country}</Pill>
                          </div>
                        }
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </>
            )}

            <CommandSeparator />

            <CommandGroup heading="Suggestions">
              {isLoading && (
                <div className="flex items-center justify-center p-4">
                  <Loader2 className="w-4 h-4 animate-spin" />
                </div>
              )}

              {!isLoading &&
                locations?.map((loc) => (
                  <CommandItem
                    key={`${loc.lat}-${loc.lon}`}
                    value={`${loc.lat}|${loc.lon}|${loc.name}|${loc.country}`}
                    onSelect={handleSelect}
                    className="cursor-pointer"
                  >
                    <Row
                      icon={<Search className="w-4 h-4 cursor-pointer" />}
                      title={
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{loc.name}</span>
                          {loc.state && <Pill>{loc.state}</Pill>}
                          <Pill>{loc.country}</Pill>
                        </div>
                      }
                      right={
                        <span className="text-[10px]">
                          {(+loc.lat).toFixed(2)}, {(+loc.lon).toFixed(2)}
                        </span>
                      }
                    />
                  </CommandItem>
                ))}
            </CommandGroup>
          </CommandList>

          <div className="flex items-center justify-between px-3 py-2 text-xs border-t text-muted-foreground">
            <div className="flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5" />
              Real-time results powered by OpenWeather
            </div>
          </div>
        </Command>
      </CommandDialog>
    </>
  );
}
