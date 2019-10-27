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
const years = [2018, 2019];
const semesters = ["HK1", "HK2"];
const grades = [10, 11, 12];

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
    (Math.random() * (min - max) + max).toFixed(fixed);
}

function generateAccount(username, password, type) {
    accountRepo.createAccount(username, password, type);
}

async function generateRandomTeachers(count) {
    let ids = [];
    for(let i = 0; i < count; i++) {
        let result = await teacherRepo.createTeacher(
            String(chance.name()),
            String(genders[getRandomInt(0, 1)]),
            String(chance.date()),
            String(chance.address()),
            String(chance.email()),
            String(chance.phone()),
            "active"
        );
        //console.log("generated teacher: " + JSON.stringify(result));
        ids.push(result.id);
    }
    return ids;
}

async function generateRandomClasses(studentIds, step) {
    let ids = [];
    for(let i = 0; i < studentIds.length; i += step) {
        let year = years[getRandomInt(0, 1)]
        let result = await classRepo.createStudyclass(
            chance.letter({casing: "upper"}),
            String(grades[getRandomInt(0, 2)]),
            String(year),
            String(year + 1),
            "active",
            String(studentIds.slice[i, i + step]) // student ids
        );
        ids.push(result.id);
        //console.log("generated class: " + JSON.stringify(result));
    }
    return ids;
}

async function generateRandomScoreboards(studentIds) {
    let ids = [];
    for(let sid = 0; sid < studentIds.length; sid++) {
        for(let i = 0; i < years.length; i++) {
            for (let j = 0; j < semesters.length; j++) {
                let result = await scoreboardRepo.createScoreboard(
                    String(semesters[j]),
                    String(years[i]),
                    String(studentIds[sid])
                )
                ids.push(result.id);
                //console.log("generated sboard: " + JSON.stringify(result));
            }
        }
    }
    return ids;
}

async function generateRandomScores(scoreboardIds, count) {
    let ids = [];
    for(let sid = 0; sid < scoreboardIds.length; sid++) {
        for(let i = 0; i < count; i++) {
            let score = getRandomInt(0, 10);
            let type = scoreTypes[getRandomInt(0, scoreTypes.length - 1)];
            let result = await scoreRepo.createScore(
                String(type),
                Number(score),
                String(subjects[getRandomInt(0, subjects.length - 1)]),
                Number(getMultiplier(type)),
                String(scoreboardIds[sid])
            );
            ids.push(result.id);
            //console.log("generated score: " + JSON.stringify(result));
        }
    }
    return ids;
}

async function generateRandomStudents(count) {
    let ids = [];
    for(let i = 0; i < count; i++) {
        let result = await studentRepo.createStudent(
            String(chance.name()),
            String(genders[getRandomInt(0, 1)]),
            String(chance.date()),
            String(chance.address()),
            String(chance.phone()),
            "active",
            String(0) // TODO: classid
        );
        //console.log("generated student: " + JSON.stringify(result));
        ids.push(result.id);
    }
    return ids;
}

export default async function generate() {
    generateAccount("teacher1", "1234567890", "teacher");
    generateAccount("admin1", "1234567890", "admin");
    generateRandomTeachers(20); // 5: Số giáo viên
    let studentIds = await generateRandomStudents(100); // 50: Số lượng học sinh
    generateRandomClasses(studentIds, 10); // 10: Số học sinh mỗi lớp
    let sbIds = await generateRandomScoreboards(studentIds);
    generateRandomScores(sbIds, 1); // 10: Số điểm trong mỗi bảng điểm
}