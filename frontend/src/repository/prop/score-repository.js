import axios from "axios";
import { scoresEndpoint } from "./endpoints";

class ScoreRepository{
    async createScore(type, value, subject, multiplier, scoreboardId) {
        try {
            const score = {
                type: type,
                value: value,
                subject: subject,
                multiplier: multiplier,
                scoreboardId: scoreboardId
            };

            const result = await axios.post(scoresEndpoint, score);
            return result.data.success ? score : {error: result.data.error};
        } catch (error) {
            return {error: error};
        }
    }

    async getAllScores() {
        try {
            const result = await axios.get(scoresEndpoint);
            return result.data.success ? result.data.body.Items : {error: result.data.error};
        } catch (error) {
            return {error: error};
        }
    }

    async getScoreById(id) {
        try {
            const result = await axios.get(`${scoresEndpoint}/${id}`);
            if (!result.data.success)
                return result.data.error;

            if (result.data.body.Items.length < 1)
                return {error: "NotFound"};

            const score = result.data.body.Items[0];
            return {
                id: score.sortKey,
                type: score.data,
                value: score.value,
                subject: score.subject,
                multiplier: score.multiplier,
                scoreboardId: score.scoreboardId
            };
        } catch(error) {
            return {error: error};
        }
    }

    async getScoreByScoreboardId(scoreboardId) {
        const result = await this.getAllScores();
        if (result.error)
            return result;
        
        return result.filter(score => score.scoreboardId == scoreboardId);
    }
}

const scoreRepository = new ScoreRepository();
export default scoreRepository;