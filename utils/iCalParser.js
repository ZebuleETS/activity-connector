// import ical
const ical = require("node-ical");

class iCalParser {
  constructor(url) {
    this.url = url;
  }

  parse = async () => {
    const events = await ical.async.fromURL(this.url);

    for (const event of Object.values(events)) {
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
