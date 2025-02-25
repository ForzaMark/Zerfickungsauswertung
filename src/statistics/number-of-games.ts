import { FixtureAndEventsResponseModel } from "../api-football/query-api-football";
 
export function getNumberOfGames(
  allFixturesWithEvents: ReadonlyArray<FixtureAndEventsResponseModel>
): number {
  return allFixturesWithEvents.flatMap((value) => value.fixtures).length
    
  
}
