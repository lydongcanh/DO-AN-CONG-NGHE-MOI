import AWSQuery from "../../repositories/aws/aws-query";

export default class FindScoreByScoreBoard extends AWSQuery{
    get keyConditionExpression() {
        return "#pk = :pk and #un = :un";
    }

    get expressionAttributeNames() {
        return { 
            "#pk": "partitionKey",
            "#un": "scoreboardid" 
        };
    }

    get expressionAttributeValues() {
        return { 
            ":pk" : "SCORE",
            ":un" : this.scoreboardid
        };
    }
}