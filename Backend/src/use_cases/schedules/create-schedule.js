import AWSPut from "../../repositories/aws/aws-put";

export default class CreateSchedule extends AWSPut {
    get item() {
        return {
            "partitionKey" : "SCHEDULE",
            "sortKey" : this.schedule.id,
            "data" : this.schedule.teacherId,
            "classId" : this.schedule.classId,
            "subjectId" : this.schedule.subjectId,
            "time" : this.schedule.time,
            "state" : this.schedule.state
        };
    }

    async execute(schedule) {
        this.schedule = schedule;
        return await super.execute();
    }
}