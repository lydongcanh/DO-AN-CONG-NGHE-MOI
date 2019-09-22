export default class Studyclass {
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
     * @param {Teacher} homeroomTeacher 
     * @param {String} state 
     * @param {Array<Student>} students 
     */
    constructor(id, name, homeroomTeacher, state, students) {
        this.id = id;
        this.name = name;
        this.homeroomTeacher = homeroomTeacher;
        this.state = state;
        this.students = students;
    }

    studentsCount() {
        if (!this.students)
            return 0;

        return this.students.length;
    }
}