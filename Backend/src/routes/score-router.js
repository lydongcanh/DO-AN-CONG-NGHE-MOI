import express from "express";
import uuidv1 from "uuid/v1";
import { SSS_TABLE_NAME, REGION, ENDPOINT } from "../dynamodb-config";
import Score from "../entities/score";
import ScoreAdapter from "../use_cases/scores/score-adapter";

const router = express.Router();
const scoreAdapter = new ScoreAdapter(SSS_TABLE_NAME, REGION, ENDPOINT);

router.get("/", async (request, response, _) => {
    const scoreboardId = request.query.scoreboardId;
    if (scoreboardId) {
        const result = scoreAdapter.findScoresByScoreboardID(scoreboardId);
        response.send(result);
    } else {
        // TODO: send all available scores instead.
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
    const { type, value, subjectId, scoreboardId } = request.body;
    const score = new Score(id, type, value, subjectId, scoreboardId);
    const result = scoreAdapter.createScore(score);
    response.send(result);
});

export default router;
