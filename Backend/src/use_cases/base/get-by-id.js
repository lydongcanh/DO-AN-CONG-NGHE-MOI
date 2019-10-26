import AWSQuery from "../../repositories/aws/aws-query";

/** [Required implementation: partitionName] */
export default class GetById extends AWSQuery {
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
            ":pk" : this.partitionName,
            ":sk" : this.id
        };
    }

    get partitionName() {
        throw new Error("Un-implemented \"partitionName\".");
    }

    async execute(id) {
        this.id = id;
        return await super.execute();
    }
}