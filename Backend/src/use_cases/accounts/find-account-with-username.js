import AWSQuery from "../../repositories/aws/aws-query";

export default class FindAccountWithUsername extends AWSQuery {

    get keyConditionExpression() {
        return "#pk = :pk and #un = :un";
    }

    get expressionAttributeNames() {
        return { 
            "#pk": "partitionKey",
            "#un": "username" 
        };
    }

    get expressionAttributeValues() {
        return { 
            ":pk" : "ACCOUNT",
            ":un" : this.username
        };
    }

    async execute(username) {
        this.username = username;
        return await super.execute();
    }
}