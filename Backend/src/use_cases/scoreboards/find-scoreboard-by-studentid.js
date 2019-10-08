import AWSQuery from "../../repositories/aws/aws-query";

export default class FindScoreBoardByStudentID extends AWSQuery{
    get keyConditionExpression() {
        return "#pk = :pk and #un = :un";
    }

    get expressionAttributeNames() {
        return { 
            "#pk": "partitionKey",
            "#un": "studentid" 
        };
    }

    get expressionAttributeValues() {
        return { 
            ":pk" : "SCOREBOARD",
            ":un" : this.studentid
        };
    }
}