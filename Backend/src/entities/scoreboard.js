export default class Scoreboard {
    
    /**
     * @param {String} id 
     * @param {String} semester 
     * @param {String} year 
     * @param {String} studentId
     */
    constructor(id, semester, year, studentId) {
        this.id = id;
        this.semester = semester;
        this.year = year;
        this.studentId = studentId;
        Object.freeze(this);
    }
}