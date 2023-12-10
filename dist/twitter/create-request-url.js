"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createQueryUrl = void 0;
var fields = "tweet.fields=created_at,public_metrics";
var startTime = 'start_time=2022-01-04T00:00:00Z';
var maxResults = 'max_results=100';
var zerfickungsbotTwitterId = "1331243333465862145";
var baseUrl = "https://api.twitter.com/2/users/".concat(zerfickungsbotTwitterId, "/tweets");
var queryUrl = "".concat(baseUrl, "?").concat(startTime, "&").concat(maxResults, "&").concat(fields);
var createQueryUrl = function (nextPageToken) {
    return nextPageToken ? "".concat(queryUrl, "&pagination_token=").concat(nextPageToken) : queryUrl;
};
exports.createQueryUrl = createQueryUrl;
