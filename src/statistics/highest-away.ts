import { FixtureAndEventsResponseModel } from "../api-football/query-api-football";
import { Statistic } from "./types/types";

export function createGetHighestAway(): Statistic {
  return {
    title: "Füße geblutet",
    description: "höchste Auswärtszerfickung",
    getGame: getHighestAway,
  };
}

function getHighestAway(
  allFixturesWithEvents: ReadonlyArray<FixtureAndEventsResponseModel>
): {
  tweetText: string;
} {
  return allFixturesWithEvents
    .flatMap(({ fixtures }) => fixtures)
    .reduce(
      (acc, { fixture: { score, teams } }) => {
        if (score.fulltime.home > score.fulltime.away) {
          return acc;
        } else {
          const currentDifference = score.fulltime.away - score.fulltime.home;

          return currentDifference > acc.difference
            ? {
                difference: currentDifference,
                tweetText: `${teams.home.name} ${score.fulltime.home} : ${score.fulltime.away} ${teams.away.name}`,
              }
            : acc;
        }
      },
      { difference: 0, tweetText: "initial" }
    );
}
