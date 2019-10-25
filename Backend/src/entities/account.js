export default class Account {
    
    /**
     * @param {String} username 
     * @param {String} password 
     * @param {String} type
     */
    constructor(username, password, type) {
        this.username = username;
        this.password = password;
        this.type = type;
        Object.freeze(this);
    }
}