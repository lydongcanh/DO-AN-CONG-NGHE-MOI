import AWSQuery from "../../repositories/aws/aws-query";

export default class FindScoreBoardByStudentID extends AWSQuery{
    get keyConditionExpression() {
        return "#pk = :pk and #sid = :sid";
    }

    get expressionAttributeNames() {
        return { 
            "#pk": "partitionKey",
            "#sid": "studentId"
        };
    }

    get expressionAttributeValues() {
        return { 
            ":pk" : "SCOREBOARD",
            ":sid" : this.studentId
        };
    }

    async execute(studentId) {
        this.studentId = studentId;
        return await super.execute();
    }
}