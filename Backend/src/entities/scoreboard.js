export default class Scoreboard {
    
    /**
     * @param {String} id 
     * @param {String} semester 
     * @param {String} year 
     * @param {Array<Score>} scores 
     */
    constructor(id, semester, year, scores) {
        this.id = id;
        this.semester = semester;
        this.year = year;
        this.scores = scores;
        Object.freeze(this);
    }
}