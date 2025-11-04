import { Link } from "react-router-dom";
import { CitySearch } from "./city-search";
import { ThemeToggle } from "./theme-toggle";

function WeatherMark(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 48 48"
      aria-hidden="true"
      {...props}
      className={["h-8 w-8", props.className].join(" ")}
    >
      <defs>
        <linearGradient id="sun" x1="0" x2="1">
          <stop offset="0%" stopColor="#FDE047" />
          <stop offset="100%" stopColor="#F97316" />
        </linearGradient>
        <linearGradient id="cloud" x1="0" x2="1">
          <stop offset="0%" stopColor="#93C5FD" />
          <stop offset="100%" stopColor="#60A5FA" />
        </linearGradient>
      </defs>
      {/* sun */}
      <circle cx="16" cy="16" r="6.5" fill="url(#sun)" />
      {/* rays */}
      <g stroke="url(#sun)" strokeWidth="2" strokeLinecap="round">
        <line x1="16" y1="5" x2="16" y2="1" />
        <line x1="16" y1="31" x2="16" y2="35" />
        <line x1="5" y1="16" x2="1" y2="16" />
        <line x1="31" y1="16" x2="35" y2="16" />
        <line x1="7.5" y1="7.5" x2="4.8" y2="4.8" />
        <line x1="24.5" y1="24.5" x2="27.2" y2="27.2" />
        <line x1="24.5" y1="7.5" x2="27.2" y2="4.8" />
        <line x1="7.5" y1="24.5" x2="4.8" y2="27.2" />
      </g>
      <path
        d="M30.5 22c-1.5-4-5.5-6.5-9.8-6-4.6.6-8 4.5-8.2 9.1-3.6.3-6.5 3.1-6.5 6.7 0 3.7 3 6.7 6.7 6.7h19.7c4 0 7.3-3.2 7.3-7.3S36.4 22 32.3 22c-.6 0-1.2 0-1.8.1Z"
        fill="url(#cloud)"
      />
    </svg>
  );
}

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container px-4 mx-auto">
        <nav className="flex items-center justify-between h-16 gap-3">
          <Link to="/" className="flex items-center gap-2 px-2 py-1 rounded-xl hover:bg-muted/40">
            <WeatherMark className="w-8 h-8" />
            <span className="hidden text-lg font-semibold tracking-tight sm:inline-block">
              Parsa_Weather!
            </span>
          </Link>

          <div className="flex-1 max-w-xl">
            <CitySearch />
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </header>
  );
}
