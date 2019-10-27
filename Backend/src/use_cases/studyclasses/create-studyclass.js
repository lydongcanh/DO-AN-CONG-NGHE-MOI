import AWSPut from "../../repositories/aws/aws-put";

export default class CreateStudyclass extends AWSPut {
    get item() {
        return {
            "partitionKey" : "STUDYCLASS",
            "sortKey" : this.studyclass.id,
            "data" : this.studyclass.grade,
            "name" : this.studyclass.name,
            "startYear": this.studyclass.startYear,
            "endYear": this.studyclass.endYear,
            "state": this.studyclass.state,
            "studentIds": this.studyclass.studentIds
        };
    }

    async execute(studyclass) {
        this.studyclass = studyclass;
        return await super.execute();
    }
}