import AWSUpdate from "../../repositories/aws/aws-update";

export default class UpdateAccount extends AWSUpdate {
    get key() {
        return {
            "partitionKey": "ACCOUNT",
            "sortKey": this.account.username
        }
    }

    get updateExpression() {
        return "set password=:password";
    }
    
    get expressionAttributeValues() {
        return {
            ":password": this.account.password
        };
    }

    async execute(account) {
        this.account = account;
        return await super.execute();
    }
}