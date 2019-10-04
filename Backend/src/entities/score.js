export default class Score {

    /**
     * @param {String} id 
     * @param {String} type 
     * @param {Float} value 
     * @param {Subject} subject 
     */
    constructor(id, type, value, subject) {
        this.id = id;
        this.type = type;
        this.value = value;
        this.subject = subject;
        Object.freeze(this);
    }
}