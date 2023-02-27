const fs = require("fs");

const deleteImage = (path) => {
  fs.unlink(path, (err) => {
    if (err) console.log(err);
  });
};

module.exports = deleteImage;
