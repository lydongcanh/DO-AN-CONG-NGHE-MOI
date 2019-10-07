import AWS from "aws-sdk";
import AWSUseCase from "./aws-use-case";

/**
 * [Required implementation: keyConditionExpression, expressionAttributeNames, expressionAttributeValues].
 * [Optional implementation: projectionExpression].
 */
export default class AWSScan extends AWSUseCase {
    constructor(tableName, region, endpoint) {
        super(tableName, region, endpoint);
        this.docClient = new AWS.DynamoDB.DocumentClient();
    }

    get params() {
        let result = {
            TableName : this.params,
            KeyConditionExpression: this.keyConditionExpression,
            ExpressionAttributeNames: this.expressionAttributeNames,
            ExpressionAttributeValues: this.expressionAttributeValues
        };
        
        if (this.projectionExpression) {
            reuslt.ProjectionExpression = this.projectionExpression;
        }
        
        return result;
    }

    get projectionExpression() {
        return undefined;
    }

    get keyConditionExpression() {
        throw new Error("Un-implemented \"keyConditionExpression\".");
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