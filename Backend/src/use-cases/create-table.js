import AWSCreateTable from "../repositories/aws/aws-create-table";

export default class CreateTable extends AWSCreateTable {
    constructor(tableName, region, endpoint) {
        super(tableName, region, endpoint);
    }

    get keySchema() {
        return [
            { AttributeName: "partitionKey", KeyType: "HASH" },
            { AttributeName: "sortKey", KeyType: "RANGE" },
        ];
    }

    get attributeDefinitions() {
        return [
            { AttributeName: "partitionKey", AttributeType: "S" },
            { AttributeName: "sortKey", AttributeType: "S" },
        ];
    }
}