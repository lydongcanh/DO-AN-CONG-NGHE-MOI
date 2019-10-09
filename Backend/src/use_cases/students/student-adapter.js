import CreateStudent from "./create-student";
import FindStudentWithClass from "./find-student-with-class";
import FindStudentWithName from "./find-student-with-name";

export default class StudentAdapter {
    constructor(tableName, region, endpoint) {
        this._createStudentObj = new CreateStudent(tableName, region, endpoint);
        this._findStudentWithClassObj = new FindStudentWithClass(tableName, region, endpoint);
        this._findStudentWithNameObj = new FindStudentWithName(tableName, region, endpoint);
    }

    /**
     * Create new student.
     * @param {Student} student 
     */
    async createStudent (student) {
        return await this._createStudentObj.execute(student);
    }

    /**
     * Find student with provided class id.
     * @param {String} classId 
     */
    async findStudentWithClass(classId) {
        return await this._findStudentWithClassObj.execute(classId);
    }

    /**
     * Find student with its name.
     * @param {String} name 
     */
    async findStudentWithName(name) {
        return await this._findStudentWithNameObj.execute(name);
    }
}