import AWSPut from "../../repositories/aws/aws-put";

export default class CreateSubject extends AWSPut {

    async execute(subject) {
        this.subject = subject;
        return await super.execute();
    }

    get item() {
        return {
            "partitionKey" : "SUBJECT",
            "sortKey" : this.subject.id,
            "data" : this.subject.name,
        }
    }
}