const { v4: uuidv4 } = require('uuid');

function shortenedUuid() {
  const fullUuid = uuidv4();
  const blocks = fullUuid.split('-');
  const shortUuid = blocks[2] + blocks[3];
  return shortUuid;
}

module.exports = { shortenedUuid };
