export default class Schedule {

    constructor(id, startDate, endDate, startTime, length, state, subject, teacherId, classId) {
        this.id = id;
        this.startDate = startDate;
        this.endDate = endDate;
        this.startTime = startTime;
        this.length = length;
        this.state = state;
        this.subject = subject;
        this.teacherId = teacherId;
        this.classId = classId;

        Object.freeze(this);
    }
}