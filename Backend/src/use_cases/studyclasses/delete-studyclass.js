import DeleteById from "../base/delete-with-id";

export default class DeleteStudyclass extends DeleteById {
    get partitionName() {
        return "STUDYCLASS";
    }
}