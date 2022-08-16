# Activity connector
NPM Package: Activity connector for Moodle. This application allows modifying activities dates of a Moodle course based on its backup file.

# Table of contents

1. [Installation](#installation)
2. [Usage](#usage)
3. [Activity Planner](#activity-planner)
4. [Moodle step by step](#moodle-step-by-step)
    1. [Step 1. Create a Moodle backup file](#step-1-create-a-moodle-backup-file)
    2. [Step 2. Create an activity planner file](#step-2-create-an-activity-planner-file-dsl) 
    3. [Step 3. Create or get a calendar file](#step-3-create-or-get-a-calendar-file)
    4. [Step 4. Use the create command](#step-4-use-the-create-command)
    5. [Step 5. Importe the new Moodle file using the UI](#step-5-import-the-new-moodle-file-using-the-ui)
5. [Execute tests on local machine](#execute-test-on-local-machine)
6. [Test lib](#test-lib)
# Installation
You can install the latest npm release by using the following command in your terminal:
```bash
npm install -g activity-connector
```

For local development, you can simply run the activity-connector.js file directly. 

# Usage
```activity-connector``` or ```a-c``` (shortcut) will show you the help section of every command available in the command-line tool. You can then use ```activity-connectory <command_name> --help``` to see the help dialogue for every command.

For example, 
```bash
node activity-connector.js create -h
```
will output the following help dialogue:
```
Usage: activity-connector create [options]

Create a new updated mbz file using the mbz backup from
Moodle, the dsl file and informations about the course.

Example: create -mp ./path/to/file.mbz -dp ./path/to/file.dsl -a LOG210 -g 01 -y 2022 -s Summer
         create -mp ./path/to/file.mbz -dp ./path/to/file.dsl -if ./path/to/file.ics

Options:
  -mp --mbzpath <directory>   (required) the path of the mbz file
  -dp, --dslpath <directory>  (required) the path to the DSL file
  -if, --icsfile <directory>  the path to the ics file
  -a, --acronym <course>      the course's acronym (e.g. LOG210, GTI745, MEC200, ...)
  -g, --group <number>        the group number for the course (if the group is a single digit, add a 0 in front e.g. 01, 02, ...)
  -y --year <number>          the year of the course
  -s --semester <season>      the semester's season. The options are Winter, Summer or Fall
  -h, --help                  display help for command
```

Examples of command executions are provided in the help dialogue.

# Activity planner
This application uses the Peg.js file to generate code that will provide a parse function to analyse a string of characters. This library was used to facilitate the creation of an activity planner file to use with the application. This section provides the general rules of this activity planner.

There are 3 main calendar activities: Seminars (S), Laboratories (L) and Practicums (P).
There are 3 main Moodle activities: Quiz (Q), Exams (E) and Homework (H)
These Moodle activities can be planned relative to calendar activities.

`<activity to plan> <start date of activity> <end date of activity>`

To define `a Quiz 1 that is opened at the start of Seminar 1 and ends at the start of Practicum 2`, you should write `Q1 S1 P2`
  - Q1 stands for Quiz 1;
  - S1 stands for Seminar 1;
  - P2 stands for Practicum 2.

## Start/End of activities
You can specify `F` to get the end date of an activity. For example, the end of Seminar 2 is specified with `S2F`. You can specify `S` to get the start date of an activity. By default, if none is specified, the start date will be picked. 

e.g., to specify that Quiz 1 opens at the end of Seminar 1 and closes at the start of Practicum 2 would be `Q1 S1F P2S`

## Relative date or time modifiers
You can add or substract a certain amount of time from activity dates using + or - and time units:
- minutes: `m`
- hours: `h`
- days: `d`
- weeks: `w`

e.g., to specify that Quiz 1 opens 30 minutes after Seminar 1 ends and closes 15 minutes before Practicum 2 would be `Q1 S1+30m P2-15m`

## Absolute time modifier
You can also specify specific times for activities using the `@hh:mm` annotation.

e.g., to specify the end of the day (23:55) of Seminar 1, it would be `S1@23:55`

You can combine this modifier with the relative one:

e.g., to specify the end of the day (23:55) before Seminar 1, it would be `S1-1d@23:55`

Note: the absolute time modifier must be used *after* the relative one:

e.g., `S1-1d@23:55` is valid, but `S1@23:55-1d` is **invalid**.

## List of activities that can be configured
- Quiz: `<Qn> <start of quiz> <end of quiz>`
- Homework: `<Hn> <open date> <due date> <cutoff date>`
<!-- - Exam: `<En> <start date>` (the end date is deduced by the length of the exam ) -->

# Moodle step by step
The following section will guide you through using the application to modify a Moodle course.
> Because this tool modifies a backup file that will be used to restore (and overwrite) activities in the course, it is highly recommended that you use this tool *before* students are enrolled in the course.

## Step 1. Create a Moodle backup file
The first thing to do is to create a Moodle backup file.
This can be done through the Moodle UI.
You must have the teacher role in a course to do so.

To create the file, go to your Moodle class.
Use the cogwheel at the top right of your screen and click "Backup".
You can then click "Jump to final step" to export it or configure your exportation settings accordingly. 

![Moodle Cogwheel](images/cogwheel_moodle.png)
![Moodle Export](images/export_moodle.png)

After it finishes, you can press "Continue".
You should see your backup moodle file the "User private backup area" section.
You can download the file and save it on your computer.

![Moodle backup](images/backup_file_moodle.png)


## Step 2. Create an activity planner file (.dsl)
To use the application, you must create an activity planner file that will be used to configure your Moodle course.
You can simply create a file in Notepad or a text editor of your choice.
For more information concerning how to write the file, please refer to this section: [Activity Planner](#activity-planner).
Here is an example of an activity planner file:

```
Q1 S1F S2S-30m
Q2 S2F S3S-1d@23:55
H1 L2F L3S-1d@23:55 L3S-1d@23:55
E1 S10
```

## Step 3. Create or get a calendar file
This application uses an .ics file to modify the Moodle backup file.
You can refer to the `acitivity-connector parse-ics` to see if your ics file is valid.
You can also refer to the flags of the `activity-connector create` command to not provide an ics file and directly fetch the calendar from the school's API (specific to ETS University only).

## Step 4. Use the create command
e.g., ```activity-connector create -dp data/test.dsl -if data/Seances.ics -mp data/backup-moodle2-course-17014-s20222-log210-99-20220619-1506-nu.mbz```

The `-dp` flag is for the activity planner file path. The `-if` flag is for the ics file path. The `-mp` flag is for the Moodle backup file path we downloaded at step 1. Further information can be found using `activity-connector create -h`. 

After using the create command, you should have a mbzPackages folder created with a new .mbz file inside it.
This is your modified Moodle file.

## Step 5. Import the new Moodle file using the UI
Go back to your Moodle course and use the cogwheel to navigate to "Restore".
You can then drag and drop the new Moodle backup file in the "Import a backup file" box.
Click "Restore".

![Restore file](images/restore_moodle_file.png)

Scroll down and click "Continue".
On the next page, you need to check "Delete the contents of this course and then restore".
If this option is not checked, your Moodle course will contain duplicated activities.
This is the reason we recommend you only use this tool on a course that does not yet have students enrolled (and possibly activities that have begun).

![Delete and restore](images/delete_and_restore.png)

Click "Continue" and then "Next" on the next page.

On the current page, it is important to change "Keep current groups and groupings" and "Keep current roles and enrolments" to "Yes".
Without this change, your current roles and groups of the course will be deleted.
The users assigned in the current course would also be deleted.

![Roles settings](images/moodle_roles.png)

Scroll down and click "Next".
On the next page, scroll down and click "Restore".
This process might take a while.
As long as a circle is spinning in your browser tab, the process is still running.
Once the process is done, check to see if your Moodle activity dates have been updated.
> The Moodle calendar is an excellent way to visualize the dates.

# Execute tests on local machine
Install node JS on local machine [https://nodejs.org/en/](Node)

Run "npm install" on the project root folder

Run "npm test" on the project root folder

# Test lib
This project use the Jest library for his unit tests coverage. [https://jestjs.io/docs/](Jest)
