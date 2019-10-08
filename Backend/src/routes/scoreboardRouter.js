import express from "express";
import uuidv1 from "uuid/v1";
import { TABLE_NAME, REGION, ENDPOINT } from "../dynamodb-config";
import Scoreboard from "../entities/scoreboard";
import ScoreboardAdapter from "../use_cases/scoreboards/scoreboard-adapter";

const router = express.Router();
const scoreboardAdapter = new ScoreboardAdapter(TABLE_NAME, REGION, ENDPOINT);

router.post("/create", async (request, response, _) => {
    const {semester, year, studentId} = request.body;
    const id = uuidv1();
    const scoreboard = new Scoreboard(id, semester, year, studentId);
    const result = scoreboardAdapter.createScoreBoard(scoreboard);
    response.send(result);
});

router.get("/student/:studentId", async (request, response, _) => {
    const studentId = request.params.studentId;
    const result = scoreboardAdapter.findScoreboardByStudentId(studentId);
    response.send(result);
});

module.exports = router;