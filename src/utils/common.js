const { v4: uuidv4 } = require('uuid');

function shortenedUuid() {
  const fullUuid = uuidv4();
  const blocks = fullUuid.split('-');
  return blocks[2] + blocks[3];
}

module.exports = { shortenedUuid };
