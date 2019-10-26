import AWSQuery from "../../repositories/aws/aws-query";

export default class FindStudentWithId extends AWSQuery {
    get keyConditionExpression() {
        return "#pk = :pk";
    }

    get expressionAttributeNames() {
        return {
            "#pk" : "partitionKey",
        };
    }

    get expressionAttributeValues() {
        return {
            ":pk" : this.studentId,
        };
    }

    async execute(studentId) {
        this.studentId = studentId;
        return await super.execute();
    }
}