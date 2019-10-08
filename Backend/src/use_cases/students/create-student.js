import AWSPut from "../../repositories/aws/aws-put";

export default class CreateStudent extends AWSPut {
    get item() {
        return {
            "partitionKey" : "STUDENT",
            "sortKey" : this.student.id,
            "data" : this.student.name,
            "gender" : this.student.gender,
            "birthday" : this.student.birthday,
            "address" : this.student.address,
            "phoneNumber" : this.student.phoneNumber,
            "classId" : this.student.classId
        };
    }

    async execute(student) {
        this.student = student;
        return await super.execute();
    }
}