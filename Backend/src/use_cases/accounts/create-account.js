import AWSPut from "../../repositories/aws/aws-put";

export default class CreateAccount extends AWSPut {
    
    async execute(account) {
        this.account = account;
        return await super.execute();
    }

    get item() {
        return {
            "partitionKey": this.account.username,
            "sortKey": this.account.password,
            "data": this.account.type,
            "teacherId": this.account.teacherId
        };
    }
}