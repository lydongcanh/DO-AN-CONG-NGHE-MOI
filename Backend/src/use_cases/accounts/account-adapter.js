import CreateAccount from "./create-account";
import GetAccountByUsername from "./get-account-by-username";
import DeleteAccount from "./delete-account";
import UpdateAccount from "./update-account";

export default class AccountAdapter {

    constructor(tableName, region, endpoint) {
        this._createAccountObj = new CreateAccount(tableName, region, endpoint);
        this._getAccountByUsername = new GetAccountByUsername(tableName, region, endpoint);
        this._deleteAccountObj = new DeleteAccount(tableName, region, endpoint);
        this._updateAccountObj = new UpdateAccount(tableName, region, endpoint);
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
    async getAccountByUsername(username) {
        return await this._getAccountByUsername.execute(username);
    }

    async deleteAccount(username) {
        return await this._deleteAccountObj.execute(username);
    }

    async updateAccount(account) {
        return await this._updateAccountObj.execute(account);
    }
}