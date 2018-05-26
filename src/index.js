// @flow
import {
  nonExistentPropertyAccessError,
  nonExistentPropertyInParamsError,
} from './errors';

const createStructWithValidParams = (
  params: Object,
  validProperties: Array<string>,
): Object =>
  Object.keys(params).reduce((struct, property) => {
    if (validProperties.includes(property)) {
      return { ...struct, [property]: params[property] };
    } else {
      throw nonExistentPropertyInParamsError(property);
    }
  }, {});

/**
 * TODO write docs
 */
export default (validProperties: Array<string>): ((Object) => Object) => (
  params: Object,
) =>
  new Proxy(createStructWithValidParams(params, validProperties), {
    get: (struct: Object, property: string) => {
      if (validProperties.includes(property)) {
        return struct[property];
      } else {
        throw nonExistentPropertyAccessError(property);
      }
    },
  });
