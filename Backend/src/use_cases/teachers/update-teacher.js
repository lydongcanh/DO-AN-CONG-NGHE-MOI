import AWSUpdate from "../../repositories/aws/aws-update";

export default class UpdateTeacher extends AWSUpdate {
    get key() {
        return {
            "partitionKey": "TEACHER",
            "sortKey": this.teacher.id
        }
    }

    get updateExpression() {
        return "set name=:name, gender=:gender, email=:email" +
                "birthday=:birthday, address=:address, phoneNumber=:phoneNumber, state=:state";
    }
    
    get expressionAttributeValues() {
        return {
            ":name": this.teacher.name,
            ":gender": this.teacher.gender,
            ":email": this.teacher.email,
            ":birthday": this.teacher.birthday,
            ":address": this.teacher.address,
            ":phoneNumber": this.teacher.phoneNumber,
            ":state": this.teacher.state,
        };
    }

    async execute(teacher) {
        this.teacher = teacher;
        return await super.execute();
    }
}