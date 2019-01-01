import CreateSchedule from "./create-schedule";
import FindStudyclassSchedules from "./find-studyclass-schedules";
import FindTeacherSchedules from "./find-teacher-schedules";

export default class ScheduleAdapter {
    constructor(tableName, region, endpoint) {
        this.createScheduleObj = new CreateSchedule(tableName, region, endpoint);
        this.findStudyclassSchedulesObj = new FindStudyclassSchedules(tableName, region, endpoint);    
        this.findTeacherSchedulesObj = new FindTeacherSchedules(tableName, region, endpoint);   
    }

    /**
     * Create new schedule.
     * @param {Schedule} schedule 
     */
    async createSchedule(schedule) {
        return await this.createScheduleObj.execute(schedule);
    }

    /**
     * Find all schedules of a studyclass with prodided id.
     * @param {String} studyclassid 
     */
    async findStudyclassSchedules(studyclassid) {
        return await this.findStudyclassSchedulesObj.execute(studyclassid);
    }

    /**
     * Find all schedules of a class with provided id.
     * @param {String} teacherId 
     */
    async findTeacherSchedules(teacherId) {
        return await this.findTeacherSchedulesObj.execute(teacherId);
    }
}