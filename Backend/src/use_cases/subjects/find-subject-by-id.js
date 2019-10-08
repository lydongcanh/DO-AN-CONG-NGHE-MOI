import AWSQuery from "../../repositories/aws/aws-query";

export default class FindSubjectByID extends AWSQuery {

    get keyConditionExpression() {
        return "#pk = :pk and #id :id";
    }

    get expressionAttributeNames() {
        return {
            "#pk": "partitionKey",
            "#id": "sortKey"
        };
    }

    get expressionAttributeValues() {
        return {
            ":pk" : "SUBJECT",
            ":id" : this.id
        };
    }

    async execute(id) {
        this.id = id;
        return await super.execute();
    }
}