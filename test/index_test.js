/* globals it describe */
import doctest from 'jsdoc-test';
import { expect } from 'chai';
import { double, doubleDouble } from '../src';

describe('doctests', () => {
  doctest('./src/index.js');
});

describe('double', () => {
  it('returns double the number passed in', () => {
    expect(double(3)).to.equal(6);
  });
});

describe('doubleDouble', () => {
  it('returns quadruple the number passed in', () => {
    expect(doubleDouble(3)).to.equal(12);
  });
});
