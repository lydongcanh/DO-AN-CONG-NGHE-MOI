import AWSQuery from "../../repositories/aws/aws-query";

export default class FindStudentWithClass extends AWSQuery {
    get keyConditionExpression() {
        return "#pk = :pk and #cid = :cid";
    }

    get expressionAttributeNames() {
        return {
            "#pk" : "partitionKey",
            "#cid" : "classId"
        };
    }

    get expressionAttributeValues() {
        return {
            ":pk" : "STUDENT",
            ":cid" : this.classId 
        };
    }

    async execute(classId) {
        this.classId = classId;
        return await super.execute();
    }
}