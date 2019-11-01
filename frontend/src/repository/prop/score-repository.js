import axios from "axios";
import { scoresEndpoint } from "./endpoints";

class ScoreRepository {
    cachedValues = [];
    refeshCachedValues = false;

    async createScore(type, value, subject, multiplier, scoreboardId) {
        try {
            let score = {
                type: type,
                value: value,
                subject: subject,
                multiplier: multiplier,
                scoreboardId: scoreboardId
            };

            const result = await axios.post(scoresEndpoint, score);
            if (!result.data.success)
                return result.data.error;

            score.id = result.data.body.sortKey;
            score.type = result.data.body.data;
            this.refeshCachedValues = true;
            return score;
        } catch (error) {
            return { error: error.message };
        }
    }

    async deleteScore(id) {
        try {
            const result = await axios.delete(`${scoresEndpoint}/${id}`);
            this.refeshCachedValues = true;
            return result.data.success ? result.data.body : { error: result.data.error };
        } catch (error) {
            return { error: error };
        }
    }

    async updateScore(score) {
        try {
            const result = await axios.patch(`${scoresEndpoint}/${score.id}`, score);
            this.refeshCachedValues = true;
            return result.data.success ? result.data.body : { error: result.data.error };
        } catch (error) {
            return { error: error };
        }
    }

    async getAllScores() {
        if (!this.refeshCachedValues && this.cachedValues && this.cachedValues.length > 0)
            return this.cachedValues;

        try {
            const result = await axios.get(scoresEndpoint);
            
            if (!result.data.success)
                return { error: result.data.error };

            for (let i = 0; i < result.data.body.Items.length; i++) {
                result.data.body.Items[i].id = result.data.body.Items[i].sortKey;
                result.data.body.Items[i].type = result.data.body.Items[i].data;
            }

            this.cachedValues = result.data.body.Items;
            this.refeshCachedValues = false;
            return result.data.body.Items;
        } catch (error) {
            return { error: error };
        }
    }

    async getScoreById(id) {
        try {
            const result = await axios.get(`${scoresEndpoint}/${id}`);
            if (!result.data.success)
                return result.data.error;

            if (result.data.body.Items.length < 1)
                return { error: "NotFound" };

            const score = result.data.body.Items[0];
            return {
                id: score.sortKey,
                type: score.data,
                value: score.value,
                subject: score.subject,
                multiplier: score.multiplier,
                scoreboardId: score.scoreboardId
            };
        } catch (error) {
            return { error: error };
        }
    }

    async getScoreByScoreboardId(scoreboardId) {
        const result = await this.getAllScores();
        if (result.error)
            return result;

        const p = result.filter(score => String(score.scoreboardId) == String(scoreboardId));

        return p;
    }
}

const scoreRepository = new ScoreRepository();
export default scoreRepository;