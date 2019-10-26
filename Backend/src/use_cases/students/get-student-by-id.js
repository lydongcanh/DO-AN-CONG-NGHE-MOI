import GetById from "../base/get-by-id";

export default class GetStudentById extends GetById {
    get partitionName() {
        return "STUDENT";
    }
}