import { v4 as uuidv4 } from "uuid";

const getMatchNameBasedOnIndex = (index: number) => {
  switch (index) {
    case 0:
      return "Premier match";
    case 1:
      return "Second match";
    case 2:
      return "Troisième match";
    case 3:
      return "Quatrième match";
    case 4:
      return "Première demi-finale";
    case 5:
      return "Deuxième demi-finale";
    case 6:
      return "Finale";
    default:
      return "Match";
  }
};

const determineNextRound = (matchIndex: number) => {
  switch (matchIndex) {
    // Match 1 or 3
    case 0:
    case 2:
      return 4;
    // Match 2 or 4
    case 1:
    case 3:
      return 5;
    // Match 5 or 6
    case 4:
    case 5:
      return 6;
    default:
      return -1;
  }
};

export const matchsHelpers = {
  name: getMatchNameBasedOnIndex,
  nextRound: determineNextRound,
  generateUuid: uuidv4,
};
