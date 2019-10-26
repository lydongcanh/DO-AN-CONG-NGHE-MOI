import AWSQuery from "../../repositories/aws/aws-query";

/** [Required implementation: partitionName] */
export default class GetAll extends AWSQuery {
    get keyConditionExpression() {
        return "#pk = :pk";
    }

    get expressionAttributeNames() {
        return { "#pk" : "partitionKey" };
    }

    get expressionAttributeValues() {
        return { ":pk" : this.partitionName };
    }

    get partitionName() {
        throw new Error("Un-implemented \"partitionName\".");
    }
}