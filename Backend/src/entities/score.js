export default class Score {

    /**
     * @param {String} id 
     * @param {String} type 
     * @param {Float} value 
     * @param {String} subjectId 
     * @param {String} scoreBoardId
     */
    constructor(id, type, value, subjectId, scoreBoardId) {
        this.id = id;
        this.type = type;
        this.value = value;
        this.subjectId = subjectId;
        this.scoreBoardId = scoreBoardId;
        Object.freeze(this);
    }
}