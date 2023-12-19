import { FixtureAndEventsResponseModel } from "../api-football/query-api-football";
import { NormalisedTweetResult } from "../twitter/types";
import { Statistic } from "./types/types";

export function createMostGamesPerDay(): Statistic {
  return {
    title: "Allgemein",
    description: "Zerfickungstag",
    getGame: getMostGamesPerDay,
  };
}

function getMostGamesPerDay(
  _allTweets: ReadonlyArray<NormalisedTweetResult>,
  fixturesWithEvents: ReadonlyArray<FixtureAndEventsResponseModel>
): {
  tweetText: string;
  additionalInformation: unknown;
} {
  const results = fixturesWithEvents.map(({ date, fixtures }) => ({
    date,
    fixtures: fixtures.length,
  }));

  const filtered = results
    .filter(({fixtures}) => fixtures > 40)
    .sort((a, b) => b.fixtures - a.fixtures);

  return {
    tweetText: `Most Games by Day: ${filtered[0]}`,
    additionalInformation: filtered,
  };
}
