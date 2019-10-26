import axios from "axios";
import {scoreboardsEndpoint} from "./endpoints";

class ScoreboardRepository {
    async createScoreboard(semester, year, studentId) {
        try {
            const scoreboard = {
                semester: semester,
                year: year,
                studentId: studentId
            };

            const result = await axios.post(scoreboard);
            return result.data.success ? scoreboard : result.data.error;
        } catch (error) {
            return {error: error};
        }
    }

    async getAllScoreboards() {
        try {
            const result = await axios.get(scoreboardsEndpoint);
            return result.data.success ? result.data.body.Items : { error: result.data.error };
        } catch (error) {
            return {error: error};
        }
    }

    async getScoreboardById(id) {
        try {
            const result = await axios.get(`${scoreboardsEndpoint}/${id}`);
            if (!result.data.success)
                return result.data.error;
            
            if (result.data.body.Items.length < 1)
                return {error: "NotFound"};

            const scoreboard = result.data.body.Items[0];
            return {
                id: scoreboard.sortKey,
                semester: scoreboard.data,
                year: scoreboard.year,
                studentId: scoreboard.studentId
            };
        } catch (error) {
            return {error: error};
        }
    }

    async getScoreboardsByStudentId(studentId) {
        const result = await this.getAllScoreboards();
        if (result.error)
            return result;
        
        return result.filter(scoreboard => scoreboard.studentId == studentId);
    }
}

const scoreboardRepository = new ScoreboardRepository();
export default scoreboardRepository;
