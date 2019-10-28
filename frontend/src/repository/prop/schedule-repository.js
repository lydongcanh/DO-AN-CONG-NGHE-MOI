import axios from "axios";
import { schedulesEndpoint } from "./endpoints";

class ScheduleRepository {
    async createSchedule(classId, teacherId, startDate, endDate, startTime, length, state, subject) {
        try {
            let schedule = {
                classId: classId,
                teacherId: teacherId,
                startDate: startDate,
                endDate: endDate,
                startTime: startTime,
                length: length,
                state: state,
                subject: subject
            };

            const result = await axios.post(schedulesEndpoint, schedule);
            if (!result.data.success)
                return result.data.error;

            schedule.id = result.data.body.sortKey;
            schedule.classId = result.data.body.data;
            return schedule;
        } catch (error) {
            return { error: error.message };
        }
    }

    async deleteSchedule(id) {
        try {
            const result = await axios.delete(`${schedulesEndpoint}/${id}`);
            return result.data.success ? result.body : { error: result.data.error };
        } catch (error) {
            return { error: error };
        }
    }

    async updateSchedule(schedule) {
        try {
            const result = await axios.patch(`${schedulesEndpoint}/${schedule.id}`, schedule);
            return result.data.success ? result.body : { error: result.data.error };
        } catch (error) {
            return { error: error };
        }
    }

    async getAllSchedules() {
        try {
            const result = await axios.get(schedulesEndpoint);
            if (!result.data.success)
                return { error: result.data.error };

            for (let i = 0; i < result.data.body.Items.length; i++) {
                result.data.body.Items[i].id = result.data.body.Items[i].sortKey;
                result.data.body.Items[i].classId = result.data.body.Items[i].data;
            }

            return result.data.body.Items;
        } catch (error) {
            return { error: error };
        }
    }

    async getScheduleById(id) {
        try {
            const result = await axios.get(`${schedulesEndpoint}/${id}`);
            if (!result.data.success)
                return result.data.error;

            if (result.data.body.Items.length < 1)
                return { error: "NotFound" };

            const schedule = result.data.body.Items[0];
            return {
                id: schedule.sortKey,
                classId: schedule.data,
                teacherId: schedule.teacherId,
                startDate: schedule.startDate,
                endDate: schedule.endDate,
                startTime: schedule.startTime,
                length: schedule.length,
                state: schedule.state,
                subject: schedule.subject
            };
        } catch (error) {
            return { error: error };
        }
    }

    async getSchedulesByClassId(classId) {
        const result = await this.getAllSchedules();
        if (result.error)
            return result;

        return result.filter(schedule => schedule.classId == classId);
    }

    async getSchedulesByTeacherId(teacherId) {
        const result = await this.getAllSchedules();
        if (result.error)
            return result;

        return result.filter(schedule => schedule.teacherId == teacherId);
    }
}

const scheduleRepository = new ScheduleRepository();
export default scheduleRepository;