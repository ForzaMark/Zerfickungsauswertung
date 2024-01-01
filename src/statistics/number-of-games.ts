import { FixtureAndEventsResponseModel } from "../api-football/query-api-football";
 
import { Statistic } from "./types/types";

export function createGetNumberOfGames(): Statistic {
  return {
    title: "Allgemein",
    description: "Anzahl Zerfickungen",
    getGame: getNumberOfGames,
  };
}

function getNumberOfGames(
   
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
