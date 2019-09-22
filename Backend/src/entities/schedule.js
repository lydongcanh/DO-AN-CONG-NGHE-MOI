export default class Schedule {
    /**
     * @param {JSON} jsonData 
     */
    constructor(jsonData) {
        Object.assign(this, jsonData);
        Object.freeze(this);
    }

    /**
     * @param {String} id 
     * @param {Date} time 
     * @param {String} state 
     * @param {Studyclass} studyclass 
     * @param {Teacher} teacher 
     */
    constructor(id, time, state, studyclass, teacher) {
        this.id = id;
        this.time = time;
        this.state = state;
        this.studyclass = studyclass;
        this.teacher = teacher;
        Object.freeze(this);
    }
}