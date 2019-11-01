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
        let updateConfig = {
            region: region,
            accessKey: "ASIA3GHZ2RT64L5W2QUS",
            secretAccessKey: "aws_secret_access_key=rh3DAGDuxIEIvSf3u54teUBb3hPbbNysJYlsQazf",
            sessionToken: "FQoGZXIvYXdzEO3//////////wEaDFqa1h46KK5HDGDIxCKDAqlmifbFdOLqUCAHCJpEDKwJUh7f9IrdnUlYCkSgI+RUlEPJ5Q2E8nQGy1GUzbRx36+fK5jZF85H3j5NcR+1FDFfYEu/uhapohQdDvGMx+1YcOqAKX34QWJvVE6mB0TSBTzz+nXwTAaU1pMVYApu+03Ry+U6Xl3wpSmesFqWVA3hAxIZnlhKGixWmTgPBCxJimqkoWI/+bZ5hd6gJQakorsjrlRLs6/mtEV3UKKDg251Co+mS31RBZtUF7WPEFlZbDgQlfd/iUVtDCGrbbK0Lo7tNohXIWsqryc44KtasCsjUomxiSsyKxg3i5u0rimcepeH8utchTCiynuI/FyTzM+1WfAo2Mvu7QU="
        };

        if (endpoint)
            updateConfig.endpoint = endpoint;

        AWS.config.update(updateConfig);

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