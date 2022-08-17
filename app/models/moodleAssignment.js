const MoodleActivity = require("./moodleActivity");

class MoodleAssignment extends MoodleActivity {
  constructor(
    title,
    moduleId,
    sectionId,
    moduleName,
    directory,
    dueDate,
    allowSubmissionsFromDate,
    cutOffDate,
  ) {
    super(title, moduleId, sectionId, moduleName, directory);
    this.dueDate = dueDate;
    this.allowSubmissionsFromDate = allowSubmissionsFromDate;
    this.cutOffDate = cutOffDate;
  }
  getDueDate() {
    return this.dueDate;
  }
  setDueDate(dueDate) {
    this.dueDate = dueDate;
  }
  setAllowSubmissionsFromDate(allowSubmissionsFromDate) {
    this.allowSubmissionsFromDate = allowSubmissionsFromDate;
  }
  getAllowSubmissionsFromDate() {
    return this.allowSubmissionsFromDate;
  }

  getCutoffDate() {
    return this.cutOffDate;
  }

  setCutoffDate(cutOffDate) {
    this.cutOffDate = cutOffDate;
  }

  toString() {
    let openDate = new Date(0);
    let dueDate = new Date(0);
    let cutoffDate = new Date(0);
    openDate.setUTCSeconds(this.allowSubmissionsFromDate);
    dueDate.setUTCSeconds(this.dueDate);
    cutoffDate.setUTCSeconds(this.cutOffDate);
    return `  Title: ${this.title}\n  Opens at ${openDate.toLocaleString()}\n  Is due at ${dueDate.toLocaleString()}\n  Closes at ${cutoffDate.toLocaleString()}`
  }

}

module.exports = MoodleAssignment;
