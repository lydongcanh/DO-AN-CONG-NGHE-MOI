import express from "express";
import uuidv1 from "uuid/v1";
import { TABLE_NAME, REGION, ENDPOINT } from "../dynamodb-config";
import Schedule from "../entities/schedule";
import ScheduleAdapter from "../use_cases/schedules/schedule-adapter";

const router = express.Router();
const scheduleAdapter = new ScheduleAdapter(TABLE_NAME, REGION, ENDPOINT);

router.get("/", async (request, response, _) => {
    const {teacherId, studyclassId} = request.query;
    if (teacherId) {
        const result = await scheduleAdapter.findTeacherSchedules(teacherId);
        response.send(result);
    } else if (studyclassId) {
        const result = await scheduleAdapter.findStudyclassSchedules(studyclassId);
        response.send(result);
    } else {
        // TODO: send all available schedules instead.
        response.send({
            isSuccess: false,
            error: {
                message: "un-supported query",
                statusCode: 405
            }
        });
    }
});

router.post("/", async (request, response, _) => {
    const {time, classId, teacherId, subjectId} = request.body;
    const id = uuidv1();
    const schedule = new Schedule(id, time, state, classId, teacherId, subjectId);
    const result = await scheduleAdapter.createSchedule(schedule);
    response.send(result);
});

module.exports = router;
