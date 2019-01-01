import AWSPut from "../../repositories/aws/aws-put";

export default class CreateStudyclass extends AWSPut {
    get item() {
        return {
            "partitionKey" : "CLASS",
            "sortKey" : this.studyclass.id,
            "data" : this.studyclass.name,
            "grade" : this.studyclass.grade,
            "state" : this.studyclass.state
        };
    }

    async execute(studyclass) {
        this.studyclass = studyclass;
        return await super.execute();
    }
}