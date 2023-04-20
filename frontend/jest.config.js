module.exports = {
    roots: ['<rootDir>/src'],

    transform: {
      '^.+\\.tsx?$': 'ts-jest',
      '^.+\\.jsx?$': 'babel-jest',
      '^.+\\.(js|jsx|ts|tsx)$': "vite-jest"
    },

    "testEnvironment": "jsdom",
    
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  }