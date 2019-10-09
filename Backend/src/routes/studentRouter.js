import express from "express";
import { TABLE_NAME, REGION, ENDPOINT } from "../dynamodb-config";
import uuidv1 from "uuid/v1";
import Student from "../entities/student";
import StudentAdapter from "../use_cases/students/student-adapter";

const router = express.Router();
const studentAdapter = new StudentAdapter(TABLE_NAME, REGION, ENDPOINT);

router.get("/", async (request, response, _) => {
    const {classId, studentName} = request.query;
    if (classId) {
        const result = await studentAdapter.findStudentWithClass(classId);
        response.send(result);
    } else if (studentName) {
        const result = await studentAdapter.findStudentWithName(studentName);
        response.send(result);
    } else {
        // TODO: send all available students.
        response.send({
            isSuccess: false,
            error: {
                message: "unsupported query",
                statusCode: 405
            }
        });
    }
});

router.post("/", async (request, response, _) => {
    const id = uuidv1();
    const { name, gender, birthday, address, phoneNumber, state, classId } = request.body;
    const student = new Student(id, name, gender, birthday, address, phoneNumber, state, classId);
    const result = studentAdapter.createStudent(student);
    response.send(result);
});

export default router;
