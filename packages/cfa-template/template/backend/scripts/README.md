# Testing Configuration

From: https://nodkz.github.io/mongodb-memory-server/docs/guides/integration-examples/test-runners/

## Notes:
- When running the tests, each test should be able to be run one at a time and pass. 
- Each “it” block should run one at a time and pass
- Mongodb should be a memory only mongodb for testing purposes
- Env variables should be loaded from .env.test except for MONGO_URI which is the address of the in memory mongodb
- Running a single test file should be `jest myfilematcher` and should work
- We need a tutorial for how to debug and run these tests in the docs
