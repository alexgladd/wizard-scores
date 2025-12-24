import { UTCDate } from "@date-fns/utc";
import { getUnixTime } from "date-fns";
import { Rules } from "./rules";

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

export interface Score {
  playerName: string;
  score: number;
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
  async ids() {
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

    const allIds = await this.ids();
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

  async all() {
    const ids = await this.ids();
    const games: Game[] = [];

    for (const id of ids) {
      const game = await this.get(id);
      if (game) {
        games.push(game);
      }
    }

    games.sort((a, b) => b.timestamp - a.timestamp);

    return games;
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

  async startRound(game: Game, roundNum: number, bids: number[]) {
    const round = await this.getRound(game, roundNum);
    if (round) {
      round.bids = bids;
      await this.update(game);
      return round;
    } else {
      return null;
    }
  },

  async endRound(game: Game, roundNum: number, tricks: number[]) {
    const round = await this.getRound(game, roundNum);
    if (round) {
      round.tricks = tricks;
      await this.update(game);
      return round;
    } else {
      return null;
    }
  },

  async getRound(game: Game, roundNum: number) {
    if (roundNum < 1 || roundNum > Rules.numRounds(game.players.length)) {
      console.error(
        `[Storage]: round number ${roundNum} invalid for game of ${game.players.length} players`
      );
      return null;
    }

    if (roundNum <= game.rounds.length) {
      // existing round
      return game.rounds[roundNum - 1];
    } else if (roundNum === game.rounds.length + 1) {
      // create the next round
      console.log(`[Storage]: creating new round ${roundNum}`);
      const round: Round = {
        numTricks: roundNum,
        bids: game.players.map(() => 0),
        tricks: game.players.map(() => 0),
      };

      game.rounds.push(round);
      await this.update(game);

      return round;
    } else {
      // bad state
      console.error(
        `[Storage]: Invalid round number ${roundNum} for game with ${game.rounds.length} rounds`
      );
      return null;
    }
  },

  hasNextRound(game: Game) {
    return game.rounds.length < Rules.numRounds(game.players.length);
  },

  getScores(game: Game) {
    const scores: Score[] = [];

    for (const [idx, player] of game.players.entries()) {
      const score: Score = {
        playerName: player.name,
        score: 0,
      };

      for (const round of game.rounds) {
        // only count the rounds that have been played
        if (round.numTricks !== round.tricks.reduce((acc, n) => acc + n, 0)) {
          continue;
        }

        const tricksBid = round.bids[idx];
        const tricksWon = round.tricks[idx];

        if (tricksBid === tricksWon) {
          score.score += 20;
          score.score += 10 * tricksWon;
        } else {
          const tricksDiff = Math.abs(tricksWon - tricksBid);
          score.score -= 10 * tricksDiff;
        }
      }

      scores.push(score);
    }

    scores.sort((a, b) => b.score - a.score);

    return scores;
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
      reject(new Error(`Failed to set item ${key}: ${String(e)}`));
    }
  });
}

async function getItemAsync(key: string) {
  return new Promise<string | null>((resolve) => {
    const value = localStorage.getItem(key);
    resolve(value);
  });
}
