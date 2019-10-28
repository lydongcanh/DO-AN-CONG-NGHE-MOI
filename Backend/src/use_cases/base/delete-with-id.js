import AWSDelete from "../../repositories/aws/aws-delete";

export default class DeleteWithId extends AWSDelete {
    get key() {
        return {
            "partitionKey": this.partitionName,
            "sortKey": this.id
        };
    }

    get partitionName() {
        throw new Error("Un-implemented \"partitionName\".");
    }

    async execute(id) {
        this.id = id;
        return await super.execute();
    }
}