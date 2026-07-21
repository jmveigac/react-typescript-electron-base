module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  testMatch: [
    '<rootDir>/src/**/*.test.ts?(x)',
    '<rootDir>/tests/**/*.test.ts?(x)',
  ],
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest',
  },
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': '<rootDir>/tests/styleMock.cjs',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
};
