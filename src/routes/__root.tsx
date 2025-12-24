import type { Game, Round } from "@/lib/storage";
import {
  createRootRouteWithContext,
  Link,
  Outlet,
} from "@tanstack/react-router";
import { Github, Heart } from "lucide-react";
import { version as appVersion } from "../../package.json";

interface RouterCtx {
  game?: Game;
  round?: Round;
}

export const Route = createRootRouteWithContext<RouterCtx>()({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <div className="w-screen h-screen flex flex-col">
        <header className="bg-background flex h-16 shrink-0 items-center gap-4 border-b px-4">
          <Link to="/">
            <img
              src="/wizard-card-logo.svg"
              alt="Wizard card back logo"
              className="h-10"
            />
          </Link>
          <span className="grow text-2xl font-bold tracking-widest">
            Scorekeeper
          </span>
          {/* <Button variant="ghost" size="icon" className="size-10 md:hidden">
            <Menu className="size-8" />
          </Button> */}
        </header>
        <Outlet />
        <footer className="mb-8 bg-background sticky flex h-8 shrink-0 items-center justify-between gap-2 border-t px-4 text-sm text-muted-foreground">
          <div className="w-16 flex gap-1">
            <a
              href="https://github.com/alexgladd/wizard-scores"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="size-4" />
            </a>
            <span>v{appVersion}</span>
          </div>
          <div className="flex gap-1">
            made with <Heart className="size-4 text-destructive" /> by{" "}
            <a
              href="https://github.com/alexgladd"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              Alex Gladd
            </a>
          </div>
          <div className="w-16 text-right">
            <Link to="/legal" className="underline">
              legal
            </Link>
          </div>
        </footer>
      </div>
      {/* <TanStackRouterDevtools position="bottom-right" /> */}
    </>
  );
}
