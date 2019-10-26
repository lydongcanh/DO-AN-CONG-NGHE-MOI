import accountRepo from "../prop/account-repository";
import scheduleRepo from "../prop/schedule-repository";
import scoreRepo from "../prop/score-repository";
import scoreboardRepo from "../prop/scoreboard-repository";
import studentRepo from "../prop/student-repository";
import teacherRepo from "../prop/teacher-repository";
import classRepo from "../prop/studyclass-repository";
import Chance from "chance";

const chance = new Chance();

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

const genders = ["Nữ", "Nam"];
const years = [2017, 2018, 2019, 2020];
const semesters = ["HK1", "HK2", "HK3"];
const grades = [10, 11, 12];

function getMultiplier(type) {
    if (type == "Kiểm tra miệng" || type == "15 phút")
        return 1;
    
    if (type == "1 tiết" || type == "Giữa kỳ")
        return 2;
    
    if (type == "Cuối kỳ")
        return 3;

    return 0;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomFloat(min, max, fixed = 2) {
    (Math.random() * (min - max) + max).toFixed(fixed);
}

function generateAccount(username, password, type) {
    accountRepo.createAccount(username, password, type);
}

function generateRandomTeachers(count) {
    let ids = [];
    for(let i = 0; i < count; i++) {
        let result = teacherRepo.createTeacher(
            chance.name(),
            genders[getRandomInt(0, 1)],
            chance.birthday(),
            chance.address(),
            chance.email(),
            chance.phone(),
            "active"
        );
        console.log("generated teacher: " + JSON.stringify(result));
        ids.push(result.sortKey);
    }
    return ids;
}

function generateRandomClasses(studentIds, step) {
    let ids = [];
    for(let i = 0; i < studentIds.length; i += step) {
        let year = years[getRandomInt(0, 2)]
        let result = classRepo.createStudyclass(
            chance.character(),
            grades[getRandomInt(0, 2)],
            year,
            year + 1,
            "active",
            studentIds.slice[i, i + step] // student id
        );
        ids.push(result.sortKey);
        console.log("generated class: " + JSON.stringify(result));
    }
    return ids;
}

function generateRandomScoreboards(studentIds) {
    let ids = [];
    for(let sid = 0; sid < studentIds.length; sid++) {
        for(let i = 0; i < years.length; i++) {
            for (let j = 0; j < semesters.length; j++) {
                let result = scoreboardRepo.createScoreboard(
                    semesters[j],
                    years[i],
                    studentIds[sid]
                )
                ids.push(result.sortKey);
                console.log("generated sboard: " + JSON.stringify(result));
            }
        }
    }
    return ids;
}

function generateRandomScores(scoreboardIds, count) {
    let ids = [];
    for(let sid = 0; sid < scoreboardIds.length; sid++) {
        for(let i = 0; i < count; i++) {
            let score = getRandomFloat(0, 10);
            let result = scoreRepo.createScore(
                scoreTypes[getRandomInt(0, scoreTypes.length - 1)],
                score,
                subjects[getRandomInt(0, subjects.length - 1)],
                getMultiplier(score),
                scoreboardIds[sid]
            );
            ids.push(result.sortKey);
            console.log("generated score: " + JSON.stringify(result));
        }
    }
    return ids;
}

function generateRandomStudents(count) {
    let ids = [];
    for(let i = 0; i < count; i++) {
        let result = studentRepo.createStudent(
            chance.name(),
            genders[getRandomInt(0, 1)],
            chance.birthday(),
            chance.address(),
            chance.phone(),
            "active",
            // TODO: classid
        );
        console.log("generated student: " + JSON.stringify(result));
        ids.push(result.sortKey);
    }
    return ids;
}

export default function generate() {
    generateAccount("teacher1", "1234567890", "teacher");
    generateAccount("admin1", "1234567890", "admin");
    generateRandomTeachers(2);
    let studentIds = generateRandomStudents(20);
    generateRandomClasses(studentIds, 10);
    let sbIds = generateRandomScoreboards(studentIds);
    generateRandomScores(sbIds, 5);
}