import express from "express";
import uuidv1 from "uuid/v1";
import { SSS_TABLE_NAME, REGION, ENDPOINT } from "../dynamodb-config";
import Scoreboard from "../entities/scoreboard";
import ScoreboardAdapter from "../use_cases/scoreboards/scoreboard-adapter";

const router = express.Router();
const scoreboardAdapter = new ScoreboardAdapter(SSS_TABLE_NAME, REGION, ENDPOINT);

router.get("/", async (request, response, _) => {
    const studentId = request.query.studentId;
    if (studentId) {
        const result = scoreboardAdapter.findScoreboardByStudentId(studentId);
        response.send(result);
    } else {
        // TODO: send all available accounts instead.
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
    const {semester, year, studentId} = request.body;
    const id = uuidv1();
    const scoreboard = new Scoreboard(id, semester, year, studentId);
    const result = scoreboardAdapter.createScoreBoard(scoreboard);
    response.send(result);
});

export default router;
