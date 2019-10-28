export default class Scoreboard {
    
    constructor(id, semester, grade, studentId) {
        this.id = id;
        this.grade = grade;
        this.semester = semester;
        this.studentId = studentId;
        Object.freeze(this);
    }
}