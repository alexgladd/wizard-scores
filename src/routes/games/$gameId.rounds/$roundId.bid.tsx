import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/games/$gameId/rounds/$roundId/bid")({
  component: RoundBid,
});

function RoundBid() {
  return <div>Enter player bids for this round!</div>;
}
