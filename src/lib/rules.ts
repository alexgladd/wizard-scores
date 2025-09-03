export const Rules = {
  numRounds(playerCount: number) {
    switch (playerCount) {
      case 3:
        return 20;
      case 4:
        return 15;
      case 5:
        return 12;
      case 6:
        return 10;
      default:
        return 0;
    }
  },
};
