export default class Student {

    constructor(id, name, gender, birthday, address, phoneNumber, state, classId) {
        this.id = id;
        this.name = name;
        this.gender = gender;
        this.birthday = birthday;
        this.address = address;
        this.phoneNumber = phoneNumber;
        this.state = state;
        this.classId = classId;
        Object.freeze(this);
    }
}