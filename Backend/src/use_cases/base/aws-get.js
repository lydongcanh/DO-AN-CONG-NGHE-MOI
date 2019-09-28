import AWS from "aws-sdk";
import AWSUseCase from "./aws-use-case";

export default class AWSGet extends AWSUseCase {
    constructor(tableName, region, endpoint) {
        super(tableName, region, endpoint);
        this.docClient = new AWS.DynamoDB.DocumentClient();
    }

    async execute() {
        try {
            const data = await this.docClient.get(this.params).promise();
            console.log("Get item(s) successfully: " + JSON.stringify(data));
            return {
                success: true,
                body: data
            };
        } catch (error) {
            console.log("Unable to get item(s). Error: " + JSON.stringify(error));
            return {
                success: false,
                error: error
            };
        }
    }
}