import dotenv from 'dotenv'
dotenv.config()

export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/src/**/*.test.{ts,tsx}'],
  moduleNameMapper: {
    '\\.(css|less)$': '<rootDir>/mocks/cssStub.js',
    '\\.(gif|ttf|eot|svg)$': '<rootDir>/mocks/cssStub.js',
  },
  globals: {
    __SERVER_PORT__: process.env.SERVER_PORT,
  },
}
