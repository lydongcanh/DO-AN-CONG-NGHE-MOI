import axios from "axios";
import { scoreboardsEndpoint } from "./endpoints";

class ScoreboardRepository {
    async createScoreboard(semester, year, studentId) {
        try {
            let scoreboard = {
                semester: semester,
                year: year,
                studentId: studentId
            };

            const result = await axios.post(scoreboardsEndpoint, scoreboard);
            if (!result.data.success)
                return result.data.error;

            scoreboard.id = result.data.body.sortKey;
            scoreboard.semester = result.data.body.data;
            return scoreboard;
        } catch (error) {
            return { error: error.message };
        }
    }

    async deleteScoreboard(id) {
        try {
            const result = await axios.delete(`${scoreboardsEndpoint}/${id}`);
            return result.data.success ? result.body : { error: result.data.error };
        } catch (error) {
            return { error: error };
        }
    }

    async getAllScoreboards() {
        try {
            const result = await axios.get(scoreboardsEndpoint);
            if (!result.data.success)
                return { error: result.data.error };

            for (let i = 0; i < result.data.body.Items.length; i++) {
                result.data.body.Items[i].id = result.data.body.Items[i].sortKey;
                result.data.body.Items[i].semester = result.data.body.Items[i].data;
            }

            return result.data.body.Items;
        } catch (error) {
            return { error: error };
        }
    }

    async getScoreboardById(id) {
        try {
            const result = await axios.get(`${scoreboardsEndpoint}/${id}`);
            if (!result.data.success)
                return result.data.error;

            if (result.data.body.Items.length < 1)
                return { error: "NotFound" };

            const scoreboard = result.data.body.Items[0];
            return {
                id: scoreboard.sortKey,
                semester: scoreboard.data,
                year: scoreboard.year,
                studentId: scoreboard.studentId
            };
        } catch (error) {
            return { error: error };
        }
    }

    async getScoreboardsByStudentId(studentId) {
        const result = await this.getAllScoreboards();
        if (result.error)
            return result;

        return result.filter(scoreboard => String(scoreboard.studentId) == String(studentId));
    }
}

const scoreboardRepository = new ScoreboardRepository();
export default scoreboardRepository;
