import { FixtureAndEventsResponseModel } from "../api-football/query-api-football";
import { NormalisedTweetResult } from "../twitter/types";
import { Statistic } from "./types/types";

export function createMostGamesLostByTeam(): Statistic {
  return {
    title: "Die Zerfickten",
    description: "Team das am meisten zerfickt wurde",
    getGame: getMostGamesLostByTeam,
  };
}

function getMostGamesLostByTeam(
  _allTweets: ReadonlyArray<NormalisedTweetResult>,
  allFixturesWithEvents: ReadonlyArray<FixtureAndEventsResponseModel>
): {
  tweetText: string;
  additionalInformation: unknown;
} {
  const leaguesByOccurrence = allFixturesWithEvents.flatMap((value) => value.fixtures).reduce((acc, { fixture }) => {
    const homeScore = fixture.score.fulltime.home;
    const awayScore = fixture.score.fulltime.away;

    const homeTeam = fixture.teams.home.name;
    const awayTeam = fixture.teams.away.name;

    const looser = homeScore < awayScore ? homeTeam : awayTeam;
    const isLoserAlredyDefined = typeof acc[looser] === "number";

    if (isLoserAlredyDefined) {
      return {
        ...acc,
        [looser]: acc[looser] + 1,
      };
    } else {
      return {
        ...acc,
        [looser]: 1,
      };
    }
  }, {} as { [league: string]: number });

  const filtered = Object.entries(leaguesByOccurrence)
    .filter(([_league, occurrence]) => occurrence > 8)
    .sort((a, b) => b[1] - a[1]);

  return { tweetText: filtered[0][0], additionalInformation: filtered };
}
