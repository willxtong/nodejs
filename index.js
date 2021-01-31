process.env.UV_THREADPOOL_SIZE = 1;
// playing around with Node's cluster mode and worker threads
const cluster = require('cluster');

// is the file being executed in master mode, i.e. as the cluster manager instance?
if (cluster.isMaster) {
  // cause index.js to be executed again but in a child instance
  cluster.fork();
  cluster.fork();
} else {
  // I'm a child thread, act like a server and do nothing else
  const express = require('express');
  const crypto = require('crypto');
  const app = express();

  app.get('/', (req, res) => {
    crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
      res.send('Hi there');
    });
  });

  app.get('/fast', (req, res) => {
    res.send('That was fast!');
  });

  app.listen(3000);
}
