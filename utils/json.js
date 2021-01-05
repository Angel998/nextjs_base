/**
 * @description Retorna un string a Object
 * @param {String} jsonData
 */
const jsonParse = (jsonData) => {
  let response = {};
  try {
    response = JSON.parse(jsonData);
  } catch (err) {}
  return response;
};

/**
 * @description Transforma un Object Json a String
 * @param {Object} jsonData
 */
const stringify = (jsonData) => {
  let response = "";
  try {
    response = JSON.stringify(jsonData);
  } catch (err) {}
  return response;
};

/**
 * @description Crea un nuevo json usando stringify y JSON.parse
 * @param {Object} jsonData
 */
const jsonNewFrom = (jsonData) => {
  const str_json = stringify(jsonData);
  if (str_json.length == 0) return jsonData;

  const new_json = jsonParse(str_json);
  if (Object.keys(new_json).length == 0) return jsonData;

  return new_json;
};

module.exports = {
  jsonParse,
  stringify,
  jsonNewFrom,
};
