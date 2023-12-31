import dotenv from 'dotenv'
dotenv.config()

export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/src/**/*.test.{ts,tsx}'],
  setupFilesAfterEnv: ['<rootDir>/setup-jest.js'],
  moduleNameMapper: {
    '\\.(css|less)$': 'identity-obj-proxy',
    '\\.(gif|ttf|eot|svg|png|jpeg)$': '<rootDir>/mocks/cssStub.js',
  },
  globals: {
    __SERVER_PORT__: process.env.SERVER_PORT,
  },
}
