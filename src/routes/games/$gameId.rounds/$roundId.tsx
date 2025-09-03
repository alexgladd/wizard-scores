import { Rules } from "@/lib/rules";
import { createFileRoute, notFound, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/games/$gameId/rounds/$roundId")({
  component: RoundLayout,
  beforeLoad: ({ params: { roundId: roundIdStr }, context }) => {
    if (!context.game) {
      return { roundId: null };
    }

    const roundId = Number.parseInt(roundIdStr, 10);
    if (Number.isNaN(roundId)) {
      return { roundId: null };
    } else if (
      roundId < 1 ||
      roundId > Rules.numRounds(context.game.players.length)
    ) {
      return { roundId: null };
    }

    return { roundId };
  },
  loader: ({ context }) => {
    if (context.game && context.roundId) {
      return { game: context.game, roundId: context.roundId };
    } else {
      throw notFound();
    }
  },
});

function RoundLayout() {
  const { roundId } = Route.useLoaderData();

  return (
    <>
      <section className="mb-4">
        <h2 className="text-lg font-bold tracking-wide text-center">
          Round #{roundId}
        </h2>
      </section>
      <Outlet />
    </>
  );
}
