import express from "express";
import { ATSC_TABLE_NAME, REGION, ENDPOINT } from "../dynamodb-config";
import uuidv1 from "uuid/v1";
import Teacher from "../entities/teacher";
import TeacherAdapter from "../use_cases/teachers/teacher-adapter";

const router = express.Router();
const teacherAdapter = new TeacherAdapter(ATSC_TABLE_NAME, REGION, ENDPOINT);

router.get("/", async (request, response, _) => {
    const result = await teacherAdapter.getAllTeachers();
    response.send(result);
});

router.get("/:id", async (request, response, _) => {
    const teacherId = request.params.id;
    const result = await teacherAdapter.getTeacherById(teacherId);
    response.send(result);
});

router.post("/", async (request, response, _) => {
    const id = uuidv1();
    const { name, gender, subject, birthday, address, email, phoneNumber, state } = request.body;
    const teacher = new Teacher(id, name, gender, subject, birthday, address, email, phoneNumber, state);
    const result = await teacherAdapter.createTeacher(teacher);
    response.send(result);
});

router.delete("/:id", async (request, response, _) => {
    const id = request.params.id;
    const result = await teacherAdapter.deleteTeacher(id);
    response.send(result);
});

router.patch("/:id", async (request, response, _) => {
    const { id, name, gender, subject, birthday, address, email, phoneNumber, state } = request.body;
    const teacher = new Teacher(id, name, gender, subject, birthday, address, email, phoneNumber, state);
    const result = await teacherAdapter.updateTeacher(teacher);
    response.send(result);
});

export default router;
