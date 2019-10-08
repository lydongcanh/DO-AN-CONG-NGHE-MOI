import express from "express";
import uuidv1 from "uuid/v1";
import { TABLE_NAME, REGION, ENDPOINT } from "../dynamodb-config";
import Score from "../entities/score";
import ScoreAdapter from "../use_cases/scores/score-adapter";

const router = express.Router();
const scoreAdapter = new ScoreAdapter(TABLE_NAME, REGION, ENDPOINT);

router.post("/create", async (request, response, _) => {
    const id = uuidv1();
    const { type, value, subjectId, scoreboardId } = request.body;
    const score = new Score(id, type, value, subjectId, scoreboardId);
    const result = scoreAdapter.createScore(score);
    response.send(result);
});

router.get("/scoreboard/:scoreboardId", async (request, response, _) => {
    const scoreboardId = request.params.scoreboardId;
    const result = scoreAdapter.findScoresByScoreboardID(scoreboardId);
    response.send(result);
});

module.exports = router;
