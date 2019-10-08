import AWSQuery from "../../repositories/aws/aws-query";

export default class FindStudentWithName extends AWSQuery {
    get keyConditionExpression() {
        return "#pk = :pk and contains(#n, :n)";
    }

    get expressionAttributeNames() {
        return {
            "#pk" : "partitionKey",
            "#name" : "data"
        };
    }

    get expressionAttributeValues() {
        return {
            ":pk" : "STUDENT",
            ":n" : this.studentName
        };
    }

    async execute(studentName) {
        this.studentName = studentName;
        return await super.execute();
    }
}