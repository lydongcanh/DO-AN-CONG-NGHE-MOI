import AWSUpdate from "../../repositories/aws/aws-update";

export default class UpdateScore extends AWSUpdate {
    get key() {
        return {
            "partitionKey": "SCORE",
            "sortKey": this.score.id
        }
    }

    get updateExpression() {
        return "set #value=:value";
    }
    
    get expressionAttributeNames() {
        return {
            "#value": "value"
        }
    }

    get expressionAttributeValues() {
        return {
            ":value": this.score.value
        };
    }

    async execute(score) {
        this.score = score;
        return await super.execute();
    }
}