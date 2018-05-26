// @flow

/*
 * Doubles the number passed to it
 * @example
 * double(1.2)
 * //=> 2.4
 */
export const double = (x: number): number => 2 * x;

/*
 * Double doubles the number passed to it
 * @example
 * doubleDouble(1.2)
 * //=> 4.8
 */
export const doubleDouble = (x: number): number => double(double(x));
