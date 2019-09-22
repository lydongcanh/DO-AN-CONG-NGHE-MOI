export default class Student {
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
     * @param {String} phoneNumber 
     * @param {String} state 
     * @param {Studyclass} studyclass 
     * @param {Scoreboard} scoreboard 
     */
    constructor(id, name, gender, birthday, address, phoneNumber, state, studyclass, scoreboard) {
        this.id = id;
        this.name = name;
        this.gender = gender;
        this.birthday = birthday;
        this.address = address;
        this.phoneNumber = phoneNumber;
        this.state = state;
        this.studyclass = studyclass;
        this.scoreboard = scoreboard;
    }
}