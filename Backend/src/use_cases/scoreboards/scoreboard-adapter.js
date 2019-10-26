import CreateScoreBoard from "./create-scoreboard";
import FindScoreBoardByStudentID from "./find-scoreboard-by-studentid";
import GetAllScoreboards from "./get-all-scoreboards";
import GetScoreboardById from "./get-scoreboard-by-id";

export default class ScoreboardAdapter {
    constructor(tablename,region,endpoint) {
        this._createScoreBoardObj = new CreateScoreBoard(tablename, region, endpoint);
        this._findScoreBoardByStudentIDObj = new FindScoreBoardByStudentID(tablename, region, endpoint);
        this._getAllScoreboardsObj = new GetAllScoreboards(tablename, region, endpoint);
        this._getScoreboardByIdObj = new GetScoreboardById(tablename, region, endpoint);
    }

    /**
     * Create new scoreboard.
     * @param {ScoreBoard} scoreboard 
     */
    async createScoreBoard(scoreboard){
        return await this._createScoreBoardObj.execute(scoreboard);
    }

    /**
     * Find scoreboard with provided student id.
     * @param {String} studentId 
     */
    async findScoreboardByStudentId(studentId){
        return await this._findScoreBoardByStudentIDObj.execute(studentId);
    }

    async getAllScoreboards() {
        return await this._getAllScoreboardsObj.execute();
    }

    async getScoreboardById(id) {
        return await this._getScoreboardByIdObj.execute(id);
    }
}