import Jimp from 'jimp'
import formidable from 'formidable'
import { createId } from 'utils'
import { devicesBreakpoints } from 'config'
import { images as config } from 'serverConfig'
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

    res.push({
      type: 'preview',
      width: config.previewSize
    })

    return res;
  };

  resize = path => {
    return new Promise((resolve, reject) => {
      Jimp.read(path).then((image) => {
        const { width } = image.bitmap;
        const sizes = this.getSize(width);
        const max = sizes.length - 1;
        const images = {
          origin: path
        };

        sizes.forEach((size, index) => {
          const [_path, ext] = path.split('.');
          const newPath = `${_path}-${size.width}.${ext}`;

          image
            .clone()
            .resize(size.width, Jimp.AUTO)
            .quality(config.quality)
            .write(newPath, () => {
              images[size.type] = newPath;

              if (index === max) {
                resolve(images);
              }
            })
        })
      }).catch(err => {
        reject(err);
      })
    })
  };

  saveImage = (path, newPath, __data) => {
    return new Promise((resolve, reject) => {
      fs.readFile(path, (err, data) => {
        if (err) {
          return reject(err)
        }
        resolve(data || __data);
      })
    }).then(data => {
      return new Promise((resolve, reject) => {
        fs.writeFile(newPath, data, () => {
          fs.unlink(path, (err) => {
            if (err) {
              return reject(err);
            }

            return resolve(newPath);
          });
        })
      })
    })
  };

  process = image => {
    const
      path = image.path,
      size = image.size,
      fileExt = image.name.split('.').pop(),
      fileName = createId(),
      newPath = `${__FOLDER}/images/${fileName}.${fileExt}`;


    return this.saveImage(path, newPath, image).then(__path => {
      return this.resize(__path);
    })
    // this.resize(newPath, newImages => {
    //   response.push(newImages);
    //
    //   if (index === last) {
    //     console.log('response');
    //     this.response(req, res, response);
    //   }
    // });
  };

  upload = (req, res) => {
    const form = new formidable.IncomingForm();

    form.parse(req, (err, fields, files) => {
      let images   = [];

      for (let prop in files) {
        images.push(files[prop]);
      }

      return Promise.all(images.map(image => this.process(image)))
        .then(data => {
          res.status(200).json({
            success: true,
            data: data.map(item => {
              let newImage = {};

              Object.keys(item).forEach(prop => {
                const value = item[prop];
                newImage[prop] = value.replace(__FOLDER, '');
              })

              return newImage;
            })
          })
        })
        .catch(err => {
          res.status(500).json({
            message: err
          });
          console.log('images error', err);
        })
    });
  }
}

export default new imageController;
