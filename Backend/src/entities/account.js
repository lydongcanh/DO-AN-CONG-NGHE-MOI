export default class Account {

    constructor(username, password, type, teacherId) {
        this.username = username;
        this.password = password;
        this.type = type;
        this.teacherId = teacherId;
        Object.freeze(this);
    }
}