# Infrastruct

Make JavaScript objects with stricter, struct-like data access.

## Install

Install the dependency
```
# using npm
npm i --save infrastruct

# using yarn
yarn add infrastruct
```

Import into module
```javascript
// if using ES6
import defineStruct from 'infrastruct';

// if not using ES6
const defineStruct = require('infrastruct');
```

## What does this do and why?

The freedom to call any key on JavaScript objects can lead to lot of bugs. For
example, you might have a user object that has the following structure:
```javascript
const exampleUser = {
  username: 'opensourcer324',
  email: 'contributor@someproject.com',
  zodiac: 'libra',
};

exampleUser.phoneNumber
//=> undefined
```

If you tried to access value with a key that is not `username`, `email`, or
`zodiac`, such as `phoneNumber` JavaScript will simply return `undefined`.
This is okay and reasonable in some cases, but if this user-object structure
should be consistent for all users, it'd make sense to not allow for any data
access other than for `username`, `email`, and `zodiac`, and to actually throw
a runtime error if anyone tries to access another value. This can be accomplished
with a struct. For example:

```javascript
import defineStruct from 'infrastructure';

const createUserStruct = defineStruct(['username', 'email', 'zodiac']);

const exampleUser = createUserStruct({
  username: 'opensourcer324',
  email: 'contributor@someproject.com',
  zodiac: 'libra',
});

exampleUser.phoneNumber
//=> Error: attempted to access non-existent property `phoneNumber` on struct


exampleUser.phoneNumber = '845-382-8492';
//=> Error: attempted to set non-existent property `phoneNumber` on struct
```

Struct creating functions defined with `defineStruct` will also throw a runtime
error if you attempt to create a struct with params that contains any keys that
weren't originally passed to `defineStruct`.

```javascript
import defineStruct from 'infrastructure';

const createUserStruct = defineStruct(['username', 'email', 'zodiac']);

const exampleUser = createUserStruct({
  username: 'opensourcer324',
  email: 'contributor@someproject.com',
  zodiac: 'libra',
  phoneNumber: '845-382-8492',
});
//=> Error: attempted to create struct with non-existent property `phoneNumber`
```

## Are structs still objects though?

Yes! Under the hood, structs created with any defined-struct-functions are still
plain JavaScript objects, and can do all the normal JavaScript object things like
[destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment),
using [the spread syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys),
getting passed to functions like [`Object.keys`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys),
etc.

However, anything that tries to call internal JavaScript object values on the
object will not work. For example, if you tried to check the constructor of the
`exampleUser` struct by calling `exampleUser.constructor`, an error would be
thrown saying:
 ```javascript
Error: attempted to access non-existent property `phoneNumber` on struct
```

## How does it work?

When you call define struct, what you are receiving back is a function that will
take whatever object you give it and wrap it in a
[`Proxy`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy).
The `Proxy` basically intecepts any call made on the object that deals with
property access, checks to see if the property that is trying to be accessed is
valid property previousily defined when `defineStruct` was called, and if it is,
it simply returns the value, otherwise it will throw an error.