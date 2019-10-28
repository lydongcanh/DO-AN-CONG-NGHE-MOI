import axios from "axios";
import { accountsEndpoint } from "./endpoints";

class AccountRepository {
    async createAccount(username, password, type, teacherId) {
        try {
            const account = {
                username: username,
                password: password,
                type: type,
                teacherId: teacherId
            };

            const response = await axios.post(accountsEndpoint, account);
            return response.data.success ? response.body : { error: response.data.error };
        } catch (error) {
            return { error: error };
        }
    }

    async deleteAccount(username) {
        try {
            const response = await axios.delete(`${accountsEndpoint}/${username}`);
            return response.data.success ? response.body : { error: response.data.error };
        } catch (error) {
            return { error: error };
        }
    }

    async updateAccount(account) {
        try {
            const response = await axios.patch(`${accountsEndpoint}/${account.username}`, account);
            return response.data.success ? response.body : { error: response.data.error };
        } catch (error) {
            return { error: error };
        }
    }

    async getAccountWithUsername(username) {
        try {
            const response = await axios.get(`${accountsEndpoint}/${username}`);
            if (response.data.success) {
                const accounts = response.data.body.Items;
                if (!accounts || accounts.length < 1)
                    return { error: "NotFound" }

                return {
                    username: accounts[0].sortKey,
                    password: accounts[0].data,
                    type: accounts[0].type,
                    teacherId: accounts[0].teacherId
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