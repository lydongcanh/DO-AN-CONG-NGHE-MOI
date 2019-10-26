import AWSPut from "../../repositories/aws/aws-put";

export default class CreateScore extends AWSPut {

    get item() {
        return {
            "partitionKey": "SCORE",
            "sortKey": this.score.id,
            "data": this.score.type,
            "value": this.score.value,
            "subject": this.score.subject,
            "multiplier": this.score.multiplier,
            "scoreboardId": this.score.scoreboardId
        };
    }
        
    async execute(score) {
        this.score = score;
        return await super.execute();
    }
}