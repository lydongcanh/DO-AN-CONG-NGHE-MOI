import AWS from "aws-sdk";
import AWSUseCase from "./aws-use-case";

/**
 * [Required implementation: key].
 * [Optional implementation: conditionExpression, expressionAttributeValues]
 */
export default class AWSDelete extends AWSUseCase {
    constructor(tableName, region, endpoint) {
        super(tableName, region, endpoint);
        this.docClient = new AWS.DynamoDB.DocumentClient();
    }

    get params() {
        return {
            TableName: this.tableName,
            Key: this.key,
            ConditionExpression: this.conditionExpression,
            ExpressionAttributeValues: this.expressionAttributeValues
        };
    }

    get key() {
        throw new Error("Un-implemented \"key\".");
    }

    get conditionExpression() {
        return "true";
    }

    get expressionAttributeValues() {
        return {};
    }

    async execute() {
        try {
            const data = await this.docClient.delete(this.params).promise();
            console.log("Delete item(s) successfully: " + JSON.stringify(data));
            return {
                success: true,
                body: data
            };
        } catch (error) {
            console.log("Unable to delete item(s). Error: " + JSON.stringify(error));
            return {
                success: false,
                error: error
            };
        }
    }
}