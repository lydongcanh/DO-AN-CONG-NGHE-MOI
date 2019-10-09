import CreateScore from "./create-score";
import FindScoreByScoreBoardID from "./find-score-by-scoreboardid";

export default class ScoreAdapter {
    constructor(tablename, region, endpoint) {
        this._createScoreObj = new CreateScore(tablename, region, endpoint);
        this._findScoreByScoreBoardIDObj = new FindScoreByScoreBoardID(tablename, region, endpoint);
    }

    /**
     * Create new score.
     * @param {Score} score 
     */
    async createScore(score) {
        return await this._createScoreObj.execute(score);
    }

    /**
     * Find all scores by provided scoreboard id.
     * @param {String} scoreboardId 
     */
    async findScoresByScoreboardID(scoreboardId) {
        return await this._findScoreByScoreBoardIDObj.execute(scoreboardId);
    }
}