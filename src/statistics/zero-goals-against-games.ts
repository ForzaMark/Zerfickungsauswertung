import { FixtureAndEventsResponseModel } from "../api-football/query-api-football";
import { Statistic } from "./types/types";

export function createZeroGoalsAgainst(): Statistic {
  return {
    title: "Allgemein",
    description: "Anzahl Zerfickungen",
    getGame: getZeroGoalsAgainst,
  };
}

function getZeroGoalsAgainst(
  allFixturesWithEvents: ReadonlyArray<FixtureAndEventsResponseModel>
): {
  tweetText: string;
} {
  const allFixtures = allFixturesWithEvents.flatMap(({fixtures}) => fixtures)
  const allZeroGoalAgainstGames = allFixtures
    .map(({ fixture: {score} }) =>
      score.fulltime.home > score.fulltime.away ? score.fulltime.away : score.fulltime.home
    )
    .filter((value) => value === 0).length;

  return {
    tweetText: `Anteil zu Null Zerfickungen: ${
      (allZeroGoalAgainstGames / allFixtures.length) * 100
    } %`,
  };
}
