/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  testMatch: ['**/*.test.ts'],
  transform: {
    '^.+\\.ts$': 'ts-jest' // 👈 transforma arquivos TypeScript corretamente
  },
  moduleFileExtensions: ['ts', 'js', 'json'],
};
