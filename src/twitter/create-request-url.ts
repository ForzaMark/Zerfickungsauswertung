const fields = `tweet.fields=created_at,public_metrics`;
const startTime = 'start_time=2022-01-04T00:00:00Z';
const maxResults = 'max_results=100';
const zerfickungsbotTwitterId = `1331243333465862145`;

const baseUrl = `https://api.twitter.com/2/users/${zerfickungsbotTwitterId}/tweets`;
const queryUrl = `${baseUrl}?${startTime}&${maxResults}&${fields}`;

export const createQueryUrl = (nextPageToken: string | undefined) =>
  nextPageToken ? `${queryUrl}&pagination_token=${nextPageToken}` : queryUrl;
