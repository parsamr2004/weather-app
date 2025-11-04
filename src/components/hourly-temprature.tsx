import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { format } from "date-fns";
import type { ForecastData } from "@/api/types";

interface HourlyTemperatureProps {
  data: ForecastData;
}

interface ChartData {
  time: string;
  temp: number;
  feels_like: number;
}

export function HourlyTemperature({ data }: HourlyTemperatureProps) {
  const chartData: ChartData[] = data.list.slice(0, 8).map((item) => ({
    time: format(new Date(item.dt * 1000), "ha"),
    temp: Math.round(item.main.temp),
    feels_like: Math.round(item.main.feels_like),
  }));

  return (
    <Card className="overflow-hidden border-none shadow-sm rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-4">
          <div>
            <CardTitle className="text-lg">Today’s Temperature</CardTitle>
            <p className="text-xs text-muted-foreground">
              Next 24 hours · 3-hour intervals
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-blue-500/10 px-2 py-1 text-[10px] font-medium text-blue-600 dark:text-blue-400">
              Temp
            </span>
            <span className="rounded-full bg-slate-500/10 px-2 py-1 text-[10px] font-medium text-slate-600 dark:text-slate-300">
              Feels like
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="h-[220px] w-full rounded-xl bg-background/60 p-3 backdrop-blur">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="gradTemp" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#2563eb" />
                  <stop offset="100%" stopColor="#60a5fa" />
                </linearGradient>
                <linearGradient id="gradFeels" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#64748b" />
                  <stop offset="100%" stopColor="#94a3b8" />
                </linearGradient>
              </defs>

              <XAxis
                dataKey="time"
                stroke="currentColor"
                tick={{ fontSize: 12, fill: "currentColor", opacity: 0.7 }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="currentColor"
                tick={{ fontSize: 12, fill: "currentColor", opacity: 0.7 }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(v) => `${v}°`}
                width={36}
              />

              <Tooltip
                cursor={{ strokeOpacity: 0.15 }}
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    const t = payload.find((p) => p.dataKey === "temp");
                    const f = payload.find((p) => p.dataKey === "feels_like");
                    return (
                      <div className="px-3 py-2 text-xs border rounded-lg shadow-sm bg-background">
                        <div className="mb-1 font-medium">{label}</div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <div className="text-[10px] uppercase text-muted-foreground">
                              Temp
                            </div>
                            <div className="font-semibold">{t?.value}°</div>
                          </div>
                          <div>
                            <div className="text-[10px] uppercase text-muted-foreground">
                              Feels like
                            </div>
                            <div className="font-semibold">{f?.value}°</div>
                          </div>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />

              <Line
                type="monotone"
                dataKey="temp"
                stroke="url(#gradTemp)"
                strokeWidth={2.5}
                dot={{ r: 1.5 }}
                activeDot={{ r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="feels_like"
                stroke="url(#gradFeels)"
                strokeWidth={2}
                dot={false}
                strokeDasharray="5 5"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

