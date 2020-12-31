const { Router } = require('express');
const Drink = require('../models/drink');

module.exports = Router()
  .post('/', (req, res, next) => {
    Drink
      .insert(req.body)
      .then(drink => res.send(drink))
      .catch(next);
  });
