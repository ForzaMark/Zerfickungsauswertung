"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLeagueFromText = void 0;
function getLeagueFromText(tweetText) {
    var splitOnLineBreak = tweetText.split('\n');
    var result = splitOnLineBreak[2];
    if (result) {
        return result.toString();
    }
    throw new Error("Unable to extract Regex from tweet ".concat(tweetText));
}
exports.getLeagueFromText = getLeagueFromText;
