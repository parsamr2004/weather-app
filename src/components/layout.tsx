import type { PropsWithChildren } from "react";
import { Header } from "./header";

export function Layout({ children }: PropsWithChildren) {
  return (
    <div className="relative min-h-dvh bg-gradient-to-br from-background via-background to-muted/60 overflow-x-clip">
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div
          className="absolute top-[-6rem] left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl"
        />
        <div
          className="absolute bottom-[-4rem] left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-indigo-500/10 blur-3xl"
        />
      </div>

      <Header />

      <main className="container flex-1 px-4 py-8 mx-auto">
        <section className="p-4 border shadow-sm rounded-2xl bg-background/70 backdrop-blur md:p-6">
          {children}
        </section>
      </main>

      <footer className="border-t">
        <div className="container px-4 py-4 mx-auto">
          <div className="w-full max-w-3xl p-5 mx-auto text-center shadow-sm rounded-2xl bg-background/60 backdrop-blur">
            <p className="mt-1 text-sm">
              Made with 💗 by <span className="font-semibold">Parsa</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

