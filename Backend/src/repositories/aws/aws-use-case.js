import AWS from "aws-sdk";

/**
 * Base class for all the use case classes that use AWS services.
 */
export default class AWSUseCase {
    /**
     * @param {String} tableName
     * @param {String} region
     * @param {String} endpoint
     */
    constructor(tableName, region, endpoint) {
        AWS.config.update({
            region: region,
            endpoint: endpoint
        });

        this.tableName = tableName;
        this._region = region;
        this._endpoint = endpoint;
    }

    get region () {
        return this._region;
    }

    set region (region) {
        this.updateConfiguration(this.tableName, region, this._endpoint);
    }

    get endpoint() {
        return this._endpoint;
    }

    set endpoint(endpoint) {
        this.updateConfiguration(this.tableName, this._region, endpoint);
    }

    /**
     * @param {String} tableName
     * @param {String} region Region. Use "local" as default. Note that only "us-east-1" is available for AWS Student account.
     * @param {String} endpoint
     */
    updateConfiguration(tableName, region, endpoint) {
        this.tableName = tableName;
        this._region = region;
        this._endpoint = endpoint;

        AWS.config.update({
            region = this._region,
            endpoint: this._endpoint
        });
    }

    /**
    * Override this method to provide params.
    */
    get params() {
        console.log("This method does nothing. Please override it to provide params.");
    }

    /**
     * Override this method to execute use-case's logic.
     */
    async execute() { 
        console.log("This method does nothing. Please override it to execute use-case's logic.");
    }
}