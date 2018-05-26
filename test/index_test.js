/* globals it describe */
import doctest from 'jsdoc-test';
import { expect } from 'chai';
import defineStruct from '../src';

const SAMPLE_PROPERTIES = ['name', 'age', 'zodiac'];

describe('doctests', () => {
  doctest('./src/index.js');
});

describe('makeStruct', () => {
  it('should return a function that will produce structs', () => {
    const structCreator = defineStruct();
    expect(structCreator).to.be.a('function');
  });
});
