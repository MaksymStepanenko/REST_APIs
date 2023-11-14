const checkCountry = require("../helper/checkContry");

class Controller {
  async checkIP(req, res) {
    const ip = req.params.ip;
    const { country, range } = checkCountry(ip);

    if (country === "Unknown") {
      return res.json({
        success: false,
        message: `IP address: ${ip} not found.`,
      });
    }

    return res.json({
      success: true,
      message: `IP address: ${ip} is located range ${range}, ${country}.`,
    });
  }

  async getRealIPInfo(req, res) {
    const ip = req.ip;
    const { country, range } = checkCountry(ip);
    res.json({ ip, range, country });
  }
}
module.exports = new Controller();
