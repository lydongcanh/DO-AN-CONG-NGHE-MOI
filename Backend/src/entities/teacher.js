export default class Teacher {
    /**
     * @param {JSON} jsonData 
     */
    constructor(jsonData) {
        Object.assign(this, jsonData);
        Object.freeze(this);
    }

    /**
     * @param {String} id 
     * @param {String} name 
     * @param {String} gender 
     * @param {Date} birthday 
     * @param {String} address 
     * @param {String} email 
     * @param {String} phoneNumber 
     * @param {String} state 
     * @param {Subject} subject 
     * @param {Account} account 
     */
    constructor(id, name, gender, birthday, address, email, phoneNumber, state, subject, account) {
        this.id = id;
        this.name = name;
        this.gender = gender;
        this.birthday = birthday;
        this.address = address;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.state = state;
        this.subject = subject;
        this.account = account;
        Object.freeze(this);
    }
}