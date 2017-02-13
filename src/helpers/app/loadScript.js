import loop from './loop'

const SCRIPT_LOADING_STATUS = 'LOADING';
const SCRIPT_LOADED_STATUS = 'LOADED';



const callFunctions = (arr) => {
  loop(arr, (item) => item())
};

export default (url, cb, id, tag) => {
  const loadedId = `__${id}`;
  const fns = `${loadedId}__callbacks`;

  if (!window.scriptsLoading) {
    window.scriptsLoading = {
      [fns]: []
    };
  }

  const data = window.scriptsLoading;


  if (data[loadedId] === SCRIPT_LOADED_STATUS) {
    return cb();
  } else if (data[loadedId] === SCRIPT_LOADING_STATUS) {
    return data[fns].push(cb);
  }

  data[loadedId] = SCRIPT_LOADING_STATUS;

  if (!tag) {
    tag = document.createElement('script');
  }

  tag.onload = () => {
    data[loadedId] = SCRIPT_LOADED_STATUS;

    if (cb) cb();
    if (data[fns]) {
      callFunctions(data[fns]);
    }
  };

  tag.setAttribute('async', '');
  tag.setAttribute('defer', '');
  document.body.appendChild(tag);
  tag.id = id;

  tag.src = url;
};
