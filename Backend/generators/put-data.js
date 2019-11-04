const AWS = require("aws-sdk");
const fs = require("fs");

AWS.config.update({
    region: "local",
    endpoint: "http://localhost:8000"
});

let client = new AWS.DynamoDB.DocumentClient();

let count = 0;
function putdata(table, item) {
    const params = {
        TableName: table,
        Item: item
    };

    count++;
    console.log("Adding: " + count);

    client.put(params, function (err, _) {
        if (err) {
            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
        }
    });
}

JSON.parse(fs.readFileSync(__dirname + "/accounts.json", "utf-8")).forEach(account => {
    console.log(`put account: ${JSON.stringify(account)}`);
    putdata("CNM_FINAL_ATSC", account);
});

// JSON.parse(fs.readFileSync(__dirname + "/classes.json", "utf-8")).forEach(c => {
//     putdata("CNM_FINAL_ATSC", c);
// });

// JSON.parse(fs.readFileSync(__dirname + "/schedules.json", "utf-8")).forEach(c => {
//     putdata("CNM_FINAL_ATSC", c);
// });

// JSON.parse(fs.readFileSync(__dirname + "/scoreboards.json", "utf-8")).forEach( sb => {
//     putdata("CNM_FINAL_SSS", sb);
// });

// JSON.parse(fs.readFileSync(__dirname + "/scores.json", "utf-8")).forEach( s => {
//     putdata("CNM_FINAL_SSS", s);
// });


// JSON.parse(fs.readFileSync(__dirname + "/students.json", "utf-8")).forEach( s => {
//     putdata("CNM_FINAL_SSS", s);
// });


// JSON.parse(fs.readFileSync(__dirname + "/teachers.json", "utf-8")).forEach( t => {
//     putdata("CNM_FINAL_ATSC", t);
// });