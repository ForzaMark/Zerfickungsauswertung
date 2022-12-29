import { FixtureAndEventsResponseModel } from "../../api-football/query-api-football";
import { isGoalEvent } from "./is-goal-event";

export function isWinFromBehind(
    event: FixtureAndEventsResponseModel['fixtures'][number]
  ): boolean {
    const winningSideTeamId =
      event.fixture.score.fulltime.home > event.fixture.score.fulltime.away
        ? event.fixture.teams.home.id
        : event.fixture.teams.away.id;
  
    const subResults = event.events.filter(isGoalEvent).reduce(
      (acc, curr) => {
        if (!acc.isWinFromBehind) {
          const isWinningTeamGoal = curr.team.id === winningSideTeamId;
  
          const currentDifference = isWinningTeamGoal
            ? acc.currentDifference + 1
            : acc.currentDifference - 1;
  
          return { currentDifference, isWinFromBehind: currentDifference < 0 };
        } else {
          return { currentDifference: 0, isWinFromBehind: true };
        }
      },
      { currentDifference: 0, isWinFromBehind: false }
    );
  
    return subResults.isWinFromBehind;
  }
  