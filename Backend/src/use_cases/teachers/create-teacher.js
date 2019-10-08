import AWSPut from "../../repositories/aws/aws-put";

export default class CreateTeacher extends AWSPut {
    get item() {
        return {
            "partitionKey" : "TEACHER",
            "sortKey" : this.teacher.id,
            "data" : this.teacher.name,
            "gender" : this.teacher.gender,
            "birthday" : this.teacher.birthday,
            "address" : this.teacher.address,
            "email" : this.teacher.email,
            "phoneNumber" : this.teacher.phoneNumber,
            "state" : this.teacher.state,
            "teacherId" : this.teacher.teacherId
        };
    }

    async execute(teacher) {
        this.teacher = teacher;
        return await super.execute();
    }
}