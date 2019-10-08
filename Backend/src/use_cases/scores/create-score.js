import AWSPut from "../../repositories/aws/aws-put";

export default class CreateScore extends AWSPut {
    
    async execute(score) {
        this.score = score;
        return await super.execute();
    }

    get item() {
        return {
            "partitionKey": "SCORE",
            "sortKey": this.score.id,
            "data": this.score.type,
            "value": this.score.value,
            "subjectid": this.score.subjectid,
            "scoreboardid": this.score.scoreboardid
        };
    }
}