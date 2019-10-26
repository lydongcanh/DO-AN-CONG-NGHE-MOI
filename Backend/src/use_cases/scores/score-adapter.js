import CreateScore from "./create-score";
import GetAllScores from "./get-all-scores";
import GetScoreById from "./get-score-by-id";

export default class ScoreAdapter {
    constructor(tablename, region, endpoint) {
        this._createScoreObj = new CreateScore(tablename, region, endpoint);
        this._getAllScoresObj = new GetAllScores(tablename, region, endpoint);
        this._getScoreByIdObj = new GetScoreById(tablename, region, endpoint);
    }

    /**
     * Create new score.
     * @param {Score} score 
     */
    async createScore(score) {
        return await this._createScoreObj.execute(score);
    }

    async getAllScores() {
        return await this._getAllScoresObj.execute();
    }

    async getScoreById(id) {
        return await this._getScoreByIdObj.execute(id);
    }
}