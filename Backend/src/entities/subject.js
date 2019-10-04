export default class Subject {

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