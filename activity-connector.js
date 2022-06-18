#!/usr/bin/env node
const program = require('commander')

const { extractTar, fetchActivities } = require("./app/xml_reader")

program
    .command('get')
    .description("The extract function will extract a .mbz file to the tmp directory")
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

program.parse(process.argv)
