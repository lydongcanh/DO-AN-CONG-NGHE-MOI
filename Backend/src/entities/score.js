export default class Score {

    constructor(id, type, value, subject, multiplier, scoreBoardId) {
        this.id = id;
        this.type = type;
        this.value = value;
        this.subject = subject;
        this.multiplier = multiplier;
        this.scoreBoardId = scoreBoardId;
        Object.freeze(this);
    }
}