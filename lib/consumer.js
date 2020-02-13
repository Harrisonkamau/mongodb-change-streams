const DB = require('./db');

class Consumer {
  /**
   *
   * @param {String} title
   * @param {Boolean} detailed
   */
  constructor(title, detailed = true) {
    this.title = title;
    this.detailed = detailed;
  }

  process(event) {
    console.log(`Processor "${this.title}" got operation type ${event.operationType} `);
    if (this.detailed) { DB.prettyDoc(event.fullDocument); }
  }
}

module.exports = Consumer;
