
export default class MockDB {
    classes = [
        {
            "id": 0,
            "name": "10A",
            "grade": 10,
            "state": "active"
        },
        {
            "id": 1,
            "name": "10B",
            "grade": 10,
            "state": "active"
        },
        {
            "id": 2,
            "name": "11A",
            "grade": 11,
            "state": "active"
        },
        {
            "id": 3,
            "name": "11B",
            "grade": 11,
            "state": "active"
        },
        {
            "id": 4,
            "name": "12A",
            "grade": 12,
            "state": "active"
        },
        {
            "id": 5,
            "name": "12A",
            "grade": 12,
            "state": "active"
        },
    ];

    students = [
        {
            "id": 0,
            "name": "Lorem ipsum dolor sir amet",
            "gender": "Nam",
            "birthday": Date.now(),
            "address": "Lorem ipsum dolor sir amet",
            "phoneNumber": "0123456789",
            "state": "active",
            "classId": 1
        },
        {
            "id": 1,
            "name": "Lorem ipsum dolor sir amet",
            "gender": "Nam",
            "birthday": Date.now(),
            "address": "Lorem ipsum dolor sir amet",
            "phoneNumber": "0123456789",
            "state": "active",
            "classId": 1
        },
        {
            "id": 2,
            "name": "Lorem ipsum dolor sir amet",
            "gender": "Nam",
            "birthday": Date.now(),
            "address": "Lorem ipsum dolor sir amet",
            "phoneNumber": "0123456789",
            "state": "active",
            "classId": 2
        },
        {
            "id": 3,
            "name": "Lorem ipsum dolor sir amet",
            "gender": "Nam",
            "birthday": Date.now(),
            "address": "Lorem ipsum dolor sir amet",
            "phoneNumber": "0123456789",
            "state": "active",
            "classId": 2
        },
        {
            "id": 4,
            "name": "Lorem ipsum dolor sir amet",
            "gender": "Nam",
            "birthday": Date.now(),
            "address": "Lorem ipsum dolor sir amet",
            "phoneNumber": "0123456789",
            "state": "active",
            "classId": 4
        },
        {
            "id": 5,
            "name": "Lorem ipsum dolor sir amet",
            "gender": "Nam",
            "birthday": Date.now(),
            "address": "Lorem ipsum dolor sir amet",
            "phoneNumber": "0123456789",
            "state": "active",
            "classId": 3
        },
        {
            "id": 6,
            "name": "Lorem ipsum dolor sir amet",
            "gender": "Nam",
            "birthday": Date.now(),
            "address": "Lorem ipsum dolor sir amet",
            "phoneNumber": "0123456789",
            "state": "active",
            "classId": 4
        },
        {
            "id": 7,
            "name": "Lorem ipsum dolor sir amet",
            "gender": "Nam",
            "birthday": Date.now(),
            "address": "Lorem ipsum dolor sir amet",
            "phoneNumber": "0123456789",
            "state": "active",
            "classId": 5
        },
        {
            "id": 8,
            "name": "Lorem ipsum dolor sir amet",
            "gender": "Nam",
            "birthday": Date.now(),
            "address": "Lorem ipsum dolor sir amet",
            "phoneNumber": "0123456789",
            "state": "active",
            "classId": 6
        },
        {
            "id": 9,
            "name": "Lorem ipsum dolor sir amet",
            "gender": "Nam",
            "birthday": Date.now(),
            "address": "Lorem ipsum dolor sir amet",
            "phoneNumber": "0123456789",
            "state": "active",
            "classId": 6
        },
    ];

    getClassWithGrade(grade) {
        return this.classes.filter(obj => {
            return obj.grade == grade
        });
    }

    getAllStudents() {
        return this.students;
    }

    getStudentInClass(classId) {
        return this.students.filter(obj => {
            return obj.classId == classId
        });
    }
}