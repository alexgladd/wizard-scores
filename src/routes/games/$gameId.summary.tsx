import { Button } from "@/components/ui/button";
import { Game } from "@/lib/storage";
import {
  createFileRoute,
  useCanGoBack,
  useRouter,
} from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { Fragment, useMemo } from "react";

export const Route = createFileRoute("/games/$gameId/summary")({
  component: GameSummary,
});

function GameSummary() {
  const router = useRouter();
  const canGoBack = useCanGoBack();
  const { game } = Route.useRouteContext();
  const scores = useMemo(() => Game.getScores(game!), [game]);

  console.log(game, scores);

  return (
    <>
      <section className="mb-4">
        <h2 className="text-lg font-bold tracking-wide text-center">Scores</h2>
      </section>
      <section className="mb-4 grow flex flex-col">
        <div className="grid grid-cols-2 gap-3">
          {scores.map((score, idx) => (
            <Fragment key={`${idx}-${score.playerName}`}>
              <div className="py-4 text-lg">{score.playerName}:</div>
              <div className="flex items-center justify-center">
                <div className="px-3 py-2 border border-muted text-xl font-bold font-mono rounded">
                  {score.score}
                </div>
              </div>
            </Fragment>
          ))}
        </div>
      </section>
      <section>
        <div className="flex justify-between">
          {canGoBack ? (
            <Button
              variant="outline"
              className="text-lg self-start"
              onClick={() => router.history.back()}
            >
              <ChevronLeft className="size-6" /> Back
            </Button>
          ) : (
            <div></div>
          )}
          <div></div>
        </div>
      </section>
    </>
  );
}
