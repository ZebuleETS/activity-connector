// import ical
const ical = require("node-ical");

const BASE_URL = "https://portail.etsmtl.ca/ICal/SeancesCours?"

class iCalParser {
  constructor(typeact, symbol, group, year, semesterSeason) {
    this.typeact = typeact;
    this.symbol = symbol;
    this.group = group;
    this.year = year;
    this.semesterSeason = semesterSeason;
  }

  parse = async () => {
    const params = new URLSearchParams(`typeact=${this.typeact}&` + 
      `Sigle=${this.symbol}&` + 
      `Groupe=${this.group}&` + 
      `Session=${this.year + this.semesterSeason}&`
    );

    const url = await ical.async.fromURL(BASE_URL + params.toString());
    
    for (const event of Object.values(url)) {
      console.log(event);
      console.log(
        "Summary: " + event.summary +
        "\nDescription: " + event.description +
        "\nStart Date: " + event.start +
        "\n"
      );
    }
  };
}

module.exports = iCalParser;
