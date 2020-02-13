const { MongoClient } = require('mongodb');
const { MONGODB_URI } = process.env;

class DB {
  /**
   * Connects to MongoDB
   * @returns {Object} a DB instance
   */
  static async connect() {
    try {
      const connection = await MongoClient.connect(MONGODB_URI);
      console.log('DB CONNECTION ESTABLISHED');
      return connection;
    } catch (error) {
      console.log(`A problem occurred while connecting to MONGODB URL: ${MONGODB_URI}`);
      console.error(error);
    }
  }

  /**
   * Retrieves a MongoDB collection
   * @param {String} collectionName
   * @returns {Object} MongoDB collection Object
   */
  static async getCollection(collectionName) {
    try {
      const connection = await this.connect();
      return connection.db('test').collection(collectionName);
    } catch (error) {
      console.log(`A problem occurred while retrieving collection: ${collectionName} from MONGODB`);
      console.error(error);
    }
  }

  /**
   * Prints pretty MongoDB document
   * @param {MongoDB Document} doc
   * @returns {String} JSON string
   */
  static prettyDoc(doc) {
    const docString = JSON.stringify(doc, null, 2);
    console.log(docString);
  }
}

module.exports = DB
