import Jimp from 'jimp'
import formidable from 'formidable'
import { createId } from 'utils'
import { devicesBreakpoints } from 'config'
const fs = require('fs');
const path = require('path');
const __FOLDER = path.resolve(__dirname, '../../dist');
const __ROOT = path.resolve(__dirname, '../../');

class imageController {
  getSize = width => {
    let res = [];

    for (let prop in devicesBreakpoints) {
      const value = devicesBreakpoints[prop];

      if (value <= width) {
        res.push({
          type: prop,
          width: value
        })
      }
    }

    return res;
  };

  resize = (path, callback) => {
    Jimp.read(path).then((image) => {
      const [_path, ext] = path.split('.');
      const newPath = `${_path}-preview.${ext}`;
      console.log(newPath);

      image
        .resize(200, Jimp.AUTO)
        .quality(60)
        .write(newPath, () => {
          callback({
            preview: newPath,
            full: path
          })
        })
    })
    // Jimp.read(path).then((image) => {
    //   const { width } = image.bitmap;
    //   const sizes = this.getSize(width);
    //   const max = sizes.length - 1;
    //   const images = {};
    //
    //   sizes.forEach((size, index) => {
    //     const __image = image.clone();
    //     const [_path, ext] = path.split('.');
    //     const newPath = `${_path}-${size.width}.${ext}`;
    //     console.log(newPath);
    //
    //     __image
    //       .resize(size.width, Jimp.AUTO)
    //       .quality(70)
    //       .write(newPath, () => {
    //         images[size.type] = newPath;
    //
    //         if (index === max) {
    //           callback(images);
    //           console.log(images)
    //         }
    //
    //       })
    //   })
    // })
  };

  saveImage = (path, newPath, data, callback, setError) => {
    return fs.readFile(path, (err, data) => {
      return fs.writeFile(newPath, data, () => {
        fs.unlink(path, function(err) {
          if (err) {
            if (setError)
              return setError(`Не удалось записать файл, ${err}`);
          } else {
            return callback(newPath);
          }
        });
      })
    })
  };

  process = (req, res, last, response) => (image, index) => {
    const

      path = image.path,
      size = image.size,
      fileExt = image.name.split('.').pop(),
      fileName = createId(),
      newPath = `${__FOLDER}/images/${fileName}.${fileExt}`;


    this.saveImage(path, newPath, image, () => {
      this.resize(newPath, newImages => {
        response.push(newImages);

        if (index === last) {
          console.log('response');
          this.response(req, res, response);
        }
      });
    })
  };

  response = (req, res, data) => {
    if (typeof req === 'string') {
      return res.status(500).json({
        message: req
      })
    }

    if (data) {
      const replacedData = data.map(({full, preview}) => ({
        full: full.replace(__FOLDER, ''),
        preview: preview.replace(__FOLDER, '')
      }));

      console.log(replacedData.length);

      res.status(200).json({
        success: true,
        data: replacedData
      })
    } else {
      res.status(500).json({
        message: 'Что-то пошло не так!'
      })
    }
  };

  upload = (req, res) => {
    const form = new formidable.IncomingForm();

    form.parse(req, (err, fields, files) => {
      let images   = [];
      let response = [];

      for (let prop in files) {
        images.push(files[prop]);
      }

      const lastImage = images.length - 1;
      images.forEach(this.process(
        req, res, lastImage, response
      ));
    });
  }
}

export default new imageController;
