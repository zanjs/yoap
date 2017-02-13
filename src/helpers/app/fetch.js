import { fakeApiTimeout } from 'config'

class Response {
  constructor(response, body) {
    this.response = response;
    this.body = body;
  }

  json = () => this.response || this.body;
}

class Fetch {
  constructor(url, data, response, isError) {
    // fake loading from server

    this.url = url;
    this.data = data;
    this.isError = isError;
    this.response = response;
  }

  callback = (cb) => {
    setTimeout(() => {
      cb(new Response(this.response));
    }, fakeApiTimeout);

    return this;
  };

  then = (callback) => {
    if (this.isError) return this;

    return this.callback(callback);
  };

  catch = (callback) => {
    if (!this.isError) return this;

    return this.callback(callback);
  }
}

export default function fetch(url, data, response, isError) {
  return new Fetch(url, data, response, isError);
}
