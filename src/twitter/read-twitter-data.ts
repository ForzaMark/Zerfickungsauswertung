import { NormalisedTweetResult } from '../statistics/types';
import allTweets from './all-tweets.json';

export function readTwitterData(): ReadonlyArray<NormalisedTweetResult> {
    return allTweets;
}