const fs = require("fs");
const Chance = require("./chance.js");
const chance = new Chance();

function generateAccount() {
    let teachers = JSON.parse(fs.readFileSync(__dirname + "/teachers.json", "utf-8"));
    let accounts = [];

    for (let i = 0; i < teachers.length; i++) {
        accounts.push({
            "partitionKey": "teacher" + i,
            "sortKey": "1234567890",
            "data": "teacher",
            "teacherId": teachers[i].sortKey
        });
    }

    accounts.push({
        "partitionKey": "admin",
        "sortKey": "1234567890",
        "data": "admin",
        "teacherId": "null"
    });

    fs.writeFile(__dirname + "/accounts.json", JSON.stringify(accounts), error => {
        if (error) {
            console.log(`Error: ${JSON.stringify(error)}`);
        } else {
            console.log(`OK!!!`);
        }
    });
}

function generateClassIdInStudents() {
    let classes = JSON.parse(fs.readFileSync(__dirname + "/classes.json", "utf-8"));
    let students = JSON.parse(fs.readFileSync(__dirname + "/students.json", "utf-8"));

    for (let i = 0; i < classes.length; i++) {
        for (let j = 0; j < students.length; j++) {
            students[j].data = classes[i].sortKey;
            students[j].state = "Đang học";
        }
    }

    fs.writeFile(__dirname + "/students.json", JSON.stringify(students), error => {
        if (error) {
            console.log(`Error: ${JSON.stringify(error)}`);
        } else {
            console.log(`OK!!!`);
        }
    });
}

function generateScores(max) {
    const subjects = [
        "Toán học",
        "Vật lý",
        "Hóa học",
        "Sinh học",
        "Văn học",
        "Tin học",
        "Lịch sử",
        "Địa lý",
        "Ngoại ngữ",
        "GDCD",
        "Công nghệ",
        "Thể dục",
        "GDQP-AN"
    ];

    const scoreTypes = [
        "Kiểm tra miệng",
        "15 phút",
        "1 tiết",
        "Giữa kỳ",
        "Cuối kỳ"
    ];

    function getMultiplier(type) {
        if (type == "Kiểm tra miệng" || type == "15 phút")
            return 1;

        if (type == "1 tiết" || type == "Giữa kỳ")
            return 2;

        if (type == "Cuối kỳ")
            return 3;

        return 1;
    }

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function getRandomFloat(min, max, fixed = 2) {
        return (Math.random() * (min - max) + max).toFixed(fixed);
    }

    function getNumberOfScoreInType(type, max) {
        if (type == "Kiểm tra miệng" || type == "15 phút" )
            return getRandomInt(1, max);
        
        return 1;
    }

    function generateRandomScores(scoreboards, max) {
        let scores = [];
        for (let sid = 0; sid < scoreboards.length; sid++) {
            for (let i = 0; i < subjects.length; i++) {
                for (let j = 0; j < scoreTypes.length; j++) {
                    let type = scoreTypes[j];
                    let count = getNumberOfScoreInType(type, max);
                    console.log(subjects[i] + " - " + type + " - " + count);
                    
                    for (let k = 0; k < count; k++) {
                        let score = getRandomFloat(0, 10);
                        scores.push({
                            sortKey: chance.guid(),
                            data: String(type),
                            value: Number(score),
                            subject: String(subjects[i]),
                            multiplier: Number(getMultiplier(type)),
                            scoreboardId: String(scoreboards[sid].sortKey),
                            partitionKey: "SCORE"
                        });
                    }
                }
            }
        }
        return scores;
    }

    let sbs = JSON.parse(fs.readFileSync(__dirname + "/scoreboards.json", "utf-8"));
    let scores = generateRandomScores(sbs, max);
    fs.writeFile(__dirname + "/scores.json", JSON.stringify(scores), error => {
        if (error) {
            console.log(`Error: ${JSON.stringify(error)}`);
        } else {
            console.log(`OK!!!`);
        }
    });
}

//generateAccount();
//generateClassIdInStudents();
generateScores(2);