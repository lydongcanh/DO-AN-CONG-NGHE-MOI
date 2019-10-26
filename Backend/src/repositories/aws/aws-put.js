import AWS from "aws-sdk";
import AWSUseCase from "./aws-use-case";

/**
 * [Required implementation: item].
 */
export default class AWSPut extends AWSUseCase {
    constructor(tableName, region, endpoint) {
        super(tableName, region, endpoint);
        this.docClient = new AWS.DynamoDB.DocumentClient();
    }

    get params() {
        return {
            TableName: this.tableName,
            Item: this.item
        };
    }

    get item() {
        throw new Error("Un-implemented \"item\".");
    }

    async execute() {
        try {
            const data = await this.docClient.put(this.params).promise();
            console.log("Added item: " + JSON.stringify(this.item));
            return {
                success: true,
                body: this.item
            };
        } catch (error) {
            console.log("Unable to add item. Error: " + JSON.stringify(error));
            return { 
                success: false,
                error: error
            };
        }
    }
}