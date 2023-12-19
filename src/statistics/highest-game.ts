import { FixtureAndEventsResponseModel } from "../api-football/query-api-football";
import { NormalisedTweetResult } from "../twitter/types";
import { Statistic } from "./types/types";

export function createGetHighestGame(): Statistic {
  return {
    title: "Doch das Loch bleibt",
    description: "höchste Zerfickung",
    getGame: getHighestGame,
  };
}

function getHighestGame(
  _allTweets: ReadonlyArray<NormalisedTweetResult>,
  allFixturesWithEvents: ReadonlyArray<FixtureAndEventsResponseModel>
): {
  tweetText: string;
} {
  return allFixturesWithEvents.flatMap((value) => value.fixtures).reduce(
    (acc, { fixture: {teams, score} }) => {
      const currentDifference =
        score.fulltime.home > score.fulltime.away
          ? score.fulltime.home - score.fulltime.away
          : score.fulltime.away - score.fulltime.home;

      return currentDifference > acc.difference
        ? {
            difference: currentDifference,
            tweetText: `${teams.home.name} ${score.fulltime.home} : ${score.fulltime.away} ${teams.away.name}`,
          }
        : acc;
    },
    { difference: 0, tweetText: "initial" }
  );
}
