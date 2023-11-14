const { ipToInt, intToIPv4 } = require("./utils")

const csv = require("csv-parser");
const fs = require("fs");
const ipRanges = [];

fs.createReadStream("IP2LOCATION-LITE-DB1.CSV")
  .pipe(csv())
  .on("data", (row) => {
    const data = Object.values(row);
    ipRanges.push({
      from: ipToInt(data[0]),
      to: ipToInt(data[1]),
      country: data[2],
    });
  })
  .on("end", () => {
    console.log("IP ranges loaded:", ipRanges.length);
  });

module.exports = ipRanges;

function checkCountry(ip) {
  const ipInt = ipToInt(ip);
  for (let range of ipRanges) {
    if (ipInt >= range.from && ipInt <= range.to) {
      return {
        country: range.country,
        range: `${intToIPv4(range.from)}-${intToIPv4(range.to)}`,
      };
    }
  }
  return { country: "Unknown", range: "" };
}

module.exports = checkCountry;
