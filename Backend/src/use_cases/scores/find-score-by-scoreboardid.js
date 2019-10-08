import AWSQuery from "../../repositories/aws/aws-query";

export default class FindScoreByScoreBoard extends AWSQuery{
    get keyConditionExpression() {
        return "#pk = :pk and #sbid = :sbid";
    }

    get expressionAttributeNames() {
        return { 
            "#pk": "partitionKey",
            "#sbid": "scoreboardId" 
        };
    }

    get expressionAttributeValues() {
        return { 
            ":pk" : "SCORE",
            ":sbid" : this.scoreboardId
        };
    }

    async execute(scoreboardId) {
        this.scoreboardId = scoreboardId;
        return await super.execute();
    }
}