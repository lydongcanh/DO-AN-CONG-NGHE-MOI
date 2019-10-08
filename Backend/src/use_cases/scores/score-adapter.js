import CreateScore from "./create-score";
import FindScoreByScoreBoardID from "./find-score-by-scoreboardid";

export default class ScoreAdapter{
    constructor(tablename,region,endpoint){
        this.createScoreObj = new CreateScore(tablename,region,endpoint);
        this.findScoreByScoreBoardIDObj = new FindScoreByScoreBoardID(tablename,region,endpoint);
    }
    /**
     * 
     * @param {Score} score 
     */
    async createScore(score){
        return await this.createScoreObj.execute(score);
    }
    /**
     * 
     * @param {String} scoreboardid 
     */
    async findScoreByScoreBoardID(scoreboardid){
        return await this.findScoreByScoreBoardIDObj.execute(scoreboardid);
    }
}