import AWSUpdate from "../../repositories/aws/aws-update";

export default class UpdateTeacher extends AWSUpdate {
    get key() {
        return {
            "partitionKey": "TEACHER",
            "sortKey": this.teacher.id
        }
    }

    get updateExpression() {
        return "set #data=:name, gender=:gender, email=:email, subject=:subject, " +
                "birthday=:birthday, address=:address, phoneNumber=:phoneNumber, #state=:state";
    }
    
    get expressionAttributeNames() {
        return {
            "#data": "data",
            "#state": "state"
        };
    }

    get expressionAttributeValues() {
        return {
            ":name": this.teacher.name,
            ":gender": this.teacher.gender,
            ":email": this.teacher.email,
            ":subject": this.teacher.subject,
            ":birthday": this.teacher.birthday,
            ":address": this.teacher.address,
            ":phoneNumber": this.teacher.phoneNumber,
            ":state": this.teacher.state,
        };
    }

    async execute(teacher) {
        this.teacher = teacher;
        console.log("Update teacher", teacher);
        return await super.execute();
    }
}