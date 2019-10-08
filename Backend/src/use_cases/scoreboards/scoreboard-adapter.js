import CreateScoreBoard from "./create-scoreboard";
import FindScoreBoardByStudentID from "./find-scoreboard-by-studentid";

export default class ScoreboardAdapter{
    constructor(tablename,region,endpoint){
        this.createScoreBoardObj = new CreateScoreBoard(tablename,region,endpoint);
        this.findScoreBoardByStudentIDObj = new FindScoreBoardByStudentID(tablename,region,endpoint);
    }
    /**
     * Create new scoreboard.
     * @param {ScoreBoard} scoreboard 
     */
    async createScoreBoard(scoreboard){
        return await this.createScoreBoardObj.execute(scoreboard);
    }
    /**
     * Find scoreboard with provided student id.
     * @param {String} studentId 
     */
    async findScoreboardByStudentId(studentId){
        return await this.findScoreBoardByStudentIDObj.execute(studentId);
    }
}