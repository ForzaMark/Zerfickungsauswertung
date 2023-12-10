"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllStatistics = void 0;
var competition_classification_1 = require("./competition-classification");
var fastest_minute_of_deciding_goal_1 = require("./fastest-minute-of-deciding-goal");
var highest_away_1 = require("./highest-away");
var highest_game_1 = require("./highest-game");
var month_with_most_games_1 = require("./month-with-most-games");
var most_games_league_1 = require("./most-games-league");
var most_games_lost_by_team_1 = require("./most-games-lost-by-team");
var most_games_per_day_1 = require("./most-games-per-day");
var most_games_won_by_team_1 = require("./most-games-won-by-team");
var most_loser_goals_1 = require("./most-loser-goals");
var most_ocurring_result_1 = require("./most-ocurring-result");
var most_own_goals_1 = require("./most-own-goals");
var most_popular_1 = require("./most-popular");
var number_of_games_1 = require("./number-of-games");
var player_with_most_goals_in_all_games_1 = require("./player-with-most-goals-in-all-games");
var player_with_most_goals_in_single_game_1 = require("./player-with-most-goals-in-single-game");
var wins_from_behind_1 = require("./wins-from-behind");
var zero_goals_against_games_1 = require("./zero-goals-against-games");
var latest_minute_of_first_goal_1 = require("./latest-minute-of-first-goal");
var lowest_time_difference_between_goals_1 = require("./lowest-time-difference-between-goals");
var minute_of_deciding_goal_1 = require("./minute-of-deciding-goal");
var most_games_country_1 = require("./most-games-country");
function getAllStatistics() {
    return [
        (0, highest_game_1.createGetHighestGame)(),
        (0, most_popular_1.createGetMostPopular)(),
        (0, highest_away_1.createGetHighestAway)(),
        (0, most_loser_goals_1.createGetMostLoserGoals)(),
        (0, most_games_league_1.createGetMostGamesLeague)(),
        (0, most_games_lost_by_team_1.createMostGamesLostByTeam)(),
        (0, most_games_won_by_team_1.createMostGamesWonByTeam)(),
        (0, number_of_games_1.createGetNumberOfGames)(),
        (0, month_with_most_games_1.createGetMonthWithMostGames)(),
        (0, most_ocurring_result_1.createGetMostOccurringResults)(),
        (0, most_games_per_day_1.createMostGamesPerDay)(),
        (0, most_games_country_1.createGetMostGamesCountry)(),
        (0, player_with_most_goals_in_all_games_1.createGetPlayerWithMostGoalsInAllGames)(),
        (0, player_with_most_goals_in_single_game_1.createGetPlayerWithMostGoalsInSingleGame)(),
        (0, most_own_goals_1.createGetMostOwnGoals)(),
        (0, competition_classification_1.createCompetitionClassification)(),
        (0, zero_goals_against_games_1.createZeroGoalsAgainst)(),
        (0, wins_from_behind_1.createWinsFromBehind)(),
        (0, minute_of_deciding_goal_1.createMinuteOfDecidingGoal)(),
        (0, fastest_minute_of_deciding_goal_1.createFastestDecidingGoal)(),
        (0, latest_minute_of_first_goal_1.createLatestMinuteOfFirstGoal)(),
        (0, lowest_time_difference_between_goals_1.createLowestTimeDifferenceBetweenGoals)()
    ];
}
exports.getAllStatistics = getAllStatistics;
