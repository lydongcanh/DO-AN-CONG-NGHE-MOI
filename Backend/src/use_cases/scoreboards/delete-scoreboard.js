import DeleteById from "../base/delete-with-id";

export default class DeleteScoreboard extends DeleteById {
    get partitionName() {
        return "SCOREBOARD";
    }
}