import express from "express";
import uuidv1 from "uuid/v1";
import { ATSC_TABLE_NAME, REGION, ENDPOINT } from "../dynamodb-config";
import Schedule from "../entities/schedule";
import ScheduleAdapter from "../use_cases/schedules/schedule-adapter";

const router = express.Router();
const scheduleAdapter = new ScheduleAdapter(ATSC_TABLE_NAME, REGION, ENDPOINT);

router.get("/", async (request, response, _) => {
    // const {teacherId, studyclassId} = request.query;
    // if (teacherId) {
    //     const result = await scheduleAdapter.findTeacherSchedules(teacherId);
    //     response.send(result);
    // } else if (studyclassId) {
    //     const result = await scheduleAdapter.findStudyclassSchedules(studyclassId);
    //     response.send(result);
    // } else {
    const result = await scheduleAdapter.getAllSchedules();
    response.send(result);
    //}
});

router.get("/:id", async (request, response, _) => {
    const scheduleId = request.params.id;
    const result = await scheduleAdapter.getScheduleById(scheduleId);
    response.send(result);
});

router.post("/", async (request, response, _) => {
    const {time, semester, state, subject, teacherId, classId} = request.body;
    const id = uuidv1();
    const schedule = new Schedule(id, semester, time, state, subject, teacherId, classId);
    const result = await scheduleAdapter.createSchedule(schedule);
    response.send(result);
});

router.delete("/:id", async (request, response, _) => {
    const id = request.params.id;
    const result = await scheduleAdapter.deleteSchedule(id);
    response.send(result);
});

router.patch("/:id", async (request, response, _) => {
    const {id, semester, time, state, subject, teacherId, classId} = request.body;
    const schedule = new Schedule(id, semester, time, state, subject, teacherId, classId);
    const result = await scheduleAdapter.updateSchedule(schedule);
    response.send(result);
});

export default router;
