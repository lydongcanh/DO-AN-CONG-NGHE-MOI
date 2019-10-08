import AWSQuery from "../../repositories/aws/aws-query";

export default class FindTeacherWithAccount extends AWSQuery {
    get keyConditionExpression() {
        return "#pk = :pk and #tid = :tid";
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
            ":tid" : this.accountId 
        };
    }

    async execute(accountId) {
        this.accountId = accountId;
        return await super.execute();
    }
}