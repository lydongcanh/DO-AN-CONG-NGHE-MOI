import AWS from "aws-sdk";

/**
 * Base class for all the use case classes that use AWS services.
 */
export default class AWSUseCase {
    /**
     * @param {String} tableName
     * @param {String} region Region. Use "local" as default. Note that only "us-east-1" is available for AWS Student account.
     * @param {String} endpoint
     */
    constructor(tableName, region = "local", endpoint = "http://localhost:8000") {
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

    async execute() { 
        console.log("executing use-case...");
    }
}