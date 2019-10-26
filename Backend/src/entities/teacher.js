export default class Teacher {

    /**
     * @param {String} id 
     * @param {String} name 
     * @param {String} gender 
     * @param {Date} birthday 
     * @param {String} address 
     * @param {String} email 
     * @param {String} phoneNumber 
     * @param {String} state 
     */
    constructor(id, name, gender, birthday, address, email, phoneNumber, state) {
        this.id = id;
        this.name = name;
        this.gender = gender;
        this.birthday = birthday;
        this.address = address;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.state = state;
        Object.freeze(this);
    }
}