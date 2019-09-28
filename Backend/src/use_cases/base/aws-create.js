import AWS from "aws-sdk";
import AWSUseCase from "./aws-use-case";

export default class AWSCreate extends AWSUseCase {
    constructor(tableName, region, endpoint) {
        super(tableName, region, endpoint);
        this.docClient = new AWS.DynamoDB.DocumentClient();
    }

    /**
     * Override this method to provide "create" params.
     */
    get params() { 
        console.log("This method does nothing. Please override it to provide \"create\" params.");
    }
    
    async execute() {
        this.docClient.put(this.params, (error, data) => {
            if (error) {
                console.log("Unable to add item. Error: " + JSON.stringify(error));
            } else {
                console.log("Added item: " + JSON.stringify(data));
            }
        });
    }
}