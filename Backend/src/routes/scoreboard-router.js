import express from "express";
import uuidv1 from "uuid/v1";
import { SSS_TABLE_NAME, REGION, ENDPOINT } from "../dynamodb-config";
import Scoreboard from "../entities/scoreboard";
import ScoreboardAdapter from "../use_cases/scoreboards/scoreboard-adapter";

const router = express.Router();
const scoreboardAdapter = new ScoreboardAdapter(SSS_TABLE_NAME, REGION, ENDPOINT);

router.get("/", async (request, response, _) => {
    const result = await scoreboardAdapter.getAllScoreboards();
    response.send(result);
});

router.get("/:id", async (request, response, _) => {
    const scoreboardId = request.params.id;
    const result = await scoreboardAdapter.getScoreboardById(scoreboardId);
    response.send(result);
});

router.post("/", async (request, response, _) => {
    const {semester, grade, studentId} = request.body;
    const id = uuidv1();
    const scoreboard = new Scoreboard(id, String(semester), grade, studentId);
    const result = await scoreboardAdapter.createScoreBoard(scoreboard);
    response.send(result);
});

router.delete("/:id", async (request, response, _) => {
    const id = request.params.id;
    const result = await scoreboardAdapter.deleteScoreboard(id);
    response.send(result);
});

export default router;
