export default class Score {
    /**
     * @param {JSON} jsonData 
     */
    constructor(jsonData) {
        Object.assign(this, jsonData);
        Object.freeze(this);
    }

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