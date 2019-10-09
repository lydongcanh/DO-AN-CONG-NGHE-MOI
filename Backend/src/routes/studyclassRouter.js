import express from "express";
import uuidv1 from "uuid/v1";
import {TABLE_NAME, REGION, ENDPOINT} from "../dynamodb-config";
import Studyclass from "../entities/studyclass";
import StudyclassAdapter from "../use_cases/studyclasses/studyclass-adpater";

const router = express.Router();
const studyclassAdapter = new StudyclassAdapter(TABLE_NAME, REGION, ENDPOINT);

router.get("/", async (request, response, _) => {
    const grade = request.query.grade;
    if (grade) {
        const result = studyclassAdapter.findStudyclassWithGrade(grade);
        response.send(result);
    } else {
        // TODO: return all available studyclasses instead.
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
    const {name, grade, state} = request.body;
    const studyclass = new Studyclass(id, name, grade, state);
    const result = studyclassAdapter.createStudyclass(studyclass);
    response.send(result);
});

module.exports = router;