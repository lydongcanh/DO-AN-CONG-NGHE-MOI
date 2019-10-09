import CreateSubject from "./create-subject";
import GetAll from "./get-all";
import FindSubjectById from "./find-subject-by-id";

export default class SubjectAdapter {
    constructor(tablename, region, endpoint) {
        this._createSubjectObj = new CreateSubject(tablename, region, endpoint);
        this._getAllObj = new GetAll(tablename, region, endpoint);
        this._findSubjectByIdObj = new FindSubjectById(tablename, region, endpoint);
    }

    /**
     * Create new subject.
     * @param {Subject} subject 
     */
    async createSubject(subject){
        return await this._createSubjectObj.execute(subject);
    }
    
    /**
     * Find all available subjects.
     */
    async getAllSubjects() {
        return await this._getAllObj.execute();
    }

    /**
     * Find subject by its id.
     * @param {String} subjectId 
     */
    async findSubjectById(subjectId) {
        return await this._findSubjectByIdObj.execute(subjectId);
    }
}