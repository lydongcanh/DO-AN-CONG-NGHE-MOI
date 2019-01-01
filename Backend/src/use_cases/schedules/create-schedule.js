import AWSPut from "../../repositories/aws/aws-put";

export default class CreateSchedule extends AWSPut {
    get item() {
        return {
            "partitionKey" : "SCHEDULE",
            "sortKey": this.schedule.id,
            "data" : this.schedule.classId,
            "teacherId" : this.schedule.teacherId,
            "time": this.schedule.time,
            "date": this.schedule.date,
            "semester": this.schedule.semester,
            "state": this.schedule.state,
            "subject": this.schedule.subject
        };
    }

    async execute(schedule) {
        this.schedule = schedule;
        return await super.execute();
    }
}