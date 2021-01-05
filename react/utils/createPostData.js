import { stringify } from "../../utils/json";

/**
 * @description Crea un FormData si hay archivos o retorna un Object para ser enviado por POST
 * @param {Array|Null} files
 * @param {Object|Null} jsonData
 */
export default function createPostData(files = [], jsonData = null) {
  let data = null;

  if (files && files.length > 0) {
    const form = new FormData();
    files.forEach((file) => form.append("files[]", file.file, file.name));
    if (jsonData) {
      form.append("json_data", stringify(jsonData));
    }
    data = form;
  } else if (jsonData) {
    data = jsonData;
  }

  return data;
}
