import { FixtureAndEventsResponseModel } from "../api-football/query-api-football";
import { NormalisedTweetResult } from "../twitter/types";
import { Statistic } from "./types/types";

export function createGetMostGamesLeague(): Statistic {
  return {
    title: "Das ist respektlos",
    description: "Liga mit den meisten Zerfickungen",
    getGame: getMostGamesLeague,
  };
}

function getMostGamesLeague(
  _allTweets: ReadonlyArray<NormalisedTweetResult>,
  fixturesWithEvents: ReadonlyArray<FixtureAndEventsResponseModel>
): {
  tweetText: string;
  additionalInformation: unknown;
} {
  const allGamesLeagueIds = fixturesWithEvents.flatMap(({ fixtures }) =>
  fixtures.map((fixture) => fixture.fixture.league.id)
);

  const leaguesByOccurrence = allGamesLeagueIds.reduce((acc, currentLeague) => {
    

    const isCurrentLeagueAlreadyDefined =
      typeof acc[currentLeague] === "number";

    if (isCurrentLeagueAlreadyDefined) {
      return {
        ...acc,
        [currentLeague]: acc[currentLeague] + 1,
      };
    } else {
      return {
        ...acc,
        [currentLeague]: 1,
      };
    }
  }, {} as { [league: string]: number });

  const filtered = Object.entries(leaguesByOccurrence)
    .filter(([_league, occurrence]) => occurrence >= 20)
    .sort((a, b) => b[1] - a[1]);

  console.log('118 is second tier belarus' )
  return { tweetText: filtered[0][0], additionalInformation: filtered };
}
