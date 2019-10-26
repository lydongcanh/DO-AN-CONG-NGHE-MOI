import GetById from "../base/get-by-id";

export default class GetTeacherById extends GetById {
    get partitionName() {
        return "TEACHER";
    }
}