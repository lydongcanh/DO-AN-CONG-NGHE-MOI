import AWS from "aws-sdk";
import AWSUseCase from "./aws-use-case";

export default class AWSScan extends AWSUseCase {
    constructor(tableName, region, endpoint) {
        super(tableName, region, endpoint);
        this.docClient = new AWS.DynamoDB.DocumentClient();
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