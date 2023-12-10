"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createGetNumberOfGames = void 0;
function createGetNumberOfGames() {
    return {
        title: 'Allgemein',
        description: 'Anzahl Zerfickungen',
        getGame: getNumberOfGames
    };
}
exports.createGetNumberOfGames = createGetNumberOfGames;
function getNumberOfGames(allTweets) {
    return {
        tweetText: "".concat(allTweets.length)
    };
}
