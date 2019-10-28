import DeleteById from "../base/delete-with-id";

export default class DeleteScore extends DeleteById {
    get partitionName() {
        return "SCORE";
    }
}