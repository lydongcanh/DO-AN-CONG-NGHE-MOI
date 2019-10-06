export default class Studyclass {

    /**
     * @param {String} id 
     * @param {String} name 
     * @param {String} grade
     * @param {String} state 
     * @param {Array<Student>} students 
     */
    constructor(id, name, grade, state, students) {
        this.id = id;
        this.name = name;
        this.grade = grade;
        this.state = state;
        this.students = students;
        Object.freeze(this);
    }

    size() {
        if (!this.students)
            return 0;

        return this.students.length;
    }
}