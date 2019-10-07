import AWSQuery from "../../repositories/aws/aws-query";

export default class FindAccountWithUsername extends AWSQuery {

    get keyConditionExpression() {
        return "#un = :un";
    }

    get expressionAttributeNames() {
        return { "#un": "username" };
    }

    get expressionAttributeValues() {
        return { ":un" : this.username };
    }

    async execute(username) {
        this.username = username;
        return await super.execute();
    }
}