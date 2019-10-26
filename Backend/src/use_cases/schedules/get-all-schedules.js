import GetAll from "../base/get-all";

export default class GetAllSchedules extends GetAll {
    get partitionName() {
        return "SCHEDULE";
    }
}