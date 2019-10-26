import GetById from "../base/get-by-id";

export default class GetScoreById extends GetById {
    get partitionName() {
        return "SCORE";
    }
}