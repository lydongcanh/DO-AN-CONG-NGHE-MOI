import AWSQuery from "../../repositories/aws/aws-query";

/** TODO: Edit later... */
export default class FindTeacherSchedules extends AWSQuery {
    get keyConditionExpression() {
        return "#pk = :pk and #tid = :tid";
    }

    get expressionAttributeNames() {
        return {
            "#pk" : "partitionKey",
            "#tid" : "data"
        };
    }

    get expressionAttributeValues() {
        return {
            ":pk" : "SCHEDULE",
            ":tid" : this.teacherId
        };
    }

    async execute(teacherId) {
        this.teacherId = teacherId;
        return await super.execute();
    }
}