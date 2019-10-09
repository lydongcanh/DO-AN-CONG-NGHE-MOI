import CreateSubject from "./create-subject";
import GetAll from "./get-all";
import FindSubjectById from "./find-subject-by-id";

export default class SubjectAdapter {
    constructor(tablename, region, endpoint) {
        this._createsubject = new CreateSubject(tablename, region, endpoint);
        this._getAll = new GetAll(tablename, region, endpoint);
        this._findSubjectById = new FindSubjectById(tablename, region, endpoint);
    }

    /**
     * Create new subject.
     * @param {Subject} subject 
     */
    async createSubject(subject){
        return await this._createsubject.execute(subject);
    }
    
    /**
     * Find all available subjects.
     */
    async getAllSubjects() {
        return await this._getAll.execute();
    }

    /**
     * Find subject by its id.
     * @param {String} subjectId 
     */
    async findSubjectById(subjectId) {
        return await this._findSubjectById.execute(subjectId);
    }
}