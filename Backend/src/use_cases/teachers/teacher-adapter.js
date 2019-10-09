import CreateTeacher from "./create-teacher";
import FindTeacherWithAccount from "./find-teacher-with-account";

export default class TeacherAdapter {
    
    constructor(tableName, region, endpoint) {
        this._createTeacherObj = new CreateTeacher(tableName, region, endpoint);
        this._findTeacherWithAccountObj = new FindTeacherWithAccount(tableName, region, endpoint);
    }

    /**
     * Create new teacher.
     * @param {Teacher} teacher 
     */
    async createTeacher(teacher) {
        return await this._createTeacherObj.execute(teacher);
    }

    /**
     * Find teacher details with account id.
     * @param {String} accountId 
     */
    async findTeacherWithAccount(accountId) {
        return await this._findTeacherWithAccountObj.execute(accountId);
    }
}