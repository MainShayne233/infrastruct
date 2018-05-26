/* globals it describe */
import doctest from 'jsdoc-test';
import { expect } from 'chai';
import defineStruct from '../src';

const SAMPLE_PROPERTIES = ['name', 'age', 'zodiac'];
const SAMPLE_PARAMS = {
  name: 'xathan',
  age: 118,
  zodiac: 'libra',
};

describe('doctests', () => {
  doctest('./src/index.js');
});

describe('makeStruct', () => {
  it('should return a function that will produce structs', () => {
    const structCreator = defineStruct(SAMPLE_PROPERTIES);

    expect(structCreator).to.be.a('function');
  });

  it('should produce structs that have contain the param values for valid params', () => {
    const structCreator = defineStruct(SAMPLE_PROPERTIES);
    const struct = structCreator(SAMPLE_PARAMS);

    expect(struct.name).to.equal(SAMPLE_PARAMS.name);
    expect(struct.age).to.equal(SAMPLE_PARAMS.age);
    expect(struct.zodiac).to.equal(SAMPLE_PARAMS.zodiac);
  });

  it('should throw error if you try to access field that does not exist on struct', () => {
    const structCreator = defineStruct(SAMPLE_PROPERTIES);
    const struct = structCreator(SAMPLE_PARAMS);
    const nonExistentProperty = 'spiritAnimal';

    const nonExistentPropertyAccessCall = () => struct[nonExistentProperty];

    expect(SAMPLE_PROPERTIES).to.not.include(nonExistentProperty);
    expect(nonExistentPropertyAccessCall).to.throw(
      'attempted to access non-existent property `spiritAnimal` on struct',
    );
  });
});
