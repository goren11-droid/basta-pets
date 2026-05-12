const SB_BASE = 'https://api.smartbee.co.il/api/v1';

exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers, body: '' };
  }

  try {
    const path = event.queryStringParameters?.path || '';
    const method = event.httpMethod;
    const authHeader = event.headers['authorization'] || event.headers['Authorization'] || '';

    const fetchHeaders = { 'Content-Type': 'application/json' };
    if (authHeader) fetchHeaders['Authorization'] = authHeader;

    const response = await fetch(SB_BASE + path, {
      method,
      headers: fetchHeaders,
      body: method !== 'GET' ? event.body : undefined
    });

    const data = await response.json();
    return {
      statusCode: response.status,
      headers,
      body: JSON.stringify(data)
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: err.message })
    };
  }
};
