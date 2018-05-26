// @flow

module.exports = {
  nonExistentPropertyAccessError: (propertyName: string): Error =>
    new Error(
      `attempted to access non-existent property \`${propertyName}\` on struct`,
    ),
};
