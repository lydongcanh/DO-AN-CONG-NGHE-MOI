import accountsFile from "./accounts.json";
import classesFile from "./accounts.json";
import schedulesFile from "./schedules.json";
import scoresFile from "./scores.json";
import studentsFile from "./students.json";
import teachersFile from "./teachers.json";
import scoreboardsFile from "./scoreboards.json";

export default class MockDB {

    constructor() {
        this.accounts = accountsFile;
        this.students = studentsFile;
        this.classes = classesFile;
        this.schedules = schedulesFile;
        this.scores = scoresFile;
        this.teachers = teachersFile;
        this.scoreboards = scoreboardsFile;
    }

    getStudentScoreboards(studentId) {
        return this.scoreboards.filter(scoreboard => {
            return scoreboard.studentId == studentId;
        });  
    }

    getScores(scoreboardId) {
        return this.scores.filter(score => {
            return score.scoreboardId == scoreboardId;
        });
    }

    getTeachersWithName(name) {
        return this.teachers.filter(teacher => {
            return teacher.name.includes(name);
        });
    }

    getStudentSchedules(studentId) {
        return this.schedules.filter(schedule => {
            return schedule.studentId == studentId;
        })
    }

    getStudentScores(studentId) {
        return this.scores.filter(score => {
            return score.studentId == studentId;
        });
    }

    getClassWithGrade(grade) {
        return this.classes.filter(obj => {
            return obj.grade == grade;
        });
    }

    getAllStudents() {
        return this.students;
    }

    getStudentInClass(classId) {
        return this.students.filter(obj => {
            return obj.classId == classId;
        });
    }

    getStudentWithName(name) {
        return this.students.filter(student => {
            return student.name.includes(name);
        });
    }

    getAccount(username, password) {
        return this.accounts.find(obj => {
            return obj.username == username && obj.password == password
        });
    }
}