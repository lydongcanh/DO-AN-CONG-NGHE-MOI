import AWSPut from "../../repositories/aws/aws-put";

export default class CreateScoreBoard extends AWSPut {
    
    async execute(scoreboard) {
        this.scoreboard = scoreboard;
        return await super.execute();
    }

    get item() {
        return {
            "partitionKey": "SCOREBOARD",
            "sortKey": this.scoreboard.id,
            "data": this.scoreboard.semester,
            "year": this.scoreboard.year,
            "studentId": this.scoreboard.studentId
        };
    }
}