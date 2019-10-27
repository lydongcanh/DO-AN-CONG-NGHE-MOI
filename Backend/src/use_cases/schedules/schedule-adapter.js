import CreateSchedule from "./create-schedule";
import GetAllSchedules from "./get-all-schedules";
import GetScheduleById from "./get-schedule-by-id";
import DeleteSchedule from "./delete-schedule";

export default class ScheduleAdapter {
    constructor(tableName, region, endpoint) {
        this._createScheduleObj = new CreateSchedule(tableName, region, endpoint);
        this._getAllSchedulesObj = new GetAllSchedules(tableName, region, endpoint);
        this._getScheduleByIdObj = new GetScheduleById(tableName, region, endpoint);
        this._deleteScheduleObj = new DeleteSchedule(tableName, region, endpoint);
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

    /** Get schedule with its id. */
    async getScheduleById(scheduleId) {
        return await this._getScheduleByIdObj.execute(scheduleId);
    }

    async deleteSchedule(id) {
        return await this._deleteScheduleObj.execute(id);
    }
}