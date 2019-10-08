import AWSQuery from "../../repositories/aws/aws-query"

export default class GetAll extends AWSQuery{
    get keyConditionExpression(){
        return "#pk= :pk";
    }
    get expressionAttributeNames(){
        return {"#pk" : "patitionKey"};
    }
    get expressionAttributeValues(){
        return {":pk" : "SUBJECT"};
    }
}