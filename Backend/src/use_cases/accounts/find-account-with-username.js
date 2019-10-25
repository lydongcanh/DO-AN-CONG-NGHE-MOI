import AWSQuery from "../../repositories/aws/aws-query";

export default class FindAccountWithUsername extends AWSQuery {

    get keyConditionExpression() {
        return "#pk = :pk";
    }

    get expressionAttributeNames() {
        return { 
            "#pk": "partitionKey",
        };
    }

    get expressionAttributeValues() {
        return { 
            ":pk" : this.username,
        };
    }

    async execute(username) {
        this.username = username;
        return await super.execute();
    }
}