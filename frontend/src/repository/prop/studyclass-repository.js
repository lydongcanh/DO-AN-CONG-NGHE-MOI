import axios from "axios";
import { studyclassesEndpoint } from "./endpoints";

class StudyclassRepository {
    async createStudyclass(name, grade) {
        try {
            let studyclass = {
                name: name,
                grade: grade,
            };

            const result = await axios.post(studyclassesEndpoint, studyclass);
            if (!result.data.success)
                return result.data.error;

            studyclass.id = result.data.body.sortKey;
            studyclass.grade = result.data.body.data;
            return studyclass;
        } catch (error) {
            return { error: error.message };
        }
    }

    async getAllStudyclasses() {
        try {
            const result = await axios.get(studyclassesEndpoint);
            if (!result.data.success)
                return { error: result.data.error };

            for (let i = 0; i < result.data.body.Items.length; i++) {
                result.data.body.Items[i].id = result.data.body.Items[i].sortKey;
                result.data.body.Items[i].grade = result.data.body.Items[i].data;
            }

            return result.data.body.Items;
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
            };
        } catch (error) {
            return { error: error };
        }
    }

    async getStudyclassByGrade(grade) {
        const result = await this.getAllStudyclasses();
        if (result.error)
            return result;

        return result.filter(stutyclass => stutyclass.grade == grade);
    }

    async getStudyclassByGradeAndName(grade, name) {
        const result = await this.getAllStudyclasses();
        if (result.error)
            return result;

        return result.filter(studyclass => {
            return studyclass.grade == grade && studyclass.name == name;
        });
    }
}

const studyclassRepository = new StudyclassRepository();
export default studyclassRepository;