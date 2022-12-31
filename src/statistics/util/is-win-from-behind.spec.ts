import { GoalEvent } from '../types/types';
import { isWinFromBehind } from './is-win-from-behind';

interface TestCase {
  description: string;
  input: {
    goalEvents: ReadonlyArray<'winningTeamGoal' | 'looserTeamGoal'>;
  };
  expected: boolean;
}

const testCases: ReadonlyArray<TestCase> = [
  {
    description: 'not win from behind when no looser team goals',
    input: {
      goalEvents: [
        'winningTeamGoal',
        'winningTeamGoal',
        'winningTeamGoal',
        'winningTeamGoal',
        'winningTeamGoal',
        'winningTeamGoal',
        'winningTeamGoal'
      ]
    },
    expected: false
  },
  {
    description: 'not win from behind when looser never lead',
    input: {
      goalEvents: [
        'winningTeamGoal',
        'winningTeamGoal',
        'winningTeamGoal',
        'looserTeamGoal',
        'looserTeamGoal',
        'winningTeamGoal',
        'winningTeamGoal'
      ]
    },
    expected: false
  },
  {
    description: 'win from behind',
    input: {
      goalEvents: [
        'looserTeamGoal',
        'winningTeamGoal',
        'winningTeamGoal',
        'winningTeamGoal',
        'winningTeamGoal'
      ]
    },
    expected: true
  }
];

for (const { input, expected, description } of testCases) {
  test(description, () => {
    const winningSideId = 1;

    const goalEvents = transformToGoalEvents(input.goalEvents, winningSideId);

    const result = isWinFromBehind(goalEvents, winningSideId);

    expect(result).toEqual(expected);
  });
}

function transformToGoalEvents(
  goalEvents: ReadonlyArray<'winningTeamGoal' | 'looserTeamGoal'>,
  winningSideId: number
): ReadonlyArray<Pick<GoalEvent, 'team'>> {
  return goalEvents.map((event) =>
    event === 'winningTeamGoal'
      ? {
          team: {
            id: winningSideId,
            name: 'winnner'
          }
        }
      : {
          team: {
            id: 2,
            name: 'looser'
          }
        }
  );
}
