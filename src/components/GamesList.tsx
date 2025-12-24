import useGames from "@/hooks/use-games";
import { Link } from "@tanstack/react-router";
import { format, fromUnixTime } from "date-fns";
import { TrophyIcon } from "lucide-react";
import { Fragment, useMemo } from "react";
import { Button } from "./ui/button";

function GamesList() {
  const games = useGames();
  const title = useMemo(() => {
    if (games === null) {
      return "Loading...";
    } else if (games.length === 0) {
      return "No previous games";
    } else {
      return `${games.length} previous game${games.length === 1 ? "" : "s"}`;
    }
  }, [games]);

  return (
    <section className="mb-10">
      <h2 className="mb-4 text-xl text-center">{title}</h2>
      {games && (
        <div className="grid grid-cols-6 gap-3 items-center">
          <div className="font-bold">#</div>
          <div className="font-bold col-span-3">Date</div>
          <div className="font-bold">Players</div>
          <div></div>
          {games.map((game) => (
            <Fragment key={game.id}>
              <div>{game.id}</div>
              <div className="col-span-3">
                {format(fromUnixTime(game.timestamp), "PP")} @{" "}
                {format(fromUnixTime(game.timestamp), "p")}
              </div>
              <div>{game.players.length}</div>
              <div className="flex justify-end">
                <Button variant="outline" size="icon" asChild>
                  <Link
                    to="/games/$gameId/summary"
                    params={{ gameId: game.id.toString() }}
                  >
                    <TrophyIcon className="size-4" />
                  </Link>
                </Button>
              </div>
            </Fragment>
          ))}
        </div>
      )}
    </section>
  );
}

export default GamesList;
