export default class Studyclass {

    /**
     * @param {String} id 
     * @param {String} name 
     * @param {String} grade
     * @param {Teacher} homeroomTeacher 
     * @param {String} state 
     * @param {Array<Student>} students 
     */
    constructor(id, name, grade, homeroomTeacher, state, students) {
        this.id = id;
        this.name = name;
        this.grade = grade;
        this.homeroomTeacher = homeroomTeacher;
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