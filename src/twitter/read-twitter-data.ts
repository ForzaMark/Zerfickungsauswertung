import { readFileSync } from 'fs';
import { join } from 'path';
import { NormalisedTweetResult } from './types';

export function readTwitterData(): ReadonlyArray<NormalisedTweetResult> {
    return readAllTweets();
}

function readAllTweets() {
    const path = join(__dirname, '../../data-files/all-tweets.json');
  
    return JSON.parse(readFileSync(path, 'utf-8'));
  }
  