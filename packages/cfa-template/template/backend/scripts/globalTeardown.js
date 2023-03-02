// module.exports = async () => {
//     await global.testMongo.stop();
// };


import { MongoMemoryServer } from 'mongodb-memory-server';
import { config } from './config';

module.exports = async function globalTeardown() {
  if (config.Memory) { // Config to decided if an mongodb-memory-server instance should be used
    const instance = (global).__MONGOINSTANCE;
    await instance.stop();
  }
};