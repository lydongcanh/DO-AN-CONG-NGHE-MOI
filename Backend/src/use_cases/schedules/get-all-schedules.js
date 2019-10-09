import AWSQuery from "../../repositories/aws/aws-query";

export default class GetAllSchedules extends AWSQuery {
    get keyConditionExpression() {
        return "#pk = :pk";
    }

    get expressionAttributeNames() {
        return { "#pk" : "partitionKey" };
    }

    get expressionAttributeValues() {
        return { ":pk" : "SCHEDULE" };
    }
}