import AWS from "aws-sdk";
import AWSUseCase from "./aws-use-case";

/**
 * [Required implementation: key, updateExpression, expressionAttributeValues].
 * [Optional implementation: conditionExpression, returnValues]
 */
export default class AWSUpdate extends AWSUseCase {
    constructor(tableName, region, endpoint) {
        super(tableName, region, endpoint);
        this.docClient = new AWS.DynamoDB.DocumentClient();
    }

    get params() {
        let result = {
            TableName: this.tableName,
            Key: this.key,
            UpdateExpression: this.updateExpression,
            ExpressionAttributeValues: this.expressionAttributeValues,
            ReturnValues: this.returnValues
        };

        if (conditionExpression)
            result.ConditionExpression = this.conditionExpression;

        return result;
    }

    get key() {
        throw new Error("Un-implemented \"key\".");
    }

    get updateExpression() {
        throw new Error("Un-implemented \"updateExpression\".");
    }

    get conditionExpression() {
        return undefined;
    }

    get expressionAttributeValues() {
        throw new Error("Un-implemented \"expressionAttributeValues\".");
    }

    get returnValues() {
        return "UPDATED_NEW";
    }

    async execute() {
        try {
            const data = await this.docClient.update(this.params).promise();
            console.log("Update item(s) successfully: " + JSON.stringify(data));
            return {
                success: true,
                body: data
            };
        } catch (error) {
            console.log("Unable to update item(s). Error: " + JSON.stringify(error));
            return {
                success: false,
                error: error
            };
        }
    }
}