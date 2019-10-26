import CreateTeacher from "./create-teacher";
import GetAllTeachers from "./get-all-teachers";
import GetTeacherById from "./get-teacher-by-id";

export default class TeacherAdapter {
    
    constructor(tableName, region, endpoint) {
        this._createTeacherObj = new CreateTeacher(tableName, region, endpoint);
        this._getAllTeachersObj = new GetAllTeachers(tableName, region, endpoint);
        this._getTeacherByIdObj = new GetTeacherById(tableName, region, endpoint);
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
}