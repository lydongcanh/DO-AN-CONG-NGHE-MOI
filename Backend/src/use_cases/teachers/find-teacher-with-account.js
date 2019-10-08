import AWSQuery from "../../repositories/aws/aws-query";

export default class FindTeacherWithAccount extends AWSQuery {
    get keyConditionExpression() {
        return "#pk = :pk and #aid = :aid";
    }

    get expressionAttributeNames() {
        return { 
            "#pk" : "partitionKey",
            "#aid" : "accountId" 
        };
    }

    get expressionAttributeValues() {
        return { 
            ":pk" : "TEACHER",
            ":aid" : this.accountId 
        };
    }

    async execute(accountId) {
        this.accountId = accountId;
        return await super.execute();
    }
}