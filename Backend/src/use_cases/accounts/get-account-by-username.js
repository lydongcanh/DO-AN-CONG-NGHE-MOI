import GetById from "../base/get-by-id";

export default class GetAccountById extends GetById {
    get partitionName() {
        return "ACCOUNT";
    }
}