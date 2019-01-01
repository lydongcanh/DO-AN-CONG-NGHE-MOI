export default class Schedule {

    constructor(id, semester, time, date, state, subject, teacherId, classId) {
        this.id = id;
        this.semester = semester;
        this.time = time;
        this.date = date;
        this.state = state;
        this.subject = subject;
        this.teacherId = teacherId;
        this.classId = classId;

        Object.freeze(this);
    }
}