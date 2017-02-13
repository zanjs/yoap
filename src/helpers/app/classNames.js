import { loop, isEmpty } from 'helpers'
//const newClassName = (className + (classNames ? space + classNames.join(' ') : ''));

const removeSpaces = (string) => {
  let newString = string + '';

  if (newString[0] === ' ') {
    newString = newString.replace(' ', '');
  }

  if (newString[newString.length - 1] === ' ') {
    newString = newString.slice(0, -1);
  }

  return newString;
};

export default function classNames(...classNames) {
  const convertedClassNames = removeSpaces(
    loop(classNames || [], (_className = '', index, result = '') => {
      if (isEmpty(_className)) {
        return result;
      }

      // if last letter is'nt space
      const isLastLetterSpace = result[result.length - 1] === ' ';
      return result + ( !isLastLetterSpace ? ' ' + _className : _className);
    })
  );

  return !isEmpty(convertedClassNames) && convertedClassNames || null;
};
