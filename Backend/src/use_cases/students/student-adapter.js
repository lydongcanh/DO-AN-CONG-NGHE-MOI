import CreateStudent from "./create-student";
import FindStudentWithClass from "./find-student-with-class";
import FindStudentWithName from "./find-student-with-name";

export default class StudentAdapter {
    constructor(tableName, region, endpoint) {
        this.createStudentObj = new CreateStudent(tableName, region, endpoint);
        this.findStudentWithClassObj = new FindStudentWithClass(tableName, region, endpoint);
        this.findStudentWithNameObj = new FindStudentWithName(tableName, region, endpoint);
    }

    /**
     * Create new student.
     * @param {Student} student 
     */
    async createStudent (student) {
        return await this.createStudentObj.execute(student);
    }

    /**
     * Find student with provided class id.
     * @param {String} classId 
     */
    async findStudentWithClass(classId) {
        return await this.findStudentWithClassObj.execute(classId);
    }

    /**
     * Find student with its name.
     * @param {String} name 
     */
    async findStudentWithName(name) {
        return await this.findStudentWithNameObj.execute(name);
    }
}