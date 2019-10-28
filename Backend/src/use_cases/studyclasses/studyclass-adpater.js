import CreateStudyclass from "./create-studyclass";
import GetAllStudyclasses from "./get-all-studyclasses";
import GetStudyclassesById from "./get-studyclass-by-id";
import DeleteStudyclass from "./delete-studyclass";
import UpdateStudyclass from "./update-studyclass";

export default class StudyclassAdapter {
    constructor(tableName, region, endpoint) {
        this._createStudyclassObj = new CreateStudyclass(tableName, region, endpoint);
        this._getAllStudyclassesObj = new GetAllStudyclasses(tableName, region, endpoint);
        this._getStudyclassByIdObj = new GetStudyclassesById(tableName, region, endpoint);
        this._deleteStudyclassObj = new DeleteStudyclass(tableName, region, endpoint);
        this._updateStudyclassObj = new UpdateStudyclass(tableName, region, endpoint);
    }

    /**
     * Create new studyclass.
     * @param {Studyclass} studyclass Truyen thong tin cua lop vao day.
     */
    async createStudyclass(studyclass) {
        return await this._createStudyclassObj.execute(studyclass);
    }

    async getAllStudyclasses() {
        return await this._getAllStudyclassesObj.execute();
    }

    async getStudyclassById(id) {
        return await this._getStudyclassByIdObj.execute(id);
    }

    async deleteStudyclass(id) {
        return await this._deleteStudyclassObj.execute(id);
    }

    async updateStudyclass(studyclass) {
        return await this._updateStudyclassObj.execute(studyclass);
    }
}