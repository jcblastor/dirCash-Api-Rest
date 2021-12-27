const { getAllConis, getCoins, getCoinsDate } = require('./models/search');
const { createResponse } = require('./models/helpers');

const dirCash = async (event) => {
  let response;

  switch (true) {
    case event.httpMethod === 'GET' && event.path === '/':
      response = getCoins(event.path);
      break;

    case event.httpMethod === 'GET' && event.path === '/coins':
      response = getAllConis();
      break;

    case event.httpMethod === 'GET' && event.path === '/history':
      response = getCoinsDate(event);
      break;

    default:
      response = createResponse('404 Not Fount', 404);
  }

  return response;
};

exports.handler = dirCash;
