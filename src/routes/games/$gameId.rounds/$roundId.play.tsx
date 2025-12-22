import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  createFileRoute,
  useCanGoBack,
  useRouter,
} from "@tanstack/react-router";
import {
  ChevronLeft,
  ChevronRight,
  LoaderCircle,
  Minus,
  Plus,
} from "lucide-react";
import { Fragment, useState } from "react";

export const Route = createFileRoute("/games/$gameId/rounds/$roundId/play")({
  component: RoundPlay,
});

function RoundPlay() {
  const router = useRouter();
  const canGoBack = useCanGoBack();
  const { game, round } = Route.useRouteContext();
  const [tricks, setTricks] = useState(round!.tricks);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const totalTricks = tricks.reduce((acc, n) => acc + n, 0);

  const incrementTrickFn = (idx: number) => () => {
    setTricks((t) => {
      const newTricks = t.slice();
      newTricks[idx] = ++newTricks[idx];
      return newTricks;
    });
  };

  const decrementTrickFn = (idx: number) => () => {
    setTricks((t) => {
      const newTricks = t.slice();
      newTricks[idx] = --newTricks[idx];
      return newTricks;
    });
  };

  return (
    <>
      <section className="mb-4 grow flex flex-col">
        <div className="grid grid-cols-2 gap-3">
          {game!.players.map((player, idx) => (
            <Fragment key={`${idx}-${player}`}>
              <div className="py-4 text-lg">{player.name}'s tricks:</div>
              <div className="flex items-center gap-3">
                <Button
                  className="grow"
                  onClick={decrementTrickFn(idx)}
                  disabled={tricks[idx] === 0}
                >
                  <Minus className="size-6" />
                </Button>
                <div
                  className={cn(
                    "px-3 py-2 border border-muted text-xl font-bold font-mono rounded",
                    tricks[idx] === round!.bids[idx]
                      ? "bg-success/50"
                      : "bg-destructive/50"
                  )}
                >
                  {tricks[idx]}
                  {"/"}
                  {round!.bids[idx]}
                </div>
                <Button
                  className="grow"
                  onClick={incrementTrickFn(idx)}
                  disabled={totalTricks === round!.numTricks}
                >
                  <Plus className="size-6" />
                </Button>
              </div>
            </Fragment>
          ))}
          <div className="py-4 text-lg font-bold">Total tricks:</div>
          <div className="flex items-center justify-center gap-3">
            <div
              className={cn(
                "px-3 py-2 border border-muted text-xl font-bold font-mono rounded",
                totalTricks === round!.numTricks
                  ? "bg-success/50"
                  : "bg-destructive/50"
              )}
            >
              {totalTricks}
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="p-2 text-muted-foreground text-center italic">
          {totalTricks !== round!.numTricks
            ? "Please record all tricks"
            : "Good to go!"}
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
          <Button
            className="text-lg self-end"
            disabled={isSubmitting || totalTricks !== round!.numTricks}
            onClick={() => {}}
          >
            Next{" "}
            {isSubmitting ? (
              <LoaderCircle className="size-6 animate-spin" />
            ) : (
              <ChevronRight className="size-6" />
            )}
          </Button>
        </div>
      </section>
    </>
  );
}
