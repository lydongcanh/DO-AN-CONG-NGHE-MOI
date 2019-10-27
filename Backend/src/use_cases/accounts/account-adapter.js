import CreateAccount from "./create-account";
import FindAccountWithUsername from "./find-account-with-username";
import DeleteAccount from "./delete-account";

export default class AccountAdapter {

    constructor(tableName, region, endpoint) {
        this._createAccountObj = new CreateAccount(tableName, region, endpoint);
        this._findAccountWithUsernameObj = new FindAccountWithUsername(tableName, region, endpoint);
        this._deleteAccountObj = new DeleteAccount(tableName, region, endpoint);
    }

    /**
     * Create new account.
     * @param {Account} account 
     */
    async createAccount(account) {
        return await this._createAccountObj.execute(account);
    }

    /**
     * Find account with provided username.
     * @param {String} username 
     */
    async findAccountWithUsername(username) {
        return await this._findAccountWithUsernameObj.execute(username);
    }

    async deleteAccount(username) {
        return await this._deleteAccountObj.execute(username);
    }
}