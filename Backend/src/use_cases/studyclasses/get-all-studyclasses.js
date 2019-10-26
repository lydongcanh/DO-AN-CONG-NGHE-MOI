import GetAll from "../base/get-all";

export default class GetAllStudyclasses extends GetAll {
    get partitionName() {
        return "STUDYCLASS";
    }
}