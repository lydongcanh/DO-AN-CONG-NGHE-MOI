export default class Studyclass {

    constructor(id, name, grade, startYear, endYear, state, studentIds) {
        this.id = id;
        this.name = name;
        this.grade = grade;
        this.startYear = startYear;
        this.endYear = endYear;
        this.state = state;
        this.studentIds = studentIds;
        Object.freeze(this);
    }
}