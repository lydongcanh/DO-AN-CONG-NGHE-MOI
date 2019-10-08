import CreateScoreBoard from "./create-scoreboard";
import FindScoreBoardByStudentID from "./find-scoreboard-by-studentid";

export default class ScoreBoardAdapter{
    constructor(tablename,region,endpoint){
        this.createScoreBoardObj = new CreateScore(tablename,region,endpoint);
        this.findScoreBoardByStudentIDObj = new FindScoreBoardByStudentID(tablename,region,endpoint);
    }
    /**
     * 
     * @param {ScoreBoard} score 
     */
    async createScore(scoreboard){
        return await this.createScoreBoardObj.execute(scoreboard);
    }
    /**
     * 
     * @param {String} studentid 
     */
    async findScoreByScoreBoardID(studentid){
        return await this.findScoreBoardByStudentIDObj.execute(studentid);
    }
}