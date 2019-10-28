import DeleteById from "../base/delete-with-id";

export default class DeleteSchedule extends DeleteById {
    get partitionName() {
        return "SCHEDULE";
    }
}