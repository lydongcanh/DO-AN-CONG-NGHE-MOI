import DeleteById from "../base/delete-with-id";

export default class DeleteStudent extends DeleteById {
    get partitionName() {
        return "STUDENT";
    }
}