export default class Student {

    /**
     * @param {String} id 
     * @param {String} name 
     * @param {String} gender 
     * @param {Date} birthday 
     * @param {String} address 
     * @param {String} phoneNumber 
     * @param {String} state 
     * @param {String} classId 
     */
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