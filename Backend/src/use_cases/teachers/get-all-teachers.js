import GetAll from "../base/get-all";

export default class GetAllTeachers extends GetAll {
    get partitionName() {
        return "TEACHER";
    }
}