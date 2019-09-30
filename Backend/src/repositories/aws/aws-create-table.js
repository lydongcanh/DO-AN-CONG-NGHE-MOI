import AWS from "aws-sdk";
import AWSUseCase from "./aws-use-case";

export default class AWSCreateTable extends AWSUseCase {
    constructor(tableName, region, endpoint) {
        super(tableName, region, endpoint);
        this.dynamoDB = new AWS.DynamoDB();
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