import { GoalEvent } from '../types/types';

export function isWinFromBehind(
  goalEvents: ReadonlyArray<Pick<GoalEvent, 'team'>>,
  winningSideTeamId: number
): boolean {
  const subResults = goalEvents.reduce(
    (acc, { team }) => {
      if (!acc.isWinFromBehind) {
        const isWinningTeamGoal = team.id === winningSideTeamId;

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
