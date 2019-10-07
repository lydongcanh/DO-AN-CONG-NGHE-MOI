import AWSPut from "../../repositories/aws/aws-put";

export default class CreateAccount extends AWSPut {
    
    async execute(account) {
        this.account = account;
        return await super.execute();
    }

    get item() {
        return {
            "partitionKey": "ACCOUNT",
            "sortKey": this.account.id,
            "data": this.account.username,
            "password": this.account.password,
            "type": this.account.type,
            "teacherId": this.account.teacherId
        };
    }
}