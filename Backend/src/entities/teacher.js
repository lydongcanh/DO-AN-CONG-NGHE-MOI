export default class Teacher {

    constructor(id, name, gender, subject, birthday, address, email, phoneNumber, state) {
        this.id = id;
        this.name = name;
        this.gender = gender;
        this.subject = subject;
        this.birthday = birthday;
        this.address = address;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.state = state;
        Object.freeze(this);
    }
}