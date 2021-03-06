import CreateStudent from "./create-student";
import GetStudentById from "./get-student-by-id";
import GetAllStudents from "./get-all-students";
import DeleteStudent from "./delete-student";
import UpdateStudent from "./update-student";

export default class StudentAdapter {
    constructor(tableName, region, endpoint) {
        this._createStudentObj = new CreateStudent(tableName, region, endpoint);
        this._getAllStudentsObj = new GetAllStudents(tableName, region, endpoint);
        this._getStudentByIdObj = new GetStudentById(tableName, region, endpoint);
        this._deleteStudentObj = new DeleteStudent(tableName, region, endpoint);
        this._updateStudentObj = new UpdateStudent(tableName, region, endpoint);
    }

    /**
     * Create new student.
     * @param {Student} student 
     */
    async createStudent (student) {
        return await this._createStudentObj.execute(student);
    }

    async getAllStudents() {
        return await this._getAllStudentsObj.execute();
    }

    async getStudentById(id) {
        return await this._getStudentByIdObj.execute(id);
    }

    async deleteStudent(id) {
        return await this._deleteStudentObj.execute(id);
    }

    async updateStudent(student) {
        return await this._updateStudentObj.execute(student);
    }
}