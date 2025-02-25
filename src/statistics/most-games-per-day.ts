import { FixtureAndEventsResponseModel } from "../api-football/query-api-football";

export function getMostGamesPerDay(
  fixturesWithEvents: ReadonlyArray<FixtureAndEventsResponseModel>
): {
  day: string;
  gamesPerDay: number;
} {
  const results = fixturesWithEvents.map(({ date, fixtures }) => ({
    date,
    fixtures: fixtures.length,
  }));

  const filtered = results.sort((a, b) => b.fixtures - a.fixtures);

  return {
    day: filtered[0].date,
    gamesPerDay: filtered[0].fixtures,
  };
}
