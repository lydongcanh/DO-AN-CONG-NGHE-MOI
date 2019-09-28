import AWS from "aws-sdk";
import AWSUseCase from "./aws-use-case";

export default class AWSGet extends AWSUseCase {
    constructor(tableName, region, endpoint) {
        super(tableName, region, endpoint);
        this.docClient = new AWS.DynamoDB.DocumentClient();
    }

    /**
     * Override this method to provide "get" params.
     */
    get params() {
        console.log("This method does nothing. Please override it to provide \"get\" params.");
    }

    async execute() {
        try {
            const data = this.docClient.get(params).promise();
            console.log("Get item(s) successfully.");
            return {
                success: true,
                body: data
            }
        } catch (error) {
            console.log("Unable to get item(s). Error: " + JSON.stringify(error));
            return {
                success: false,
                error: error
            }
        }
    }
}