export default class Studyclass {

    constructor(id, name, grade) {
        this.id = id;
        this.name = name;
        this.grade = grade;
        Object.freeze(this);
    }
}