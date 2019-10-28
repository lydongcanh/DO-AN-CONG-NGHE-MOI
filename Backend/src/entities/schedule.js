export default class Schedule {

    constructor(id, semester, time, state, subject, teacherId, classId) {
        this.id = id;
        this.semester = semester;
        this.time = time;
        this.state = state;
        this.subject = subject;
        this.teacherId = teacherId;
        this.classId = classId;

        Object.freeze(this);
    }
}