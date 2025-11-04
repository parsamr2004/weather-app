import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { SunDim, MoonStar, Navigation, Gauge } from "lucide-react";
import { format } from "date-fns";
import type { WeatherData } from "@/api/types";

interface WeatherDetailsProps {
  data: WeatherData;
}

export function WeatherDetails({ data }: WeatherDetailsProps) {
  const { wind, main, sys } = data;

  const formatTime = (ts: number) => format(new Date(ts * 1000), "h:mm a");

  const getWindDirection = (deg: number) => {
    const d = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    const i = Math.round((((deg %= 360) < 0 ? deg + 360 : deg) / 45)) % 8;
    return d[i];
  };

  const items = [
    {
      title: "Sunrise",
      value: formatTime(sys.sunrise),
      icon: SunDim,
      badge: "from-amber-400 to-orange-500",
      fg: "text-amber-600 dark:text-amber-400",
    },
    {
      title: "Sunset",
      value: formatTime(sys.sunset),
      icon: MoonStar,
      badge: "from-indigo-400 to-blue-500",
      fg: "text-indigo-600 dark:text-indigo-400",
    },
    {
      title: "Wind Direction",
      value: `${getWindDirection(wind.deg)} (${wind.deg}°)`,
      icon: Navigation,
      badge: "from-emerald-400 to-teal-500",
      fg: "text-emerald-600 dark:text-emerald-400",
    },
    {
      title: "Pressure",
      value: `${main.pressure} hPa`,
      icon: Gauge,
      badge: "from-purple-400 to-fuchsia-500",
      fg: "text-purple-600 dark:text-purple-400",
    },
  ];

  return (
    <Card className="overflow-hidden border-none shadow-sm rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Weather Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 sm:grid-cols-2">
          {items.map(({ title, value, icon: Icon, badge, fg }) => (
            <div
              key={title}
              className="flex items-center gap-3 p-4 shadow-sm rounded-xl bg-background/60 backdrop-blur"
            >
              <div
                className={[
                  "grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br",
                  badge,
                ].join(" ")}
              >
                <Icon className="w-5 h-5 text-white" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-medium tracking-wide uppercase text-muted-foreground">
                  {title}
                </p>
                <p className={["truncate text-sm font-semibold", fg].join(" ")}>
                  {value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

