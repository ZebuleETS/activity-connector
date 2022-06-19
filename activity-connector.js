#!/usr/bin/env node
const program = require('commander')

const { extractTar, fetchActivities } = require("./app/xml_reader")
const iCalParser = require("./utils/iCalParser")
const TEST_URL = "https://portail.etsmtl.ca/ICal/SeancesCours?typeact=C&Sigle=LOG210&Groupe=01&Session=20222";

program
    .command('get')
    .description("Retrieves activities and outputs on console")
    .argument('<directory-path>', 'The directory to the extracted Moodle files.')
    .action(function(directoryPath){
        console.log(fetchActivities(directoryPath))
    })

program
    .command('extract')
    .description("The extract function will extract a .mbz file to the tmp directory")
    .argument('<file-path>', "The path to the .mbz file to extract")
    .action(function(filePath){
        console.log("Extracting .mbz file...")
        extractTar(filePath)
        console.log("Done!")
    })

program
    .command('dates')
    .description("display all dates for specified [Sigle][Groupe][Annee + # de session]")
    .argument('<typeact>', "")
    .argument('<symbol>', "")
    .argument('<group>', "")
    .argument('<year>', "")
    .argument('<semesterSeason>', "")
    .action(function(typeact, symbol, group, year, semesterSeason) {
        let icsParser = new iCalParser(
            typeact, symbol, group, year, semesterSeason);
        icsParser.parse();
    })

program.parse(process.argv)
