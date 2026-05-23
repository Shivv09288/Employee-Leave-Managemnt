const http = require('http');
const postData = JSON.stringify({ name: 'Test User', email: 'testuser+copilot+http@example.com', password: 'password123', role: 'employee' });

const options = {
  hostname: '127.0.0.1',
  port: 5000,
  path: '/api/auth/register',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData)
  }
};

const req = http.request(options, (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    console.log('STATUS', res.statusCode);
    console.log(data);
  });
});

req.on('error', (e) => {
  console.error('ERROR', e.message);
});

req.write(postData);
req.end();
