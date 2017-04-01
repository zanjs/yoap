import { imageApi } from 'constants/urls'
import { fetch } from 'helpers'

function status(response) {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response)
  } else {
    return Promise.reject(new Error(response.statusText))
  }
}

function json(response) {
  return response.json()
}

export default function imageUpload(files) {
  const data = new FormData();
  files.forEach((item, index) => {
    data.append(`image-${index}`, item);
  });

  console.log(files);

  return fetch(imageApi, {
      method: 'post',
      body: data
    })
    .then(status)
    .then(json)
    .then((res) => res.data)

    .catch(function(e) {
      console.log('Error', e);
    });
}

window.imageUpload = imageUpload;
