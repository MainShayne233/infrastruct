// @flow

import {
  nonExistentPropertyAccessError,
  nonExistentPropertySetError,
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
 * Use this function to define a struct for certain valid properties.
 *
 * @param validProperties - The properties the struct supports
 * @return - A function that will generate structs
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

    set: (struct: Object, property: string, value: any) => {
      if (validProperties.includes(property)) {
        struct[property] = value;
        return true;
      } else {
        throw nonExistentPropertySetError(property);
      }
    },
  });
