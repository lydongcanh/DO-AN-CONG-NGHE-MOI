import CreateScoreBoard from "./create-scoreboard";
import GetAllScoreboards from "./get-all-scoreboards";
import GetScoreboardById from "./get-scoreboard-by-id";
import DeleteScoreboard from "./delete-scoreboard";

export default class ScoreboardAdapter {
    constructor(tablename,region,endpoint) {
        this._createScoreBoardObj = new CreateScoreBoard(tablename, region, endpoint);
        this._getAllScoreboardsObj = new GetAllScoreboards(tablename, region, endpoint);
        this._getScoreboardByIdObj = new GetScoreboardById(tablename, region, endpoint);
        this._deleteScoreboardObj = new DeleteScoreboard(tablename, region, endpoint);
    }

    /**
     * Create new scoreboard.
     * @param {ScoreBoard} scoreboard 
     */
    async createScoreBoard(scoreboard){
        return await this._createScoreBoardObj.execute(scoreboard);
    }
    
    async getAllScoreboards() {
        return await this._getAllScoreboardsObj.execute();
    }

    async getScoreboardById(id) {
        return await this._getScoreboardByIdObj.execute(id);
    }

    async deleteScoreboard(id) {
        return await this._deleteScoreboardObj.execute(id);
    }
}