import { FixtureAndEventsResponseModel } from "../api-football/query-api-football";
import { NormalisedTweetResult } from "../twitter/types";
import { Statistic } from "./types/types";

export function createGetMostLoserGoals(): Statistic {
  return {
    title: "Woran hats gelegen",
    description: "Zerfickung mit den meisten Toren des unterlegenen Teams",
    getGame: getMostLoserGoals,
  };
}

function getMostLoserGoals(
  _allTweets: ReadonlyArray<NormalisedTweetResult>,
  allFixturesWithEvents: ReadonlyArray<FixtureAndEventsResponseModel>
): {
  tweetText: string;
} {
  return allFixturesWithEvents
    .flatMap((value) => value.fixtures)
    .reduce(
      (acc, { fixture }) => {
        const { score, teams } = fixture;
        const loserGoals =
          score.fulltime.home > score.fulltime.away
            ? score.fulltime.away
            : score.fulltime.home;

        return acc.loserGoals < loserGoals
          ? {
              loserGoals,
              tweetText: `${teams.home.name} ${score.fulltime.home} : ${score.fulltime.away} ${teams.away.name}`,
            }
          : acc;
      },
      { loserGoals: 0, tweetText: "initial" }
    );
}
