const AWS = require("aws-sdk");

AWS.config.update({
    region: "local",
    endpoint: "http://localhost:8000"
});

const dynamodb = new AWS.DynamoDB();

const atscTableParams = {
    TableName : "CNM_FINAL_ATSC",
};

const sssTableParams = {
    TableName : "CNM_FINAL_SSS",
};

function deleteTable(params) {
    dynamodb.deleteTable(params, function(err, data) {
        if (err) {
            console.error("Unable to delete table. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Deleted table. Table description JSON:", JSON.stringify(data, null, 2));
        }
    });
} 

deleteTable(atscTableParams);
deleteTable(sssTableParams);