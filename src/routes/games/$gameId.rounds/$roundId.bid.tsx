import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { createFileRoute } from "@tanstack/react-router";
import { Minus, Plus } from "lucide-react";
import { Fragment, useState } from "react";

export const Route = createFileRoute("/games/$gameId/rounds/$roundId/bid")({
  component: RoundBid,
});

function RoundBid() {
  const { game, round } = Route.useRouteContext();
  const [bids, setBids] = useState(game!.players.map(() => 0));
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

  return (
    <section className="mb-4 grid grid-cols-2 gap-3">
      {game!.players.map((player, idx) => (
        <Fragment key={`${idx}-${player}`}>
          <div className="py-4 text-lg">{player.name}'s bid:</div>
          <div className="flex items-center gap-3">
            <Button
              className="grow"
              onClick={decrementBidFn(idx)}
              disabled={bids[idx] === 0}
            >
              <Minus className="size-6" />
            </Button>
            <div className="px-3 py-2 border-1 border-muted text-xl font-bold font-mono rounded">
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
            "px-3 py-2 border-1 border-muted text-xl font-bold font-mono rounded",
            totalBids === round!.numTricks
              ? "bg-success/50"
              : "bg-destructive/50"
          )}
        >
          {totalBids}
        </div>
      </div>
    </section>
  );
}
