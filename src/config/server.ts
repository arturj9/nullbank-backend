import 'dotenv/config';

const server = {
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || '3000'
};

export default server;