import express from "express";
import dynamoConfig from "../dynamodb-config";
import Account from "../entities/account";
import AccountAdapter from "../use_cases/accounts/account-adapter";

const router = express.Router();
const accountAdapter = new AccountAdapter(dynamoConfig.TABLE_NAME, dynamoConfig.REGION, dynamoConfig.ENDPOINT);

router.post("/create", async (request, response, _) => {
    const {id, username, password, type} = request.body;
    const account = new Account(id, username, password, type);
    const result = await accountAdapter.createAccount(account);
    response.send(result);
});

router.get("/:username", async (request, response, _) => {
    const username = request.params.username;
    const result = await accountAdapter.findAccountWithUsername(username);
    response.send(result);
});

module.exports = router;
