import CreateStudyclass from "./create-studyclass";
import FindStudyclassWithGrade from "./find-studyclass-with-grade";

export default class StudyclassAdapter {
    constructor(tableName, region, endpoint) {
        this.createStudyclassObj = new CreateStudyclass(tableName, region, endpoint);
        this.findStudyclassWithGradeObj = new FindStudyclassWithGrade(tableName, region, endpoint);
    }

    /**
     * Create new studyclass.
     * @param {Studyclass} studyclass Truyen thong tin cua lop vao day.
     */
    async createStudyclass(studyclass) {
        return await this.createStudyclassObj.execute(studyclass);
    }

    /**
     * Find studyclass with provided grade.
     * @param {number} grade 
     */
    async findStudyclassWithGrade(grade) {
        return await this.findStudyclassWithGradeObj.execute(grade);
    }
}