export default class Schedule {
    
    /**
     * @param {String} id 
     * @param {Date} time 
     * @param {String} state 
     * @param {String} classId 
     * @param {String} teacherId
     * @param {String} subjectId
     */
    constructor(id, time, state, classId, teacherId, subjectId) {
        this.id = id;
        this.time = time;
        this.state = state;
        this.classId = classId;
        this.teacherId = teacherId;
        this.subjectId = subjectId;
        Object.freeze(this);
    }
}