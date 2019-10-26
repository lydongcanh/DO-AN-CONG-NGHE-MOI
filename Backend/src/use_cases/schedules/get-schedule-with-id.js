import AWSQuery from "../../repositories/aws/aws-query";

export default class GetScheduleWithId extends AWSQuery {
    get keyConditionExpression() {
        return "#pk = :pk and #sk = :sk";
    }

    get expressionAttributeNames() {
        return { 
            "#pk" : "partitionKey",
            "#sk" : "sortKey"
        };
    }

    get expressionAttributeValues() {
        return { 
            ":pk" : "SCHEDULE",
            ":sk" : this.scheduleId
        };
    }

    async execute(scheduleId) {
        this.scheduleId = scheduleId;
        return await super.execute();
    }
}