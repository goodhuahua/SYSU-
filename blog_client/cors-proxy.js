import cors_anywhere from 'cors-anywhere';

const host = 'localhost';
const port = 8000;

cors_anywhere.createServer().listen(port, host, () => {
  console.log(`CORS Anywhere proxy running at http://${host}:${port}`);
  console.log('cors server start')
});