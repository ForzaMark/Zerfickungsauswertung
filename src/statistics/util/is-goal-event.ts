import { FixtureEvent } from '../../api-football/types';
import { GoalEvent } from '../types/types';

export function isGoalEvent(event: FixtureEvent): event is GoalEvent {
  return event.type === 'Goal';
}
