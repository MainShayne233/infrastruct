// @flow

module.exports = {
  nonExistentPropertyAccessError: (propertyName: string): Error =>
    new Error(
      `attempted to access non-existent property \`${propertyName}\` on struct`,
    ),

  nonExistentPropertyInParamsError: (propertyName: string): Error =>
    new Error(
      `attempted to create struct with non-existent property \`${propertyName}\``,
    ),
};
