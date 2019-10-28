import express from "express";
import uuidv1 from "uuid/v1";
import { SSS_TABLE_NAME, REGION, ENDPOINT } from "../dynamodb-config";
import Score from "../entities/score";
import ScoreAdapter from "../use_cases/scores/score-adapter";

const router = express.Router();
const scoreAdapter = new ScoreAdapter(SSS_TABLE_NAME, REGION, ENDPOINT);

router.get("/", async (request, response, _) => {
    const result = await scoreAdapter.getAllScores();
    response.send(result);
});

router.get("/:id", async (request, response, _) => {
    const scoreId = request.params.id;
    const result = await scoreAdapter.getScoreById(scoreId);
    response.send(result);
});

router.post("/", async (request, response, _) => {
    const id = uuidv1();
    const { type, value, subject, multiplier, scoreboardId } = request.body;
    const score = new Score(id, type, value, subject, multiplier, scoreboardId);
    const result = await scoreAdapter.createScore(score);
    response.send(result);
});

router.delete("/:id", async (request, response, _) => {
    const id = request.params.id;
    const result = await scoreAdapter.deleteScore(id);
    response.send(result);
});

router.patch("/:id", async (request, response, _) => {
    const { id, type, value, subject, multiplier, scoreboardId } = request.body;
    const score = new Score(id, type, value, subject, multiplier, scoreboardId);
    const result = await scoreAdapter.updateScore(score);
    response.send(result);
});

export default router;
