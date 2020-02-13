require('dotenv').config();
/**
 * There's another way to subscribe to change streams other than:
 * `collection.aggregate([])`
 * `collection.watch()`
 * this file is the same as `lib/index.js` with the exception of the listening mechanism
 */


const DB = require('./db');
const Consumer = require('./consumer');
const cartStatus = require('./cartStatuses');

const campaign = new Consumer('campaign');

async function main() {
  try {
    const collection = await DB.getCollection('cart');
    const watchOptions = {
      fullDocument: 'updateLookup',
    };
    const pipelines = [
      {
        $match: { 'fullDocument.status': cartStatus.COMPLETE },
      },
      {
        $project: { 'fullDocument.note': 0 },
      }
    ];

    const changeStream = collection.watch(pipelines, watchOptions);
    changeStream.on('change', event => {
      campaign.process(event);
    });

    changeStream.on('error', (error) => {
      console.error(error);
      changeStream.close();
      throw error;
    });
  } catch (error) {
    console.log('An error occurred while trying subscribing to change streams');
    console.error(error.stack);
  }
}

(async () => {
  await main();
})();
