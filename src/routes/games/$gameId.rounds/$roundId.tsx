import { Game } from "@/lib/storage";
import { createFileRoute, notFound, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/games/$gameId/rounds/$roundId")({
  component: RoundLayout,
  beforeLoad: async ({ params: { roundId: roundIdStr }, context }) => {
    if (!context.game) {
      return { round: null };
    }

    const roundId = Number.parseInt(roundIdStr, 10);
    if (Number.isNaN(roundId)) {
      return { round: null };
    }

    return { round: await Game.getRound(context.game, roundId) };
  },
  loader: ({ context }) => {
    if (context.game && context.round) {
      return { game: context.game, round: context.round };
    } else {
      throw notFound();
    }
  },
});

function RoundLayout() {
  const { round } = Route.useLoaderData();

  return (
    <>
      <section className="mb-4">
        <h2 className="text-lg font-bold tracking-wide text-center">
          Round #{round.numTricks}
        </h2>
      </section>
      <Outlet />
    </>
  );
}
