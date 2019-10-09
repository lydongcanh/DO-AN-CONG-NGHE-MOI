import express from "express";
import {TABLE_NAME, REGION, ENDPOINT} from "../dynamodb-config";
import uuidv1 from "uuid/v1";
import Teacher from "../entities/teacher";
import TeacherAdapter from "../use_cases/teachers/teacher-adapter";

const router = express.Router();
const teacherAdapter = new TeacherAdapter(TABLE_NAME, REGION, ENDPOINT);

router.get("/", async (request, response, _) => {
    const accountId = request.query.accountId;
    if (accountId) {
        const result = teacherAdapter.findTeacherWithAccount(accountId);
        response.send(result);
    } else {
        // TODO: send all available teachers.
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
    const {name, gender, birthday, address, email, phoneNumber, state, accountId} = request.body;
    const teacher = new Teacher(id, name, gender, birthday, address, email, phoneNumber, state, accountId);
    const result = teacherAdapter.createTeacher(teacher);
    response.send(result);
});

module.exports = router;
