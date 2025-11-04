import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { WeatherData } from "@/api/types";
import { useFavorites } from "@/hooks/use-favorite";
import { toast } from "sonner";

interface FavoriteButtonProps {
  data: WeatherData;
}

export function FavoriteButton({ data }: FavoriteButtonProps) {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const isCurrentlyFavorite = isFavorite(data.coord.lat, data.coord.lon);

  const handleToggleFavorite = () => {
    if (isCurrentlyFavorite) {
      removeFavorite.mutate(`${data.coord.lat}-${data.coord.lon}`);
      toast.error(`Removed ${data.name} from Favorites`);
    } else {
      addFavorite.mutate({
        name: data.name,
        lat: data.coord.lat,
        lon: data.coord.lon,
        country: data.sys.country,
      });
      toast.success(`Added ${data.name} to Favorites`);
    }
  };

  return (
    <Button
      aria-label={isCurrentlyFavorite ? "Remove from favorites" : "Add to favorites"}
      onClick={handleToggleFavorite}
      size="icon"
      variant="ghost"
      className={[
        "rounded-full transition-all",
        "shadow-sm hover:shadow",
        isCurrentlyFavorite
          ? "bg-gradient-to-br from-yellow-400 to-amber-500 text-white hover:from-yellow-500 hover:to-amber-600"
          : "bg-background/60 hover:bg-background/80",
        isCurrentlyFavorite
          ? "ring-2 ring-yellow-400/60 hover:ring-yellow-500/70"
          : "ring-1 ring-border hover:ring-2",
        "backdrop-blur"
      ].join(" ")}
    >
      <Star
        className={[
          "h-4 w-4 transition-transform",
          isCurrentlyFavorite ? "fill-current scale-110" : "scale-100 text-muted-foreground"
        ].join(" ")}
      />
    </Button>
  );
}
