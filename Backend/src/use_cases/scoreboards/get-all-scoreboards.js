import GetAll from "../base/get-all";

export default class GetAllScoreboards extends GetAll {
    get partitionName() {
        return "SCOREBOARD";
    }
}