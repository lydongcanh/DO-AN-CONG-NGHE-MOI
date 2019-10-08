import AWSQuery from "../../repositories/aws/aws-query";

export default class FindTeacherSchedules extends AWSQuery {
    get keyConditionExpression() {
        return "#pk = :pk and contains (#tid, :tid)";
    }

    get expressionAttributeNames() {
        return {
            "#pk" : "partitionKey",
            "#tid" : "teacherId"
        };
    }

    get expressionAttributeValues() {
        return {
            ":pk" : "TEACHER",
            ":tid" : this.teacherId
        };
    }

    async execute(teacherId) {
        this.teacherId = teacherId;
        return await super.execute();
    }
}