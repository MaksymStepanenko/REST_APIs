function ipToInt(ip) {
  return ip
    .split(".")
    .reduce((acc, octet) => acc * 256 + parseInt(octet, 10), 0);
}

function intToIPv4(intVal) {
  const part1 = intVal >>> 24;
  const part2 = (intVal >>> 16) & 255;
  const part3 = (intVal >>> 8) & 255;
  const part4 = intVal & 255;
  return [part1, part2, part3, part4].join(".");
}

module.exports = { ipToInt, intToIPv4 };
