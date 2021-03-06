import CreateTeacher from "./create-teacher";
import GetAllTeachers from "./get-all-teachers";
import GetTeacherById from "./get-teacher-by-id";
import DeleteTeacher from "./delete-teacher";
import UpdateTeacher from "./update-teacher";

export default class TeacherAdapter {
    
    constructor(tableName, region, endpoint) {
        this._createTeacherObj = new CreateTeacher(tableName, region, endpoint);
        this._getAllTeachersObj = new GetAllTeachers(tableName, region, endpoint);
        this._getTeacherByIdObj = new GetTeacherById(tableName, region, endpoint);
        this._deleteTeacherObj = new DeleteTeacher(tableName, region, endpoint);
        this._updateTeacherObj = new UpdateTeacher(tableName, region, endpoint);
    }

    /**
     * Create new teacher.
     * @param {Teacher} teacher 
     */
    async createTeacher(teacher) {
        return await this._createTeacherObj.execute(teacher);
    }

    async getAllTeachers() {
        return await this._getAllTeachersObj.execute();
    }

    async getTeacherById(id) {
        return await this._getTeacherByIdObj.execute(id);
    }

    async deleteTeacher(id) {
        return await this._deleteTeacherObj.execute(id);
    }

    async updateTeacher(teacher) {
        return await this._updateTeacherObj.execute(teacher);
    }
}