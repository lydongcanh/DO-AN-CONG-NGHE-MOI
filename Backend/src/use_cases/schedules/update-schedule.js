import AWSUpdate from "../../repositories/aws/aws-update";

export default class UpdateSchedule extends AWSUpdate {
    get key() {
        return {
            "partitionKey": "SCHEDULE",
            "sortKey": this.schedule.id
        }
    }

    get updateExpression() {
        return "set state=:state, subject=:subject";
    }
    
    get expressionAttributeValues() {
        return {
            ":state": this.schedule.state,
            ":subject": this.schedule.subject
        };
    }

    async execute(schedule) {
        this.schedule = schedule;
        return await super.execute();
    }
}