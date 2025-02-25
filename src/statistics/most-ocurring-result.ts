import { FixtureAndEventsResponseModel } from "../api-football/query-api-football";
 
import { Statistic } from "./types/types";

export function createGetMostOccurringResults(): Statistic {
  return {
    title: "Allgemein",
    description: "Häufigstes Ergebniss",
    getGame: getMostOccurringResult,
  };
}

function getMostOccurringResult(
   
  allFixturesWithEvents: ReadonlyArray<FixtureAndEventsResponseModel>
): {
  result: string,
  numberOfGames: number
} {
  const results = allFixturesWithEvents.flatMap(value => value.fixtures).map(({ fixture }) =>
    fixture.score.fulltime.home > fixture.score.fulltime.away
      ? `${fixture.score.fulltime.home}:${fixture.score.fulltime.away}`
      : `${fixture.score.fulltime.away}:${fixture.score.fulltime.home}`
  );

  const numberOfDates = results.reduce(
    (acc, curr) => {
      const isResultAlreadyDefined = typeof acc[curr] === "number";

      if (isResultAlreadyDefined) {
        return {
          ...acc,
          [curr]: acc[curr] + 1,
        };
      } else {
        return {
          ...acc,
          [curr]: 1,
        };
      }
    },

    {} as { [result: string]: number }
  );

  const filtered = Object.entries(numberOfDates)
    .sort((a, b) => b[1] - a[1]);

  return {
    result: filtered[0][0],
    numberOfGames: filtered[0][1]
  };
}
