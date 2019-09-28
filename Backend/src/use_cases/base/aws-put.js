import AWS from "aws-sdk";
import AWSUseCase from "./aws-use-case";

export default class AWSPut extends AWSUseCase {
    constructor(tableName, region, endpoint) {
        super(tableName, region, endpoint);
        this.docClient = new AWS.DynamoDB.DocumentClient();
    }

    async execute() {
        try {
            const data = await this.docClient.put(this.params).promise();
            console.log("Added item: " + JSON.stringify(data));
            return {
                success: true,
                body: data
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