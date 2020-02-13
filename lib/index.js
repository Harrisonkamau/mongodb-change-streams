require('dotenv').config();

const DB = require('./db');
const Consumer = require('./consumer');

const campaign = new Consumer('campaign');

async function main() {
  try {
    const collection = await DB.getCollection('cart');
    const cursor = await collection.aggregate([{
      $changeStream: {
        fullDocument: 'updateLookup',
      }
    },
    {
      $match: {
        'fullDocument.customer': {
          $exists: true,
        },
        operationType: 'update'
      },
    },
    {
      $project: { 'fullDocument.note': 0 }
    }
  ]);

    while(await cursor.hasNext()) {
      const event = await cursor.next();
      campaign.process(event);
    }

  } catch (error) {
    console.log('No collection found');
    console.error(error);
  }
}

(async () => {
  await main();
  process.exit(1);
})();
