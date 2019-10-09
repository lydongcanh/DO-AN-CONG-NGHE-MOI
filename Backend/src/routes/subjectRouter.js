import express from "express";
import {TABLE_NAME, REGION, ENDPOINT} from "../dynamodb-config";
import uuidv1 from "uuid/v1";
import Subject from "../entities/subject";
import SubjectAdapter from "../use_cases/subjects/subject-adapter";

const router = express.Router();
const subjectAdapter = new SubjectAdapter(TABLE_NAME, REGION, ENDPOINT);

router.get("/", async (request, response, _) => {
    const subjectId = request.query.subjectId;
    if (subjectId) {
        const result = subjectAdapter.findSubjectById(subjectId);
        response.send(result);
    } else {
        const result = subjectAdapter.getAllSubjects();
        response.send(result);
    }
});

router.post("/", async (request, response, _) => {
    const id = uuidv1();
    const name = request.body.name;
    const subject = new Subject(id, name);
    const result = subjectAdapter.createSubject(subject);
    response.send(result);
});

export default router;
