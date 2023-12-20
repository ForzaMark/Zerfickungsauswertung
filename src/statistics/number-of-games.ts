import { FixtureAndEventsResponseModel } from "../api-football/query-api-football";
import { NormalisedTweetResult } from "../twitter/types";
import { Statistic } from "./types/types";

export function createGetNumberOfGames(): Statistic {
  return {
    title: "Allgemein",
    description: "Anzahl Zerfickungen",
    getGame: getNumberOfGames,
  };
}

function getNumberOfGames(
  _allTweets: ReadonlyArray<NormalisedTweetResult>,
  allFixturesWithEvents: ReadonlyArray<FixtureAndEventsResponseModel>
): {
  tweetText: string;
} {
  return {
    tweetText: `${
      allFixturesWithEvents.flatMap((value) => value.fixtures).length
    }`,
  };
}
