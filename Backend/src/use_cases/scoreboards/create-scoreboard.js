import AWSPut from "../../repositories/aws/aws-put";

export default class CreateScoreBoard extends AWSPut {
    
    async execute(scoreboard) {
        this.scoreboard = scoreboard;
        return await super.execute();
    }

    get item() {
        return {
            "partitionKey": "SCOREBOARD",
            "sortKey": this.score.id,
            "data": this.score.semester,
            "year": this.score.year,
            "studentid": this.score.studentid
        };
    }
}