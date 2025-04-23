const env = process.env.APP_ENV || 'local';
const allowedEnvs = ['local', 'dev', 'prod'];

if (!allowedEnvs.includes(env)) {
  throw new Error(`Invalid APP_ENV: ${env}. Allowed values: ${allowedEnvs.join(', ')}`);
}

require('dotenv').config({ path: `.env.${env}` });

console.log('API URL:', process.env.API_URL);
console.log('DB Host:', process.env.DB_HOST);