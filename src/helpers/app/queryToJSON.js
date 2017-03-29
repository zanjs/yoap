import { isEmpty } from 'helpers'

export default function queryToJSON(query, toString) {
  if (isEmpty(query)) {
    return null;
  }

  const queryArray = query.replace('?', '').split('&') || [];
  let result = {};

  queryArray.forEach(item => {
    if (isEmpty(item)) return;

    if (item.indexOf('=')) {
      const [prop, value] = item.split('=');
      return result =  {
        ...result,
        [prop]: value == null ? null : value
      }
    }

    result = {
      ...result,
      [item]: null
    }
  });

  if (toString) {
    result = JSON.stringify(result);
  }

  return result;
}
