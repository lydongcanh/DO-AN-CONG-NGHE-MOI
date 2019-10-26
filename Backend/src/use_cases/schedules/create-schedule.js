import AWSPut from "../../repositories/aws/aws-put";

export default class CreateSchedule extends AWSPut {
    get item() {
        return {
            "partitionKey" : "SCHEDULE",
            "sortKey": this.schedule.id,
            "data" : this.schedule.classId,
            "teacherId" : this.schedule.teacherId,
            "startDate" : this.schedule.startDate,
            "endDate" : this.schedule.endDate,
            "startTime": this.schedule.startTime,
            "length": this.schedule.length,
            "state": this.schedule.state,
            "subject": this.schedule.subject
        };
    }

    async execute(schedule) {
        this.schedule = schedule;
        return await super.execute();
    }
}