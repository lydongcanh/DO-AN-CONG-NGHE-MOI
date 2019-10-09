import CreateSchedule from "./create-schedule";
import FindStudyclassSchedules from "./find-studyclass-schedules";
import FindTeacherSchedules from "./find-teacher-schedules";
import GetAllSchedules from "./get-all-schedules";

export default class ScheduleAdapter {
    constructor(tableName, region, endpoint) {
        this._createScheduleObj = new CreateSchedule(tableName, region, endpoint);
        this._findStudyclassSchedulesObj = new FindStudyclassSchedules(tableName, region, endpoint);    
        this._findTeacherSchedulesObj = new FindTeacherSchedules(tableName, region, endpoint);   
        this._getAllSchedulesObj = new GetAllSchedules(tableName, region, endpoint);
    }

    /**
     * Create new schedule.
     * @param {Schedule} schedule 
     */
    async createSchedule(schedule) {
        return await this._createScheduleObj.execute(schedule);
    }

    /**
     * Return all available schedules.
     */
    async getAllSchedules() {
        return await this._getAllSchedulesObj.execute();
    }

    /**
     * Find all schedules of a studyclass with prodided id.
     * @param {String} studyclassid 
     */
    async findStudyclassSchedules(studyclassid) {
        return await this._findStudyclassSchedulesObj.execute(studyclassid);
    }

    /**
     * Find all schedules of a class with provided id.
     * @param {String} teacherId 
     */
    async findTeacherSchedules(teacherId) {
        return await this._findTeacherSchedulesObj.execute(teacherId);
    }
}