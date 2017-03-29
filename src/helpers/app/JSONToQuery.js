import { isEmpty } from 'helpers'

export default function JSONToQuery(json) {
  if (isEmpty(json)) {
    return null;
  }

  let result = '?';

  Object.keys(json).forEach((item, index) => {
    const value = json[item];
    if (item == null || item == 'null' || value === 'REMOVE_VALUE')  return;

    result += `${!index ? '' : '&'}${item}${value ? `=${value}` : ''}`;
  });

  return result;
}
