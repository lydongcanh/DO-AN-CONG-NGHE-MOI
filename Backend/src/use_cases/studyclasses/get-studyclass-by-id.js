import GetById from "../base/get-by-id";

export default class GetStudyclassById extends GetById {
    get partitionName() {
        return "STUDYCLASS";
    }
}