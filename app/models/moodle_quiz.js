const MoodleActivity = require("./moodle_activity");

class MoodleQuiz extends MoodleActivity {
    constructor(
        title, 
        moduleid, 
        sectionid,
        modulename, 
        directory,
        timeopen,
        timeclose
    ){
        super(title, moduleid, sectionid, modulename, directory)
        this.timeopen = timeopen
        this.timeclose = timeclose
    }
}

module.exports = MoodleQuiz