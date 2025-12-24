import { Game } from "@/lib/storage";
import { useEffect, useState } from "react";

function useGames() {
  const [games, setGames] = useState<null | Game[]>(null);

  useEffect(() => {
    Game.all().then((games) => {
      setGames(games);
    });
  }, []);

  return games;
}

export default useGames;
