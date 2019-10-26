import GetAll from "../base/get-all";

export default class GetAllScores extends GetAll {
    get partitionName() {
        return "SCORE";
    }
}