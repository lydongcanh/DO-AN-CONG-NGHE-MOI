import express from "express";
import { SSS_TABLE_NAME, REGION, ENDPOINT } from "../dynamodb-config";
import uuidv1 from "uuid/v1";
import Student from "../entities/student";
import StudentAdapter from "../use_cases/students/student-adapter";

const router = express.Router();
const studentAdapter = new StudentAdapter(SSS_TABLE_NAME, REGION, ENDPOINT);

router.get("/", async (request, response, _) => {
    const result = await studentAdapter.getAllStudents();
    response.send(result);
});

router.get("/:id", async (request, response, _) => {
    const studentId = request.params.id;
    const result = await studentAdapter.getStudentById(studentId);
    response.send(result);
});

router.post("/", async (request, response, _) => {
    const id = uuidv1();
    const { name, gender, birthday, address, phoneNumber, state, classId } = request.body;
    const student = new Student(id, name, gender, birthday, address, phoneNumber, state, classId);
    const result = await studentAdapter.createStudent(student);
    response.send(result);
});

export default router;
