const axios = require('axios');

const {
  createResponse,
  mergeData,
  countListQuery,
  validateDate
} = require('./helpers');

const urls = {
  base: `http://api.exchangeratesapi.io/v1/`,
  latest: `http://api.exchangeratesapi.io/v1/latest?access_key=${process.env.EXCHANGE_KEY}`,
  symbol: `http://api.exchangeratesapi.io/v1/symbols?access_key=${process.env.EXCHANGE_KEY}`,
  filter: `http://api.exchangeratesapi.io/v1/latest?access_key=${process.env.EXCHANGE_KEY}`
};

// find the 20 most expensive coins
const getCoins = async () => {
  try {
    const symbols =
      'KWD,BHD,OMR,JOD,GBP,FKP,GIP,SHP,KYD,EUR,CHF,USD,BSD,BMD,PAB,CAD,BND,SGD,AUD,NZD';

    const names = await axios.get(urls.symbol);
    const data = await axios.get(`${urls.filter}&symbols=${symbols}`);

    const result = await mergeData(data.data, names);
    return createResponse(result);
  } catch (e) {
    console.log(e);
    return createResponse(e.message, 400);
  }
};

//search all coins
const getAllConis = async () => {
  try {
    const names = await axios.get(urls.symbol);
    const data = await axios.get(urls.latest);

    const result = await mergeData(data.data, names);
    return createResponse(result);
  } catch (e) {
    console.log(e);
    return createResponse(e.message, 400);
  }
};

//search by date
const getCoinsDate = async (event) => {
  try {
    const query = event.queryStringParameters;
    const countParamters = countListQuery(query);

    // check that queryStringParameters is not empty
    if (countParamters === 0) throw new Error('the date parameter is required');

    const date = event.queryStringParameters['date'];

    // check the format
    if (validateDate(date)) throw new Error('the date format is YYYY-MM-DD');

    const names = await axios.get(urls.symbol);
    const data = await axios.get(
      `${urls.base}${date}?access_key=${process.env.EXCHANGE_KEY}`
    );

    const result = await mergeData(data.data, names);
    return createResponse(result);
  } catch (e) {
    console.log(e);
    return createResponse(e.message, 400);
  }
};

module.exports = {
  getAllConis,
  getCoins,
  getCoinsDate
};
