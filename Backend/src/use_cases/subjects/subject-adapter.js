import CreateSubject from "./create-subject";
import GetAll from "./get-all";

export default class SubjectAdapter{
    constructor(tablename,region,endpoint){
        this.createsubjectObj = new CreateSubject(tablename,region,endpoint);
        this.getallObj = new GetAll(tablename,region,endpoint);
    }
    /**
     * Create new account.
     * @param {Subject} subject 
     */
    async createsubject(subject){
        return await this.createsubjectObj.execute(account);
    }
    
    async getall(){
        return await this.getallObj.execute();
    }
}