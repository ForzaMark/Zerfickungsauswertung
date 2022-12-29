import { createQueryUrl } from './create-request-url';
import { extractGameInformationFromTweet } from '../support/extract-game-information-from-tweet';
import axios from 'axios';
import { AllTweetsOutputModel, NormalisedTweetResult, Tweet } from './types';

type Pagination =
  | {
      isInitial: true;
      isLastPage: false;
    }
  | {
      isInitial: false;
      isLastPage: false;
      next_token: string;
    }
  | {
      isLastPage: true;
    };

export class QueryTweetsHelper {
  private pagination: Pagination = {
    isInitial: true,
    isLastPage: false
  };

  async queryAllTweets(apiToken: string): Promise<ReadonlyArray<NormalisedTweetResult>> {
    let allTweets: Array<Tweet> = [];

    while (!this.pagination.isLastPage) {
      const requestUrl = !this.pagination.isInitial
        ? createQueryUrl(this.pagination.next_token)
        : createQueryUrl(undefined);

      const config = {
        headers: { Authorization: `Bearer ${apiToken}` }
      };

      const result = await axios.get<AllTweetsOutputModel>(requestUrl, config);

      const { meta, data }: AllTweetsOutputModel = result.data;

      allTweets = allTweets.concat(data);

      if (!meta.next_token) {
        this.pagination = {
          isLastPage: true
        };
      } else {
        this.pagination = {
          isInitial: false,
          isLastPage: false,
          next_token: meta.next_token
        };
      }
    }

    return retrieveTweetsInformation(allTweets);
  }
}

function retrieveTweetsInformation(
  tweets: ReadonlyArray<Tweet>
): ReadonlyArray<NormalisedTweetResult> {
  return tweets.map((tweet) => {
    const game = extractGameInformationFromTweet(tweet.text);

    return { game, tweet };
  });
}
