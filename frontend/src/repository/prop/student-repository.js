import axios from "axios";
import { studentsEndpoint } from "./endpoints";

class StudentRepository {
    async createStudent(name, gender, birthday, address, phoneNumber, state, classId) {
        try {
            const student = {
                name: name,
                gender: gender,
                birthday: birthday,
                address: address,
                phoneNumber: phoneNumber,
                state: state,
                classId: classId
            };

            const result = axios.post(studentsEndpoint, student);
            return result.data.success ? result.body : { error: result.data.error };
        } catch (error) {
            return { error: error };
        }
    }

    async getAllStudents() {
        try {
            const result = await axios.get(studentsEndpoint);
            return result.data.success ? result.data.body.Items : { error: result.data.error }
        } catch (error) {
            return { error: error };
        }
    }

    async getStudentById(id) {
        try {
            const result = await axios.get(`${studentsEndpoint}/${id}`);
            if (!result.data.success)
                return result.data.error;

            if (result.data.body.Items.length < 1)
                return { error: "NotFound" };

            const student = result.data.body.Items[0];
            return {
                id: student.sortKey,
                classId: student.data,
                name: student.name,
                gender: student.gender,
                birthday: student.birthday,
                address: student.address,
                phoneNumber: student.phoneNumber,
                state: student.state
            };
        } catch (error) {
            return { error: error };
        }
    }

    async getStudentsByName(name) {
        const result = await this.getAllStudents();
        if (result.error)
            return result;

        return result.filter(student => student.name.includes(name));
    }

    async getStudentsByClassId(classId) {
        const result = await this.getAllStudents();
        if (result.error)
            return result;

        return result.filter(student => student.classId == classId);
    }
}

const studentRepository = new StudentRepository();
export default studentRepository;