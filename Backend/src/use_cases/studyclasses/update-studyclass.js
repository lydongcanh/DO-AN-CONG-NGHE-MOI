import AWSUpdate from "../../repositories/aws/aws-update";

export default class UpdateStudyclass extends AWSUpdate {
    get key() {
        return {
            "partitionKey": "STUDYCLASS",
            "sortKey": this.studyclass.id
        }
    }

    get updateExpression() {
        return "set name=:name";
    }
    
    get expressionAttributeValues() {
        return {
            ":name": this.studyclass.name
        };
    }

    async execute(studyclass) {
        this.studyclass = studyclass;
        return await super.execute();
    }
}