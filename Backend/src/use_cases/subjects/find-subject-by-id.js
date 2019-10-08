import AWSQuery from "../../repositories/aws/aws-put";

export default class FindSubjectByID extends AWSQuery{

    get keyConditionExpression() {
        return "#id :id";
    }
    get expressionAttributeNames() {
        return {"#id": "sortKey"};
    }
    get expressionAttributeValues() {
        return {":id" : this.id,};
    }
    async execute(id){
        this.id = id;
        return await super.execute();
    }
}