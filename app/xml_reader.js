var MoodleActivity = require('./models/moodle_activity')
var fs = require('fs')
var tar = require('tar')
var xml2js = require('xml2js')
var base_path = './tmp'

function extract_tar(file_path) {
    // Checks if tmp directory exists
    if (!fs.existsSync(base_path)) {
        fs.mkdirSync(base_path)
    }
    // Check if mbz file exists, then extract to tmp directory
    if (file_path.endsWith(".mbz")) {
        try {
            new_directory = base_path + "/" + file_path.split("/").pop().replace(".mbz","")
            if(!fs.existsSync(new_directory)){
                fs.mkdirSync(new_directory)
            }
            tar.x({
                file: file_path,
                C: new_directory,
                sync: true
            })
        } catch (error) {
            // TODO add error handling with custom exception
            console.log(error)
        }
    }
}

function fetch_activities(file_path){
    var activities = []
    var data = fs.readFileSync(file_path, "utf-8")
    xml2js.parseString(data, function(err, data){
        for (var obj of data['moodle_backup']['information'][0]['contents'][0]['activities'][0]['activity']){
            activities.push(new MoodleActivity(obj.title, obj.moduleid, obj.sectionid, obj.modulename, obj.directory))
        }
    })
    console.log(activities)
    return activities
}


var moodle_backup_file = "moodle_backup.xml"
var path = "data/backup-moodle2-course-1677-s20143-log792-09-20151102-1508-nu.mbz"
var new_path = "tmp/backup-moodle2-course-1677-s20143-log792-09-20151102-1508-nu/" + moodle_backup_file


extract_tar(path)
fetch_activities(new_path)