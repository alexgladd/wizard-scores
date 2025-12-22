import { Button } from "@/components/ui/button";
import { Game } from "@/lib/storage";
import { Route as SummaryRoute } from "@/routes/games/$gameId.summary";
import {
  createFileRoute,
  Link,
  notFound,
  Outlet,
  useRouterState,
} from "@tanstack/react-router";
import { format, fromUnixTime } from "date-fns";
import { TrophyIcon } from "lucide-react";

export const Route = createFileRoute("/games/$gameId")({
  component: GameLayout,
  beforeLoad: async ({ params: { gameId: gameIdStr } }) => {
    const gameId = Number.parseInt(gameIdStr, 10);
    if (Number.isNaN(gameId)) {
      return { game: null };
    }

    const game = await Game.get(gameId);

    return { game };
  },
  loader: ({ context }) => {
    if (context.game) {
      return context.game;
    } else {
      throw notFound();
    }
  },
  notFoundComponent: () => {
    return <div>Game not found!</div>;
  },
});

function GameLayout() {
  const routerState = useRouterState();
  const game = Route.useLoaderData();

  return (
    <main className="p-4 grow overflow-y-hidden flex flex-col">
      <section className="mb-4 relative">
        <h1 className="text-xl font-bold tracking-wide text-center">
          Game #{game.id}
        </h1>
        <aside className="italic text-center">
          {format(fromUnixTime(game.timestamp), "PP")} @{" "}
          {format(fromUnixTime(game.timestamp), "p")}
        </aside>
        {routerState.matches.at(-1)!.routeId !== SummaryRoute.fullPath && (
          <Button
            variant="outline"
            className="size-12 absolute top-0 right-0"
            asChild
          >
            <Link
              to="/games/$gameId/summary"
              params={{ gameId: game.id.toString() }}
            >
              <TrophyIcon className="size-6" />
            </Link>
          </Button>
        )}
      </section>
      <Outlet />
    </main>
  );
}
