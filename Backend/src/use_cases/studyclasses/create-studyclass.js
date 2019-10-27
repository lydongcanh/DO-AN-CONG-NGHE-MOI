import AWSPut from "../../repositories/aws/aws-put";

export default class CreateStudyclass extends AWSPut {
    get item() {
        return {
            "partitionKey" : "STUDYCLASS",
            "sortKey" : this.studyclass.id,
            "data" : this.studyclass.grade,
            "name" : this.studyclass.name,
        };
    }

    async execute(studyclass) {
        this.studyclass = studyclass;
        return await super.execute();
    }
}