import { FixtureAndEventsResponseModel } from "../api-football/query-api-football";

export function getMonthWithMostGames(
  allFixturesWithEvents: ReadonlyArray<FixtureAndEventsResponseModel>
): {
  monthName: string;
  gamesPerMonth: number;
} {
  const months = allFixturesWithEvents
    .flatMap((value) => value.fixtures)
    .map(({ fixture }) => new Date(fixture.fixture.date).getMonth());

  const numberOfDates = months.reduce(
    (acc, curr) => {
      const isMonthAlreadyDefined = typeof acc[curr] === "number";

      if (isMonthAlreadyDefined) {
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

    {} as { [month: number]: number }
  );

  const sorted = Object.entries(numberOfDates)
    .map(([key, value]) => ({ monthZeroBased: key, gamesPerMonth: value }))
    .sort((a, b) => b.gamesPerMonth - a.gamesPerMonth);

  return {
    monthName: new Date(2000, Number(sorted[0].monthZeroBased), 1).toLocaleString(
      "default",
      {
        month: "long",
      }
    ),
    gamesPerMonth: sorted[0].gamesPerMonth
  };
}
