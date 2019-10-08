import CreateTeacher from "./create-teacher";
import FindTeacherSchedules from "./find-teacher-schedules";
import FindTeacherWithAccount from "./find-teacher-with-account";

export default class TeacherAdapter {
    
    constructor(tableName, region, endpoint) {
        this.createTeacherObj = new CreateTeacher(tableName, region, endpoint);
        this.findTeacherSchedulesObj = new FindTeacherSchedules(tableName, region, endpoint);
        this.findTeacherWithAccountObj = new FindTeacherWithAccount(tableName, region, endpoint);
    }

    /**
     * Create new teacher.
     * @param {Teacher} teacher 
     */
    async createTeacher(teacher) {
        return await this.createTeacherObj.execute(teacher);
    }

    /**
     * Find all schedules of a teacher with provided id.
     * @param {String} teacherId 
     */
    async findTeacherSchedules(teacherId) {
        return await this.findTeacherSchedulesObj.execute(teacherId);
    }

    /**
     * Find teacher details with account id.
     * @param {String} accountId 
     */
    async findTeacherWithAccount(accountId) {
        return await this.findTeacherWithAccountObj.execute(accountId);
    }
}