import axios from "axios";
import { studentsEndpoint } from "./endpoints";

class StudentRepository {
    async createStudent(name, gender, grade, birthday, address, phoneNumber, state, classId) {
        try {
            let student = {
                name: name,
                gender: gender,
                grade: grade,
                birthday: birthday,
                address: address,
                phoneNumber: phoneNumber,
                state: state,
                classId: classId
            };

            const result = await axios.post(studentsEndpoint, student);
            if (!result.data.success)
                return result.data.error;

            student.id = result.data.body.sortKey;
            student.classId = result.data.body.data;
            return student;
        } catch (error) {
            return { error: error.message };
        }
    }

    async getAllStudents() {
        try {
            const result = await axios.get(studentsEndpoint);
            if (!result.data.success)
                return { error: result.data.error };

            for (let i = 0; i < result.data.body.Items.length; i++) {
                result.data.body.Items[i].id = result.data.body.Items[i].sortKey;
                result.data.body.Items[i].classId = result.data.body.Items[i].data;
            }

            return result.data.body.Items;
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
                grade: student.grade,
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

    async getStudentsByGrade(grade) {
        const result = await this.getAllStudents();
        if (result.error)
            return result;

        return result.filter(student => student.grade == grade);
    }
}

const studentRepository = new StudentRepository();
export default studentRepository;