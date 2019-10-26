import GetById from "../base/get-by-id";

export default class GetScoreboardById extends GetById {
    get partitionName() {
        return "SCOREBOARD";
    }
}