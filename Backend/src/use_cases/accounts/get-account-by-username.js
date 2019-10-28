import AWSQuery from "../../repositories/aws/aws-query";

export default class GetAccountById extends AWSQuery {
    get keyConditionExpression() {
        return "#pk = :pk and #sk = :sk";
    }

    get expressionAttributeNames() {
        return { 
            "#pk" : "partitionKey",
            "#sk" : "sortKey"
        };
    }

    get expressionAttributeValues() {
        return { 
            ":pk" : "ACCOUNT",
            ":sk" : this.username
        };
    }

    async execute(username) {
        this.username = username;
        console.log(`username: ${username}`);
        return await super.execute();
    }
}