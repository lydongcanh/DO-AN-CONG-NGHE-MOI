import AWSPut from "../../repositories/aws/aws-put";

export default class CreateStudent extends AWSPut {
    get item() {
        return {
            "partitionKey" : "STUDENT",
            "sortKey": this.student.id,
            "data" : this.student.classId,
            "name" : this.student.name,
            "gender" : this.student.gender,
            "grade" : this.student.grade,
            "birthday" : this.student.birthday,
            "address" : this.student.address,
            "phoneNumber" : this.student.phoneNumber,
            "state": this.student.state
        };
    }

    async execute(student) {
        this.student = student;
        return await super.execute();
    }
}