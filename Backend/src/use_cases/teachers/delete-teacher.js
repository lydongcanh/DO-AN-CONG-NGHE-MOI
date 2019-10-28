import DeleteById from "../base/delete-with-id";

export default class DeleteTeacher extends DeleteById {
    get partitionName() {
        return "TEACHER";
    }
}