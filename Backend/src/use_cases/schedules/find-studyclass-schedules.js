import AWSQuery from "../../repositories/aws/aws-query";

/** TODO: Edit later... */
export default class FindStudyclassSchedules extends AWSQuery {
    get keyConditionExpression() {
        return "#pk = :pk and #cid = :cid";
    }

    get expressionAttributeNames() {
        return {
            "#pk" : "partitionKey",
            "#cid" : "classId"
        };
    }

    get expressionAttributeNames() {
        return {
            ":pk" : "SCHEDULE",
            ":cid" : this.studyclassId
        };
    }

    async execute(studyclassId) {
        this.studyclassId = studyclassId;
        return await super.execute();
    }
}