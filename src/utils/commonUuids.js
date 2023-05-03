const { v4: uuidv4 } = require('uuid');

function shortenedUuid() {
  const fullUuid = uuidv4();
  const blocks = fullUuid.split('-');
  return blocks[2] + blocks[3];
}

function doubledUuid() {
  const fullUuid = uuidv4();
  const blocks = fullUuid.split('-');
  return `${blocks[1]}-${blocks[3]}`;
}

function strippedUuid() {
  const fullUuid = uuidv4();
  const blocks = fullUuid.split('-');
  return blocks[1] + blocks[2] + blocks[3] + blocks[4] +blocks[5];
}

function generateToken() {
  return `${strippedUuid}-${strippedUuid}-${strippedUuid}`;
}

module.exports = { shortenedUuid, doubledUuid, generateToken };
