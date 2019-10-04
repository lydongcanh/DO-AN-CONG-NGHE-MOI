export default class Account {
    
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