const { v4 } = require('uuid');

const makeId = (prefix) => `${prefix}_${v4().split('-')[0]}`;

module.exports = {
  userId: () => makeId('usr'),
  docId: () => makeId('doc'),
  payId: () => makeId('pay'),
  invId: () => makeId('inv'),
  chkId: () => makeId('chk'),
  ntfId: () => makeId('ntf'),
  expId: () => makeId('exp'),
  reqId: () => makeId('req'),
};
