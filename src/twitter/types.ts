export type AllTweetsOutputModel = {
    data: ReadonlyArray<Tweet>;
    meta: {
      result_count: number;
      newest_id: string;
      oldest_id: string;
      next_token?: string;
    };
  };
  
  export interface Tweet {
    public_metrics: {
      retweet_count: number;
      reply_count: number;
      like_count: number;
      quote_count: number;
    };
    id: string;
    text: string;
    created_at: string;
  }
  
  export type NormalisedTweetResult = {
    game: {
      homeScore: number;
      awayScore: number;
    };
    tweet: Tweet;
  };
  