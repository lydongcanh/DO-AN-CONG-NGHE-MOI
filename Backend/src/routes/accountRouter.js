import express from "express";
import uuidv1 from "uuid/v1";
import { TABLE_NAME, REGION, ENDPOINT } from "../dynamodb-config";
import Account from "../entities/account";
import AccountAdapter from "../use_cases/accounts/account-adapter";

const router = express.Router();
const accountAdapter = new AccountAdapter(TABLE_NAME, REGION, ENDPOINT);

router.post("/create", async (request, response, _) => {
    const {username, password, type} = request.body;
    const id = uuidv1();
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
