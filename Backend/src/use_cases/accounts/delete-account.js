import DeleteById from "../base/delete-with-id";

export default class DeleteAccount extends DeleteById {
    get partitionName() {
        return "ACCOUNT";
    }
}