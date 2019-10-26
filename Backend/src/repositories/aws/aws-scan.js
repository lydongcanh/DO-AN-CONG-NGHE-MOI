import AWS from "aws-sdk";
import AWSUseCase from "./aws-use-case";

/**
 * [Required implementation: projectionExpression, filterExpression, expressionAttributeNames, expressionAttributeValues].
 */
export default class AWSScan extends AWSUseCase {
    constructor(tableName, region, endpoint) {
        super(tableName, region, endpoint);
        this.docClient = new AWS.DynamoDB.DocumentClient();
    }

    get params() {
        let result = {
            TableName : this.tableName,
            ProjectionExpression: this.projectionExpression,
            FilterExpression: this.filterExpression,
            ExpressionAttributeNames: this.expressionAttributeNames,
            ExpressionAttributeValues: this.expressionAttributeValues
        };
        
        return result;
    }

    get projectionExpression() {
        throw new Error("Un-implemented \"projectionExpression\".");
    }

    get filterExpression() {
        throw new Error("Un-implemented \"filterExpression\".");
    }

    get expressionAttributeNames() {
        throw new Error("Un-implemented \"expressionAttributeNames\".");
    }

    get expressionAttributeValues() {
        throw new Error("Un-implemented \"expressionAttributeValues\".");
    }

    async execute() {
        try {
            const data = await this.docClient.scan(this.params).promise();
            console.log("Scan item(s) successfully: " + JSON.stringify(data));
            return {
                success: true,
                body: data
            };
        } catch (error) {
            console.log("Unable to scan item(s). Error: " + JSON.stringify(error));
            return {
                success: false,
                error: error
            };
        }
    }
}