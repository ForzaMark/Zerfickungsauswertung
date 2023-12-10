"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = void 0;
var get_all_statistics_1 = require("./statistics/get-all-statistics");
var clone_api_football_data_to_file_1 = require("./api-football/clone-api-football-data-to-file");
var get_all_tweet_dates_1 = require("./twitter/get-all-tweet-dates");
var clone_twitter_data_to_file_1 = require("./twitter/clone-twitter-data-to-file");
var read_twitter_data_1 = require("./twitter/read-twitter-data");
var read_api_football_data_1 = require("./api-football/read-api-football-data");
var chalk_1 = __importDefault(require("chalk"));
var get_all_dates_of_year_1 = require("./util/get-all-dates-of-year");
var API_FOOTBALL_API_KEY = process.env.API_FOOTBALL_KEY;
var TWITTER_API_KEY = process.env.TWITTER_API_KEY;
var CURRENT_YEAR = 2022;
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var statistics, tweets, apiFootballData, _i, statistics_1, _a, title, description, getGame, _b, tweetText, additionalInformation;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (!(API_FOOTBALL_API_KEY && TWITTER_API_KEY)) return [3, 2];
                    return [4, cloneDataToFile(TWITTER_API_KEY, API_FOOTBALL_API_KEY)];
                case 1:
                    _c.sent();
                    statistics = (0, get_all_statistics_1.getAllStatistics)();
                    tweets = (0, read_twitter_data_1.readTwitterData)();
                    apiFootballData = (0, read_api_football_data_1.readApiFootballData)();
                    for (_i = 0, statistics_1 = statistics; _i < statistics_1.length; _i++) {
                        _a = statistics_1[_i], title = _a.title, description = _a.description, getGame = _a.getGame;
                        _b = getGame(tweets, apiFootballData), tweetText = _b.tweetText, additionalInformation = _b.additionalInformation;
                        printResult({ title: title, description: description, tweetText: tweetText, additionalInformation: additionalInformation });
                    }
                    return [3, 3];
                case 2:
                    console.error('Unable to start application because api keys are not provided');
                    _c.label = 3;
                case 3: return [2];
            }
        });
    });
}
exports.main = main;
main();
function cloneDataToFile(twitterApiKey, apiFootballApiKey) {
    return __awaiter(this, void 0, void 0, function () {
        var executionMode, _a, allTweets;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    executionMode = process.argv[2];
                    _a = executionMode;
                    switch (_a) {
                        case 'fetchTwitter': return [3, 1];
                        case 'fetchApiFootball': return [3, 3];
                        case 'fetchAll': return [3, 5];
                    }
                    return [3, 8];
                case 1: return [4, (0, clone_twitter_data_to_file_1.cloneTwitterDataToFile)(twitterApiKey)];
                case 2:
                    _b.sent();
                    return [3, 9];
                case 3: return [4, (0, clone_api_football_data_to_file_1.cloneApiFootballDataToFile)((0, get_all_dates_of_year_1.getAllDatesOfYear)(CURRENT_YEAR), apiFootballApiKey)];
                case 4:
                    _b.sent();
                    return [3, 9];
                case 5: return [4, (0, clone_twitter_data_to_file_1.cloneTwitterDataToFile)(twitterApiKey)];
                case 6:
                    allTweets = _b.sent();
                    return [4, (0, clone_api_football_data_to_file_1.cloneApiFootballDataToFile)((0, get_all_tweet_dates_1.getAllTweetDates)(allTweets), apiFootballApiKey)];
                case 7:
                    _b.sent();
                    return [3, 9];
                case 8: return [3, 9];
                case 9: return [2];
            }
        });
    });
}
function printResult(_a) {
    var title = _a.title, description = _a.description, tweetText = _a.tweetText, additionalInformation = _a.additionalInformation;
    console.log('-'.repeat(process.stdout.columns));
    console.log(chalk_1.default.yellowBright("Title: ".concat(title)));
    console.log("\n      Description: ".concat(description, "\n      Text: ").concat(tweetText, "\n      ").concat(additionalInformation
        ? "Additional info: ".concat(JSON.stringify(additionalInformation, null, 4))
        : "", "\n  "));
}
