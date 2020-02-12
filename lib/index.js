require('dotenv').config();

const { DB } = require('./db');

async function main() {
  try {
    const collection = await DB.getCollection('demo');
    const cursor = await collection.aggregate([{
      $changeStream: {},
    }]);

    while(await cursor.hasNext()) {
      const doc = await cursor.next();
      DB.prettyDoc(doc);
    }

  } catch (error) {
    console.log('No collection found');
    console.error(error);
  }
}

(async () => {
  await main();
})();
