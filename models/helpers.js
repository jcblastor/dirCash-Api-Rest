// response
const createResponse = (body, statusCode = 200) => {
  return {
    statusCode,
    headers: {
      'content-Type': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET'
    },
    body: JSON.stringify(body)
  };
};

// merge both data
const mergeData = (data, names) => {
  const newData = new Object();
  newData.success = data.success;
  newData.timestamp = data.timestamp;
  newData.date = data.date;
  newData.base = data.base;

  const response = [];

  const coins = data.rates;
  const nameCoins = names.data.symbols;

  for (let i in coins) {
    if (i in nameCoins) {
      let item = new Object();
      item.name = nameCoins[i];
      item.rate = coins[i];
      item.cod = `${i}`;

      response.push(item);
    }
  }

  newData.rates = response;

  return newData;
};

const countListQuery = (query) => {
  let length0fQuery = 0;

  for (let i in query) {
    length0fQuery++;
  }

  return length0fQuery;
};

const validateDate = (date) => {
  return isNaN(Date.parse(date));
};

module.exports = {
  createResponse,
  mergeData,
  countListQuery,
  validateDate
};
