export default class Account {
    /**
     * @param {JSON} jsonData
     */
    constructor(jsonData) {
        Object.assign(this, jsonData);
        Object.freeze(this);
    }

    /**
     * @param {String} id 
     * @param {String} username 
     * @param {String} password 
     * @param {String} type
     */
    constructor(id, username, password, type) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.type = type;
        Object.freeze(this);
    }
}