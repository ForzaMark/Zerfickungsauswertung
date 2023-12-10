"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var extract_game_information_from_tweet_1 = require("./extract-game-information-from-tweet");
var tweetStart = '📢 Zerfickungsalarm 📢\n⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯\n🇬🇧 Scotland (FA Cup)\n\n⚽ ';
var testCases = [
    {
        inputString: 'Sporting CP 6:0 Farense',
        expected: {
            homeScore: 6,
            awayScore: 0
        }
    },
    {
        inputString: 'Sporting CP 0:6 Farense',
        expected: {
            homeScore: 0,
            awayScore: 6
        }
    },
    {
        inputString: 'Sporting CP 12:6 Farense',
        expected: {
            homeScore: 12,
            awayScore: 6
        }
    },
    {
        inputString: 'Sporting CP 0:12 Farense',
        expected: {
            homeScore: 0,
            awayScore: 12
        }
    },
    {
        inputString: 'Sporting CP U 21 6:0 Farense',
        expected: {
            homeScore: 6,
            awayScore: 0
        }
    },
    {
        inputString: 'Sporting CP 0:6 Farense U 21',
        expected: {
            homeScore: 0,
            awayScore: 6
        }
    },
    {
        inputString: "IA Akranes 0:6 Stjarnan",
        customTweetStart: "\uD83D\uDCE2 Zerfickungsalarm \uD83D\uDCE2\n \u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\u23AF\n \uD83C\uDDEE\uD83C\uDDF8 Iceland (https://t.co/35B2DnzwYj Cup A)\n\n \u26BD IA Akranes 0:6 Stjarnan",
        expected: {
            homeScore: 0,
            awayScore: 6
        }
    }
];
test('tests extraction', function () {
    for (var _i = 0, testCases_1 = testCases; _i < testCases_1.length; _i++) {
        var _a = testCases_1[_i], inputString = _a.inputString, customTweetStart = _a.customTweetStart, expected = _a.expected;
        var input = "".concat(customTweetStart || tweetStart, " ").concat(inputString);
        var result = (0, extract_game_information_from_tweet_1.extractGameInformationFromTweet)(input);
        if (typeof result !== 'string') {
            expect(result.homeScore).toEqual(expected.homeScore);
            expect(result.awayScore).toEqual(expected.awayScore);
        }
        else {
            expect(true).toEqual(false);
        }
    }
});
