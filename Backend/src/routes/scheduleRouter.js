import express from "express";
import dynamoConfig from "../dynamodb-config";
import Schedule from "../entities/schedule";
import ScheduleAdapter from "../use_cases/schedules/schedule-adapter";

const router = express.Router();
const scheduleAdapter = new ScheduleAdapter(dynamoConfig.TABLE_NAME, dynamoConfig.REGION, dynamoConfig.ENDPOINT);

router.post("/create", async (request, response, _) => {
    const {id, time, classId, teacherId, subjectId} = request.body;
    const schedule = new Schedule(id, time, state, classId, teacherId, subjectId);
    const result = await scheduleAdapter.createSchedule(schedule);
    response.send(result);
});

router.get("/teacher/:teacherId", async (request, response, _) => {
    const teacherId = request.params.teacherId;
    const result = await scheduleAdapter.findTeacherSchedules(teacherId);
    response.send(result);
});

router.get("/student/:studyclassId", async (request, response, _) => {
    const studyclassId = request.params.studyclassId;
    const result = await scheduleAdapter.findStudyclassSchedules(studyclassId);
    response.send(result);
});

module.exports = router;
