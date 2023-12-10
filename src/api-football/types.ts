export interface FixturesResponseModel {
  response: ReadonlyArray<{
    fixture: {
      id: number;
    };
    league: {
      id: number;
      country: string;
    }
    teams: {
      home: {
        id: number;
        name: string;
      };
      away: {
        id: number;
        name: string;
      };
    };
    score: {
      fulltime: {
        home: number;
        away: number;
      };
    };
  }>;
}

export type FixtureEvent =
  | {
      time: {
        elapsed: number
      }
      player: {
        id: number
        name: string | null;
      };
      team: {
        id: number;
        name: string;
      };
      type: 'Goal';
      detail: 'Normal Goal' | 'Own Goal';
    }
  | {
      type: 'Card';
      detail: 'Yellow Card';
    }

export interface FixtureEventResponseModel {
  response: ReadonlyArray<FixtureEvent>;
}
