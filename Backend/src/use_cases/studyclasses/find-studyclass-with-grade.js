import AWSQuery from "../../repositories/aws/aws-query";

export default class FindStudyclassWithGrade extends AWSQuery {
    get keyConditionExpression() {
        return "#pk = :pk and #g = :g";
    }

    get expressionAttributeNames() {
        return {
            "#pk" : "partitionKey",
            "#g" : "grade"
        };
    }

    get expressionAttributeValues() {
        return {
            ":pk" : "CLASS",
            ":g" : this.grade
        };
    }

    async execute(grade) {
        this.grade = grade;
        return await super.execute();
    }
}