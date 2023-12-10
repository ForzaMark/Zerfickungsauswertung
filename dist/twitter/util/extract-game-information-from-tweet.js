"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractGameInformationFromTweet = void 0;
function extractGameInformationFromTweet(tweetText) {
    var gameResultString = tweetText.split('⚽')[1];
    var _a = gameResultString.split(':'), homeText = _a[0], awayText = _a[1];
    var homeTextSplitted = homeText.split(' ');
    var awayTextSplitted = awayText.split(' ');
    var homeTeamString = homeTextSplitted.slice(0, -1).join(' ');
    var homeScoreString = homeTextSplitted[homeTextSplitted.length - 1];
    var awayTeamString = awayTextSplitted.slice(1).join(' ');
    var awayScoreString = awayTextSplitted[0];
    if (typeof homeTeamString !== 'string' ||
        typeof homeScoreString !== 'string' ||
        typeof awayTeamString !== 'string' ||
        typeof awayScoreString !== 'string') {
        throw new Error("some regex could not be evaluated: ".concat(tweetText));
    }
    var homeScore = Number(homeScoreString);
    var awayScore = Number(awayScoreString);
    return { homeScore: homeScore, awayScore: awayScore, homeTeam: homeTeamString, awayTeam: awayTeamString };
}
exports.extractGameInformationFromTweet = extractGameInformationFromTweet;
