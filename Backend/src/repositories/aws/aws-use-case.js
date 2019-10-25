import AWS from "aws-sdk";

/**
 * Base class for all the use case classes that use AWS services.
 * [Required implementation: params, execute].
 */
export default class AWSUseCase {
    /**
     * @param {String} tableName
     * @param {String} region
     * @param {String} endpoint
     */
    constructor(tableName, region, endpoint) {
        console.log({
            tableName: tableName,
            region: region,
            endpoint: endpoint
        });

        AWS.config.update({
            region: region,
            endpoint: endpoint,
        });

        this.tableName = tableName;
        this._region = region;
        this._endpoint = endpoint;
    }

    get region () {
        return this._region;
    }

    get endpoint() {
        return this._endpoint;
    }

    /**
    * Override this method to provide params.
    */
    get params() {
        throw new Error("Un-implemented \"params\".");
    }

    /**
     * Override this method to execute use-case's logic.
     */
    async execute() { 
        throw new Error("Un-implemented \"execute\".");
    }
}