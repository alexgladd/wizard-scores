import { UTCDate } from "@date-fns/utc";
import { getUnixTime } from "date-fns";

export interface NewPlayer {
  name: string;
}

export interface Player {
  name: string;
  wizards: number;
}

export interface Round {
  numTricks: number;
  bids: number[];
  tricks: number[];
}

export interface Game {
  id: number;
  timestamp: number;
  players: Player[];
  rounds: Round[];
}

export interface Games {
  ids: number[];
}

const GAME_IDS = "WizGameIds";
const GAME_PREFIX = "WizGame-";

export const Game = {
  async all() {
    const gameIdsJson = await getItemAsync(GAME_IDS);

    if (gameIdsJson) {
      const games = JSON.parse(gameIdsJson) as Games;
      return games.ids;
    } else {
      return [];
    }
  },

  async new(newPlayers: NewPlayer[]) {
    if (newPlayers.length < 3 || newPlayers.length > 6) {
      throw new Error("Wizard games must have 3 to 6 players");
    }

    const allIds = await this.all();
    const id = nextId(allIds);

    const players: Player[] = newPlayers.map((p) => ({
      name: p.name,
      wizards: 0,
    }));

    const game: Game = {
      id,
      timestamp: getUnixTime(new UTCDate()),
      players,
      rounds: [],
    };

    allIds.push(id);
    await setItemAsync(GAME_IDS, JSON.stringify({ ids: allIds }));
    await this.update(game);

    return game;
  },

  async get(id: number) {
    const gameJson = await getItemAsync(`${GAME_PREFIX}${id}`);

    if (gameJson) {
      return JSON.parse(gameJson) as Game;
    } else {
      return null;
    }
  },

  async update(game: Game) {
    await setItemAsync(`${GAME_PREFIX}${game.id}`, JSON.stringify(game));
  },
};

function nextId(ids: number[]) {
  return ids.reduce((_, id) => id + 1, 1);
}

async function setItemAsync(key: string, value: string) {
  return new Promise<void>((resolve, reject) => {
    try {
      localStorage.setItem(key, value);
      resolve();
    } catch (e) {
      reject(e);
    }
  });
}

async function getItemAsync(key: string) {
  return new Promise<string | null>((resolve) => {
    const value = localStorage.getItem(key);
    resolve(value);
  });
}
