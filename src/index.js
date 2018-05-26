// @flow
import { nonExistentPropertyAccessError } from './errors';

/**
 * TODO write docs
 */
export default (validProperties: Array<string>): ((Object) => Object) => (
  params: Object,
) =>
  new Proxy(
    { ...params },
    {
      get: (struct: Object, property: string) => {
        if (validProperties.includes(property)) {
          return struct[property];
        } else {
          throw nonExistentPropertyAccessError(property);
        }
      },
    },
  );
