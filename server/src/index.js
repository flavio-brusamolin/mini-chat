const express = require('express');
const userController = require('./main/factories/user-controller-factory');

function run() {
  const app = express();
  const PORT = process.env.PORT || 3030;

  app.use(express.json());

  app.post('/users', (req, res) => userController.create(req, res));

  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
}

run();
