import GetAll from "../base/get-all";

export default class GetAllStudents extends GetAll {
    get partitionName() {
        return "STUDENT";
    }
}