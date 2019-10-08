import CreateScore from "./create-score";
import FindScoreByScoreBoardID from "./find-score-by-scoreboardid";

export default class ScoreAdapter {
    constructor(tablename, region, endpoint) {
        this.createScoreObj = new CreateScore(tablename, region, endpoint);
        this.findScoreByScoreBoardIDObj = new FindScoreByScoreBoardID(tablename, region, endpoint);
    }

    /**
     * Create new score.
     * @param {Score} score 
     */
    async createScore(score) {
        return await this.createScoreObj.execute(score);
    }

    /**
     * Find all scores by provided scoreboard id.
     * @param {String} scoreboardId 
     */
    async findScoresByScoreboardID(scoreboardId) {
        return await this.findScoreByScoreBoardIDObj.execute(scoreboardId);
    }
}