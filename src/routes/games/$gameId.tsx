import { Game } from "@/lib/storage";
import { createFileRoute, notFound, Outlet } from "@tanstack/react-router";
import { format, fromUnixTime } from "date-fns";

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
  const game = Route.useLoaderData();

  return (
    <main className="p-4 grow overflow-y-hidden flex flex-col">
      <section className="mb-4">
        <h1 className="text-xl font-bold tracking-wide text-center">
          Game #{game.id}
        </h1>
        <aside className="italic text-center">
          {format(fromUnixTime(game.timestamp), "PP")} @{" "}
          {format(fromUnixTime(game.timestamp), "p")}
        </aside>
      </section>
      <Outlet />
    </main>
  );
}
