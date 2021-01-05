const fs = require("fs");
const { getCurrentDateStr } = require("./string");
const { jsonParse, stringify } = require("./json");

/**
 * @description Imprime una cadena string en el archivo
 * log para errores
 * @param {String} str
 */
function errorLog(str) {
  const str_log = `${getCurrentDateStr()} Error -> ${str}`;
  console.log(str_log);
}

/**
 * @description Imprime una cadena string en el archivo log para eventos
 * @param {String} str
 */
function processLog(str) {
  const str_log = `${getCurrentDateStr()} Log -> ${str}`;
  console.log(str_log);
}

function writeStatusLog(data) {
  const statusFilePath = __dirname + "/../log/status.json";
  const existsFile = fs.existsSync(statusFilePath);
  const statusData = existsFile ? fs.readFileSync(statusFilePath) : "{}";
  const statusDataJson = jsonParse(statusData);

  const newStatusData = {
    ...statusDataJson,
    ...data,
  };
  fs.writeFileSync(statusFilePath, stringify(newStatusData));
}

module.exports = {
  errorLog,
  processLog,
  writeStatusLog,
};
