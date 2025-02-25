import { FixtureAndEventsResponseModel } from "../api-football/query-api-football";
import { getMonthWithMostGames } from "../statistics/month-with-most-games";
import { getMostGamesPerDay } from "../statistics/most-games-per-day";
import { getNumberOfGames } from "../statistics/number-of-games";
import { SUMMARY_FORMAT } from "./format";

export function generateFormattedSummary(year: number, allFixturesWithEvents: ReadonlyArray<FixtureAndEventsResponseModel>) {

    
  const results = [
    SUMMARY_FORMAT.general1.generateText(
      year,
      getNumberOfGames(allFixturesWithEvents),
      getMonthWithMostGames(allFixturesWithEvents),
      getMostGamesPerDay(allFixturesWithEvents)
    ),
    SUMMARY_FORMAT.general2.generateText(

    )
  ];
}
