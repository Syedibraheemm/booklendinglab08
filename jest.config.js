module.exports = {
  // Indicates whether each individual test should be reported during the run
  verbose: true,
  
  // The test environment that will be used for testing
  testEnvironment: 'node',
  
  // Force Jest to exit after all tests have completed
  forceExit: true,
  
  // Timeout for each test in milliseconds
  testTimeout: 30000,
  
  // Automatically clear mock calls, instances, and results before every test
  clearMocks: true,
  
  // Indicates whether the coverage information should be collected
  collectCoverage: true,
  
  // The directory where Jest should output its coverage files
  coverageDirectory: "coverage",
  
  // Specify which files to include in the coverage collection
  collectCoverageFrom: [
    "file.js"
  ],
  
  // The glob patterns Jest uses to detect test files
  testMatch: [
    "**/file.test.js"
  ],
  
  // Run tests with a fake timer
  timers: "fake",
  
  // An array of regexp pattern strings that are matched against all test paths
  testPathIgnorePatterns: [
    "/node_modules/"
  ],
  
  // Indicates whether each individual test should be reported during the run
  verbose: true,
  
  // Automatically detect open handles (e.g., unfinished HTTP requests)
  detectOpenHandles: true,
};