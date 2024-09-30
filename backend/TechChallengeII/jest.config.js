module.exports = {
    roots: ['<rootDir>/src'],
    moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
    coverageDirectory: '<rootDir>/coverage',
    collectCoverageFrom: [
      'src/**/*.{js,jsx}',
      '!src/**/*.spec.{js,jsx}',
      '!src/index.js'
    ],
  };
  