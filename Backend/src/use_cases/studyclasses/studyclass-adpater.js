import CreateStudyclass from "./create-studyclass";
import FindStudyclassWithGrade from "./find-studyclass-with-grade";

export default class StudyclassAdapter {
    constructor(tableName, region, endpoint) {
        this._createStudyclassObj = new CreateStudyclass(tableName, region, endpoint);
        this._findStudyclassWithGradeObj = new FindStudyclassWithGrade(tableName, region, endpoint);
    }

    /**
     * Create new studyclass.
     * @param {Studyclass} studyclass Truyen thong tin cua lop vao day.
     */
    async createStudyclass(studyclass) {
        return await this._createStudyclassObj.execute(studyclass);
    }

    /**
     * Find studyclass with provided grade.
     * @param {number} grade 
     */
    async findStudyclassWithGrade(grade) {
        return await this._findStudyclassWithGradeObj.execute(grade);
    }
}