const AWS = require("aws-sdk");

AWS.config.update({
    region: "local",
    endpoint: "http://localhost:8000"
});

const dynamodb = new AWS.DynamoDB();

const atscTableParams = {
    TableName : "CNM_FINAL_ATSC",
    KeySchema: [       
        { AttributeName: "partitionKey", KeyType: "HASH"},
        { AttributeName: "sortKey", KeyType: "RANGE" },
    ],
    AttributeDefinitions: [       
        { AttributeName: "partitionKey", AttributeType: "S" },
        { AttributeName: "sortKey", AttributeType: "S" },
        { AttributeName: "data", AttributeType: "S" },
    ],
    GlobalSecondaryIndexes: [
        {
            IndexName: "GSI-1", 
            Projection: {
                "ProjectionType": "ALL"
            }, 
            KeySchema: [
                { AttributeName: "sortKey", KeyType: "HASH" },
                { AttributeName: "data", KeyType: "RANGE" }
            ],
            ProvisionedThroughput: {       
                ReadCapacityUnits: 5, 
                WriteCapacityUnits: 5
            }
        }
    ],
    ProvisionedThroughput: {       
        ReadCapacityUnits: 5, 
        WriteCapacityUnits: 5
    }
};

const sssTableParams = {
    TableName : "CNM_FINAL_SSS",
    KeySchema: [       
        { AttributeName: "partitionKey", KeyType: "HASH"},
        { AttributeName: "sortKey", KeyType: "RANGE" },
    ],
    AttributeDefinitions: [       
        { AttributeName: "partitionKey", AttributeType: "S" },
        { AttributeName: "sortKey", AttributeType: "S" },
        { AttributeName: "data", AttributeType: "S" },
    ],
    GlobalSecondaryIndexes: [
        {
            IndexName: "GSI-1",
            Projection: {
                "ProjectionType": "ALL"
            },  
            KeySchema: [
                { AttributeName: "sortKey", KeyType: "HASH" },
                { AttributeName: "data", KeyType: "RANGE" }
            ],
            ProvisionedThroughput: {       
                ReadCapacityUnits: 5, 
                WriteCapacityUnits: 5
            }
        }
    ],
    ProvisionedThroughput: {       
        ReadCapacityUnits: 5, 
        WriteCapacityUnits: 5
    }
};

function createTable(params) {
    dynamodb.createTable(params, function(err, data) {
        if (err) {
            console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
        }
    });
} 

createTable(atscTableParams);
createTable(sssTableParams);