import axios from "axios";
import { studyclassesEndpoint } from "./endpoints";

class StudyclassRepository {
    async createStudyclass(name, grade, startYear, endYear, state, studentIds) {
        try {
            const studyclass = {
                name: name,
                grade: grade,
                startYear: startYear,
                endYear: endYear,
                state: state,
                studentIds: studentIds
            };

            const result = await axios.post(studyclassesEndpoint, studyclass);
            return result.data.success ? result.body : { error: result.data.error };
        } catch (error) {
            return { error: error };
        }
    }

    async getAllStudyclasses() {
        try {
            const result = await axios.get(studyclassesEndpoint);
            return result.data.success ? result.data.body.Items : { error: result.data.error };
        } catch (error) {
            return { error: error };
        }
    }

    async getStudyclassById(id) {
        try {
            const result = await axios.get(`${studyclassesEndpoint}/${id}`);
            if (!result.data.success)
                return { error: result.data.error };

            if (result.data.body.Items.length < 1)
                return { error: "NotFound" };

            const studyclass = result.data.body.Items[0];
            return {
                id: studyclass.sortKey,
                grade: studyclass.data,
                name: studyclass.name,
                startYear: studyclass.startYear,
                endYear: studyclass.endYear,
                state: studyclass.state,
                studentIds: studyclass.studentIds
            };
        } catch (error) {
            return { error: error };
        }
    }
}

const studyclassRepository = new StudyclassRepository();
export default studyclassRepository;