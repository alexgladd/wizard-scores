import { Button } from "@/components/ui/button";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Menu } from "lucide-react";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <div className="w-screen h-screen flex flex-col">
        <header className="bg-background flex h-16 shrink-0 items-center gap-4 border-b px-4">
          <img
            src="/wizard-card-logo.svg"
            alt="Wizard card back logo"
            className="h-10"
          />
          <span className="grow text-2xl font-bold tracking-widest">
            Scorekeeper
          </span>
          <Button variant="ghost" size="icon" className="size-10 md:hidden">
            <Menu className="size-8" />
          </Button>
        </header>
        <Outlet />
        <footer className="bg-background sticky flex h-8 shrink-0 items-center gap-2 border-t px-4 text-sm">
          Footer
        </footer>
      </div>
      <TanStackRouterDevtools position="bottom-right" />
    </>
  );
}
