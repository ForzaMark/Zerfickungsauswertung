const fields = `tweet.fields=created_at,public_metrics`;
const startTime = (year: number) => `start_time=${year}-01-01T00:00:00Z`;
const maxResults = 'max_results=100';
const zerfickungsbotTwitterId = `1331243333465862145`;

const baseUrl = `https://api.twitter.com/2/users/${zerfickungsbotTwitterId}/tweets`;
const queryUrl = (year: number) => `${baseUrl}?${startTime(year)}&${maxResults}&${fields}`;

export const createQueryUrl = (nextPageToken: string | undefined, year: number) =>
  nextPageToken ? `${queryUrl(year)}&pagination_token=${nextPageToken}` : queryUrl(year);
