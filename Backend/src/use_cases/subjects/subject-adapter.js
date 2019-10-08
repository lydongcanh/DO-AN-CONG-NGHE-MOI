import CreateSubject from "./create-subject";
import GetAll from "./get-all";
import FindSubjectById from "./find-subject-by-id";

export default class SubjectAdapter {
    constructor(tablename, region, endpoint) {
        this.createsubjectObj = new CreateSubject(tablename, region, endpoint);
        this.getallObj = new GetAll(tablename, region, endpoint);
        this.findSubjectByIdObj = new FindSubjectById(tablename, region, endpoint);
    }

    /**
     * Create new subject.
     * @param {Subject} subject 
     */
    async createsubject(subject){
        return await this.createsubjectObj.execute(subject);
    }
    
    /**
     * Find all available subjects.
     */
    async getAllSubjects() {
        return await this.getallObj.execute();
    }

    /**
     * Find subject by its id.
     * @param {String} subjectId 
     */
    async findSubjectById(subjectId) {
        return await this.findSubjectByIdObj.execute(subjectId);
    }
}