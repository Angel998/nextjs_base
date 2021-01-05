// import ImageCompressor from "image-compressor.js";

/**
 * @description Obtiene las imagenes comprimidas de un input
 * @returns {Array} { name, url, file }
 */
const getImagesFromInput = (input, callback) => {
  const { files } = input.target;
  const new_images = [];

  for (var i = 0; i < files.length; i++) {
    let file = files[i];
    var reader = new FileReader();
    reader.onload = (result) => {
      new_images.push({
        name: file.name,
        file,
        url: result.target.result,
      });
      if (i === files.length) {
        callback(new_images);
      }

      // new ImageCompressor(file, {
      //   checkOrientation: true,
      //   quality: 0.4,
      //   success: (file_result) => {
      //     file = file_result;
      //     new_images.push({
      //       name: file.name,
      //       url: result.target.result,
      //       file,
      //     });

      //     if (i === files.length) {
      //       callback(new_images);
      //     }
      //   },
      //   error: (err) => {
      //     console.log(`Error comprimiendo imagen ${i}`);
      //     console.log(err);
      //   },
      // });
    };
    reader.readAsDataURL(file);
  }
};

export { getImagesFromInput };
