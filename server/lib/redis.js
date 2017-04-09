'use strict';
import redis from 'redis';

let client = redis.createClient();

client.on('error', (error) => {
  if(error) throw error;
});

export { client };
