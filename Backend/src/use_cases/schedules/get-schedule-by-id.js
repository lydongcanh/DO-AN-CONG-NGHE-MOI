import GetById from "../base/get-by-id";

export default class GetScheduleById extends GetById {
    get partitionName() {
        return "SCHEDULE";
    }
}