export default class Scoreboard {
    /**
     * @param {JSON} jsonData 
     */
    constructor(jsonData) {
        Object.assign(this, jsonData);
        Object.freeze(this);
    }

    /**
     * 
     * @param {String} id 
     * @param {String} semester 
     * @param {String} year 
     * @param {Array<Score>} scores 
     * @param {Student} student 
     */
    constructor(id, semester, year, scores, student) {
        this.id = id;
        this.semester = semester;
        this.year = year;
        this.scores = scores;
        this.student = student;
    }
}