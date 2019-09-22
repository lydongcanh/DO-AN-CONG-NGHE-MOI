export default class Subject {
    /**
     * @param {JSON} jsonData 
     */
    constructor(jsonData) {
        Object.assign(this, jsonData);
        Object.freeze(this);
    }

    /**
     * @param {String} id 
     * @param {String} name 
     */
    constructor(id, name) {
        this.id = id;
        this.name = name;
        Object.freeze(this);
    }
}