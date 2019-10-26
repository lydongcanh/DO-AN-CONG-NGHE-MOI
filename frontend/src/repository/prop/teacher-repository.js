import axios from "axios";
import {teachersEndpoint} from "./endpoints";

class TeacherRepository {
    async createTeacher(name, gender, birthday, address, email, phoneNumber, state) {
        try {
            const teacher = {
                name: name,
                gender: gender,
                birthday: birthday,
                address: address,
                phoneNumber: phoneNumber,
                email: email,
                state: state,
            };

            const result = axios.post(teachersEndpoint, teacher);
            return result.data.success ? result.body : { error: result.data.error };
        } catch (error) {
            return { error: error };
        }
    }

    async getAllTeachers() {
        try {
            const result = await axios.get(teachersEndpoint);
            return result.data.success ? result.data.body.Items : { error: result.data.error }
        } catch (error) {
            return { error: error };
        }
    }

    async getTeacherById(id) {
        try {
            const result = await axios.get(`${teachersEndpoint}/${id}`);
            if (!result.data.success)
                return result.data.error;

            if (result.data.body.Items.length < 1)
                return { error: "NotFound" };

            const teacher = result.data.body.Items[0];
            return {
                id: teacher.sortKey,
                name: teacher.data,
                gender: teacher.gender,
                birthday: teacher.birthday,
                address: teacher.address,
                phoneNumber: teacher.phoneNumber,
                state: teacher.state
            };
        } catch (error) {
            return { error: error };
        }
    }

    async getTeachersByName(name) {
        const result = await this.getAllTeachers();
        if (result.error)
            return result;

        return result.filter(teacher => teacher.name.include(name));
    }
}

const teacherRepository = new TeacherRepository();
export default teacherRepository;