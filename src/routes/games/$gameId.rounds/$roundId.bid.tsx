import { Button } from "@/components/ui/button";
import { Game } from "@/lib/storage";
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

export const Route = createFileRoute("/games/$gameId/rounds/$roundId/bid")({
  component: RoundBid,
});

function RoundBid() {
  const router = useRouter();
  const canGoBack = useCanGoBack();
  const { game, round } = Route.useRouteContext();
  const [bids, setBids] = useState(round!.bids);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const totalBids = bids.reduce((acc, n) => acc + n, 0);

  const incrementBidFn = (idx: number) => () => {
    setBids((b) => {
      const newBids = b.slice();
      newBids[idx] = ++newBids[idx];
      return newBids;
    });
  };

  const decrementBidFn = (idx: number) => () => {
    setBids((b) => {
      const newBids = b.slice();
      newBids[idx] = --newBids[idx];
      return newBids;
    });
  };

  const onStartClicked = async () => {
    setIsSubmitting(true);
    const r = await Game.startRound(game!, round!.numTricks, bids);
    if (r) {
      router.navigate({
        to: "/games/$gameId/rounds/$roundId/play",
        params: {
          gameId: game!.id.toString(),
          roundId: r.numTricks.toString(),
        },
      });
    }
  };

  return (
    <>
      <section className="mb-4 grow flex flex-col">
        <div className="grid grid-cols-2 gap-3">
          {game!.players.map((player, idx) => (
            <Fragment key={`${idx}-${player}`}>
              <div className="py-3 text-lg">{player.name}'s bid:</div>
              <div className="flex items-center gap-3">
                <Button
                  className="grow"
                  onClick={decrementBidFn(idx)}
                  disabled={bids[idx] === 0}
                >
                  <Minus className="size-6" />
                </Button>
                <div className="px-3 py-2 border border-muted text-xl font-bold font-mono rounded">
                  {bids[idx]}
                </div>
                <Button
                  className="grow"
                  onClick={incrementBidFn(idx)}
                  disabled={bids[idx] === round!.numTricks}
                >
                  <Plus className="size-6" />
                </Button>
              </div>
            </Fragment>
          ))}
          <div className="py-4 text-lg font-bold">Total bids:</div>
          <div className="flex items-center justify-center gap-3">
            <div
              className={cn(
                "px-3 py-2 border border-muted text-xl font-bold font-mono rounded",
                totalBids === round!.numTricks
                  ? "bg-success/50"
                  : "bg-destructive/50"
              )}
            >
              {totalBids}
            </div>
          </div>
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
            disabled={isSubmitting}
            onClick={onStartClicked}
          >
            Start{" "}
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
