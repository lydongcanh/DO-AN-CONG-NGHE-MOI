import express from "express";
import uuidv1 from "uuid/v1";
import {ATSC_TABLE_NAME, REGION, ENDPOINT} from "../dynamodb-config";
import Studyclass from "../entities/studyclass";
import StudyclassAdapter from "../use_cases/studyclasses/studyclass-adpater";

const router = express.Router();
const studyclassAdapter = new StudyclassAdapter(ATSC_TABLE_NAME, REGION, ENDPOINT);

router.get("/", async (request, response, _) => {
    const result = await studyclassAdapter.getAllStudyclasses();
    response.send(result);
});

router.get("/:id", async (request, response, _) => {
    const studyclassId = request.params.id;
    const result = await studyclassAdapter.getStudyclassById(studyclassId);
    response.send(result);
});

router.post("/", async (request, response, _) => {
    const id = uuidv1();
    const {name, grade} = request.body;
    const studyclass = new Studyclass(id, name, String(grade));
    const result = await studyclassAdapter.createStudyclass(studyclass);
    response.send(result);
});

router.delete("/:id", async (request, response, _) => {
    const id = request.params.id;
    const result = await studyclassAdapter.deleteStudyclass(id);
    response.send(result);
});

export default router;
