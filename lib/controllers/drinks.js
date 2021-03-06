const { Router } = require('express');
const Drink = require('../models/drink');

module.exports = Router()
  .post('/', (req, res, next) => {
    Drink
      .insert(req.body)
      .then(drink => res.send(drink))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Drink
      .findAll()
      .then(drinks => res.send(drinks))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Drink
      .findById(req.params.id)
      .then(drink => res.send(drink))
      .catch(next);
  })

  .put('/:id', (req, res, next) => {
    Drink
      .update(req.params.id, req.body)
      .then(drink => res.send(drink))
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    Drink
      .delete(req.params.id)
      .then(drink => res.send(drink))
      .catch(next);
  });

