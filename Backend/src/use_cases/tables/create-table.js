import AWSCreateTable from "../../repositories/aws/aws-create-table";

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
            { AttributeName: "data", AttributeType: "S" }
        ];
    }

    get globalSecondaryIndexes() {
        return [
            {
                IndexName: "GSI-1",
                KeySchema: [ 
                    { AttributeName: "sortKey", KeyType: "HASH" },
                    { AttributeName: "data", KeyType: "RANGE" }
                ],
                Projection: {
                    ProjectionType: "ALL"
                },
                ProvisionedThroughput: {
                    ReadCapacityUnits: 1,
                    WriteCapacityUnits: 1
                }
            }
        ];
    }
}