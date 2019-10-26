export default class Score {

    constructor(id, type, value, subject, multiplier, scoreboardId) {
        this.id = id;
        this.type = type;
        this.value = value;
        this.subject = subject;
        this.multiplier = multiplier;
        this.scoreboardId = scoreboardId;
        Object.freeze(this);
    }
}