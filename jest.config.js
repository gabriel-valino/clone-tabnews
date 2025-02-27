const nextJest = require("next/jest.js");
const dotenv = require("dotenv");

dotenv.config({ path: ".env.development" });

const createJestConfig = nextJest();
const jestConfig = createJestConfig({
  moduleDirectories: ["node_modules", "<rootDir>"],
  testTimeout: 60 * 1000, // 60 seconds
});

module.exports = jestConfig;
