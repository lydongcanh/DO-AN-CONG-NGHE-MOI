import AWS from "aws-sdk";
import AWSUseCase from "./aws-use-case";

/**
 * [Required implementation: keySchema, attributeDefinitions].
 * [Optional implementation: readCapacityUnits, writeCapacityUnits]
 */
export default class AWSCreateTable extends AWSUseCase {
    constructor(tableName, region, endpoint) {
        super(tableName, region, endpoint);
        this.dynamoDB = new AWS.DynamoDB();
    }

    get params() {
        return {
            TableName: this.tableName,
            KeySchema: this.keySchema,
            AttributeDefinitions: this.attributeDefinitions,
            ProvisionedThroughput: {
                ReadCapacityUnits: this.readCapacityUnits, 
                WriteCapacityUnits: this.writeCapacityUnits
            }
        };
    }

    get keySchema() {
        throw new Error("Un-implemented \"keySchema\".");
    }

    get attributeDefinitions() {
        throw new Error("Un-implemented \"attributeDefinitions\".");
    }

    get readCapacityUnits() {
        return 5;
    }

    get writeCapacityUnits() {
        return 5;
    }

    async execute() {
        try {
            const data = await this.dynamoDB.createTable(this.params).promise();
            console.log("Create table successfully: " + JSON.stringify(data));
            return {
                success: true,
                body: data
            };
        } catch (error) {
            console.log("Unable to create table. Error: " + JSON.stringify(error));
            return {
                success: false,
                error: error
            };
        }
    }
}