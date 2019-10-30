import AWSUpdate from "../../repositories/aws/aws-update";

export default class UpdateStudent extends AWSUpdate {
    get key() {
        return {
            "partitionKey": "STUDENT",
            "sortKey": this.student.id
        }
    }

    get updateExpression() {
        return "set #name=:name, gender=:gender, grade=:grade, " +
                "birthday=:birthday, address=:address, phoneNumber=:phoneNumber, #state=:state, classId=:classId";
    }
    
    get expressionAttributeNames() {
        return {
            "#name": "name",
            "#state": "state"
        }
    }

    get expressionAttributeValues() {
        return {
            ":name": this.student.name,
            ":gender": this.student.gender,
            ":grade": this.student.grade,
            ":birthday": this.student.birthday,
            ":address": this.student.address,
            ":phoneNumber": this.student.phoneNumber,
            ":state": this.student.state,
            ":classId": this.student.classId
        };
    }

    async execute(student) {
        this.student = student;
        return await super.execute();
    }
}