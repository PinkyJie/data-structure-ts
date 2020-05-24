module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: true,
  collectCoverageFrom: ['**/*.ts', '!**/*.spec.ts', '!**/node_modules/**'],
};
