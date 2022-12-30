import { createCompetitionClassification } from './competition-classification';
import { createFastestDecidingGoal } from './fastest-minute-of-deciding-goal';
import { createGetHighestAway } from './highest-away';
import { createGetHighestGame } from './highest-game';
import { createGetMonthWithMostGames } from './month-with-most-games';
import { createGetMostGamesLeague } from './most-games-league';
import { createMostGamesLostByTeam } from './most-games-lost-by-team';
import { createMostGamesPerDay } from './most-games-per-day';
import { createMostGamesWonByTeam } from './most-games-won-by-team';
import { createGetMostLoserGoals } from './most-loser-goals';
import { createGetMostOccurringResults } from './most-ocurring-result';
import { createGetMostOwnGoals } from './most-own-goals';
import { createGetMostPopular } from './most-popular';
import { createGetNumberOfGames } from './number-of-games';
import { createGetPlayerWithMostGoalsInAllGames } from './player-with-most-goals-in-all-games';
import { createGetPlayerWithMostGoalsInSingleGame } from './player-with-most-goals-in-single-game';
import { Statistic } from './types/types';
import { createWinsFromBehind } from './wins-from-behind';
import { createZeroGoalsAgainst } from './zero-goals-against-games';
import { createLatestMinuteOfFirstGoal } from './latest-minute-of-first-goal';
import { createLowestTimeDifferenceBetweenGoals } from './lowest-time-difference-between-goals';
import { createMinuteOfDecidingGoal } from './minute-of-deciding-goal';

export function getAllStatistics(): ReadonlyArray<Statistic> {
  return [
    createGetHighestGame(),
    createGetMostPopular(),
    createGetHighestAway(),
    createGetMostLoserGoals(),
    createGetMostGamesLeague(),
    createMostGamesLostByTeam(),
    createMostGamesWonByTeam(),
    createGetNumberOfGames(),
    createGetMonthWithMostGames(),
    createGetMostOccurringResults(),
    createMostGamesPerDay(),
    createGetPlayerWithMostGoalsInAllGames(),
    createGetPlayerWithMostGoalsInSingleGame(),
    createGetMostOwnGoals(),
    createCompetitionClassification(),
    createZeroGoalsAgainst(),
    createWinsFromBehind(),
    createMinuteOfDecidingGoal(),
    createFastestDecidingGoal(),
    createLatestMinuteOfFirstGoal(),
    createLowestTimeDifferenceBetweenGoals()
  ];
}
