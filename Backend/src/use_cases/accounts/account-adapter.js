import CreateAccount from "./create-account";
import FindAccountWithUsername from "./find-account-with-username";

export default class AccountAdapter {

    constructor(tableName, region, endpoint) {
        this.createAccountObj = new CreateAccount(tableName, region, endpoint);
        this.findAccountWithUsernameObj = new FindAccountWithUsername(tableName, region, endpoint);
    }

    /**
     * Create new account.
     * @param {Account} account 
     */
    async createAccount(account) {
        return await this.createAccountObj.execute(account);
    }

    /**
     * Find account with provided username.
     * @param {String} username 
     */
    async findAccountWithUsername(username) {
        return await this.findAccountWithUsernameObj.execute(username);
    }
}