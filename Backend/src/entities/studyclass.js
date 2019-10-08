export default class Studyclass {

    /**
     * @param {String} id 
     * @param {String} name 
     * @param {String} grade
     * @param {String} state 
     */
    constructor(id, name, grade, state) {
        this.id = id;
        this.name = name;
        this.grade = grade;
        this.state = state;
        Object.freeze(this);
    }
}