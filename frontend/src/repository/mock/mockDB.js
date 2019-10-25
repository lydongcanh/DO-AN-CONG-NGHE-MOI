import accountsFile from "./accounts.json";
import classesFile from "./classes.json";
import schedulesFile from "./schedules.json";
import scoresFile from "./scores.json";
import studentsFile from "./students.json";
import teachersFile from "./teachers.json";
import scoreboardsFile from "./scoreboards.json";

class MockDB {

    constructor() {
        this.accounts = accountsFile;
        this.students = studentsFile;
        this.classes = classesFile;
        this.schedules = schedulesFile;
        this.scores = scoresFile;
        this.teachers = teachersFile;
        this.scoreboards = scoreboardsFile;
    }

    getScores(scoreboardId) {
        return this.scores.filter(score => {
            return score.scoreboardId == scoreboardId;
        });
    }

    getClassWithGrade(grade) {
        return this.classes.filter(obj => {
            return obj.grade == grade;
        });
    }

    getAccount(username, password) {
        return this.accounts.find(obj => {
            return obj.username == username && obj.password == password
        });
    }

    getAccountWithUsername(username) {
        return this.accounts.find(account => {
            return account.username == username;
        });
    }

    getTeacherWithId(teacherId) {
        return this.teachers.find(teacher => {
            return teacher.id == teacherId;
        });
    }

    getTeachersWithName(name) {
        return this.teachers.filter(teacher => {
            return teacher.name.includes(name);
        });
    }

    getTeacherSchedules(teacherId) {
        return this.schedules.filter(schedule => {
            return schedule.teacherId == teacherId;
        });
    }

    getTeacherSchedulesInRange(teacherId, from, to) {
        let allSchedules = this.getTeacherSchedules(teacherId);
        if (!allSchedules || allSchedules.length < 1)
            return [];

        return allSchedules.filter(schedule => {
            const startDate = new Date(schedule.startDate);
            const endDate = new Date(schedule.endDate);

            return startDate.valueOf() <= from.valueOf() &&
                   endDate.valueOf() >= to.valueOf();
        });
    }

    getTeacherClasses(teacherId) {
        let schedules = this.getTeacherSchedules(teacherId);
        if (!schedules || schedules.length < 1)
            return [];

        let classes = [];
        for(let i = 0; i < schedules.length; i++) {
            classes.push(this.getClassWithId(schedules[i].classId));
        }

        return classes;
    }

    getClassWithId(classId) {
        return this.classes.find(c => {
            return c.id == classId;
        });
    }

    getStudentWithId(studentId) {
        return this.students.find(student => student.id == studentId);
    }

    getStudentInClass(classId) {
        return this.students.filter(obj => {
            return obj.classId == classId;
        });
    }

    getStudentScoreboards(studentId) {
        return this.scoreboards.filter(scoreboard => {
            return scoreboard.studentId == studentId;
        });  
    }

    getStudentSchedules(studentId) {
        return this.schedules.filter(schedule => {
            return schedule.studentId == studentId;
        })
    }

    getStudentSchedulesInRange(studentId, from, to) {
        let allSchedules = this.getStudentSchedules(studentId);
        if (!allSchedules || allSchedules.length < 1)
            return [];

        return allSchedules.filter(schedule => {
            const startDate = new Date(schedule.startDate);
            const endDate = new Date(schedule.endDate);

            return startDate.valueOf() <= from.valueOf() &&
                   endDate.valueOf() >= to.valueOf();
        });
    }

    getStudentScores(studentId) {
        return this.scores.filter(score => {
            return score.studentId == studentId;
        });
    }

    getStudents() {
        return this.students;
    }

    getStudentWithName(name) {
        return this.students.filter(student => {
            return student.name.includes(name);
        });
    }
    getClassesWithStudentId(studentId){
        return this.classes.find(classes =>{
            return classes.studentId == studentId;
        });
    }
    
}

const mockDB = new MockDB();
export default mockDB;