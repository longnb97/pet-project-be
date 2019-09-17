```

'use strict';

var express = require('express');
var router = express.Router();
var Product = require('../models/product');
var teamMiddleware = require('./middleware/teamMiddleware');

router.get('/', teamMiddleware.haveAccessToTeam, getProducts);
router.post('/', teamMiddleware.haveAccessToTeam, createProduct);
router.put('/:id', teamMiddleware.haveAccessToTeam, updateProduct);
router.delete('/:id', teamMiddleware.haveAccessToTeam, deleteProduct);

module.exports = router;

function getProducts(req, res) {
  var teamId = req.team._id;

  Product.find({team: teamId}).exec()
  .then(function (products) {
    return res.status(200).json(products);
  }).then(null, function (err) {
    return res.status(500).json(err);
  });
}

function createProduct(req, res) {
  var product = new Product(req.body);
  product.teamId = req.team._id;

  product.save(function(err) {
    if (err) {
      return res.status(500).json(err);
    }
    return res.status(201).json(product);
  });
}

function updateProduct(req, res) {
  if (!req.params.id) {
    return res.status(400).json('bad request');
  }

  delete req.body._id;

  Product.findByIdAndUpdate(req.params.id, req.body, {new: true}, function(err, product){
    if(err) {
      return res.status(500).json(err);
    } else{
      return res.status(200).json(product);
    }
  });
}

function deleteProduct(req, res) {
  if (!req.params.id) {
    return res.status(400).json('bad request');
  }

  Product.remove({_id: req.params.id}, function(err){
    if(err) {
      return res.status(500).json(err);
    } else{
      return res.status(200).json('ok');
    }
  });
}

```
