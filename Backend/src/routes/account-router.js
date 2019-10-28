import express from "express";
import { ATSC_TABLE_NAME, REGION, ENDPOINT } from "../dynamodb-config";
import Account from "../entities/account";
import AccountAdapter from "../use_cases/accounts/account-adapter";

const router = express.Router();
const accountAdapter = new AccountAdapter(ATSC_TABLE_NAME, REGION, ENDPOINT);

router.post("/", async (request, response, _) => {
    const {username, password, type, teacherId} = request.body;
    const account = new Account(username, password, type, teacherId);
    const result = await accountAdapter.createAccount(account);
    response.send(result);
});

router.get("/:username", async (request, response, _) => {
    const username = request.params.username;
    const result = await accountAdapter.getAccountByUsername(username);
    response.send(result);
});

router.delete("/:username", async (request, response, _) => {
    const username = request.params.username;
    const result = await accountAdapter.deleteAccount(username);
    response.send(result);
});

router.patch("/:username", async (request, response, _) => {
    const {username, password, type, teacherId} = request.body;
    const account = new Account(username, password, type, teacherId);
    const result = await accountAdapter.updateAccount(account);
    response.send(result);
});

export default router;
