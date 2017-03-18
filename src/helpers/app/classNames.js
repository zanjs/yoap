import loop from './loop'
import isEmpty from './isEmpty'

const removeSpaces = (string) => {
  const space = ' ';
  let newString = string + '';

  if (newString[0] === space) {
    newString = newString.replace(space, '');
  }

  if (newString[newString.length - 1] === space) {
    newString = newString.slice(0, -1);
  }

  return newString;
};

export default (...classNames) => {
  if (!classNames || !classNames.length) {
    return null
  }

  const convertedClassNames = removeSpaces(
    loop(classNames, (_className, index, result = '') => {
      if (isEmpty(_className) || typeof _className !== 'string') {
        return result;
      }

      // if last letter is'nt space
      const isLastLetterSpace = result[result.length - 1] === ' ';
      return result + ( !isLastLetterSpace ? ' ' + _className : _className);
    })
  );

  return !isEmpty(convertedClassNames) && convertedClassNames || null;
};
