import { GoalEvent } from '../types/types';

export function calculateMinuteOfDecidingGoal(
  winningTeamId: number,
  events: ReadonlyArray<Pick<GoalEvent, 'time' | 'team'>>
): { minuteOfDecidingGoal: number; minuteOfFirstGoal: number } | undefined {
  const result = events.reduce(
    ({ currentDifference, minuteOfDecidingGoal, minuteOfFirstGoal }, curr) => {
      const isWinningTeamGoal = curr.team.id === winningTeamId;

      const updatedCurrentDifference = isWinningTeamGoal
        ? currentDifference + 1
        : currentDifference - 1;

      return {
        currentDifference: updatedCurrentDifference,
        minuteOfDecidingGoal:
          updatedCurrentDifference === 6 ? curr.time.elapsed : minuteOfDecidingGoal,
        minuteOfFirstGoal: minuteOfFirstGoal || curr.time.elapsed
      };
    },
    {
      minuteOfDecidingGoal: undefined,
      minuteOfFirstGoal: undefined,
      currentDifference: 0
    } as {
      currentDifference: number;
      minuteOfDecidingGoal: number | undefined;
      minuteOfFirstGoal: number | undefined;
    }
  );

  return result.minuteOfDecidingGoal && result.minuteOfFirstGoal
    ? {
        minuteOfDecidingGoal: result.minuteOfDecidingGoal,
        minuteOfFirstGoal: result.minuteOfFirstGoal
      }
    : undefined;
}
