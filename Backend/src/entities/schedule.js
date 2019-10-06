export default class Schedule {
    
    /**
     * @param {String} id 
     * @param {Date} time 
     * @param {String} state 
     * @param {Studyclass} studyclass 
     * @param {Teacher} teacher 
     * @param {Subject} subject
     */
    constructor(id, time, state, studyclass, teacher, subject) {
        this.id = id;
        this.time = time;
        this.state = state;
        this.studyclass = studyclass;
        this.teacher = teacher;
        this.subject = subject;
        Object.freeze(this);
    }
}