import axios from "axios";
import { accountsEndpoint } from "./endpoints";

class AccountRepository {
    async createAccount(username, password, type) {
        try {
            const account = {
                username: username,
                password: password,
                type: type
            };

            let response = await axios.post(accountsEndpoint, account);
            return response.data.success ? response.body : { error: response.data.error };
        } catch (error) {
            return { error: error };
        }
    }

    async getAccountWithUsername(username) {
        try {
            let response = await axios.get(`${accountsEndpoint}/${username}`);
            if (response.data.success) {
                const accounts = response.data.body.Items;
                if (!accounts || accounts.length < 1)
                    return { error: "NotFound" }
                    
                return {
                    username: accounts[0].partitionKey,
                    password: accounts[0].sortKey,
                    type: accounts[0].type
                };

            } else {
                return { error: response.data.error };
            }
        } catch (error) {
            return error;
        }
    }
}

const accountRepository = new AccountRepository();
export default accountRepository;