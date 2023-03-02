// require('../setupEnv');
// const { TestMongo } = require('@friggframework/test-environment');
// require('dotenv').config({ path: '../.env.test' });

// module.exports = async () => {
//     global.testMongo = new TestMongo();
//     await global.testMongo.start();
// };


import { MongoMemoryServer } from 'mongodb-memory-server';
import * as mongoose from 'mongoose';
import {config} from './config'

module.exports = async function globalSetup() {
  console.log('INFO >>> Calling gloabal test setup')
  if (config.Memory) { // Config to decided if an mongodb-memory-server instance should be used
    // it's needed in global space, because we don't want to create a new instance every test-suite
    const instance = await MongoMemoryServer.create();
    const uri = instance.getUri();
    (global).__MONGOINSTANCE = instance;
    process.env.MONGO_URI = uri.slice(0, uri.lastIndexOf('/'));
  } else {
    process.env.MONGO_URI = `mongodb://${config.IP}:${config.Port}`;
  }

  // The following is to make sure the database is clean before an test starts
  await mongoose.connect(`${process.env.MONGO_URI}/${config.Database}`);
  await mongoose.connection.db.dropDatabase();
  await mongoose.disconnect();
};