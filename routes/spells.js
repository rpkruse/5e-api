var express = require('express');
var router = express.Router();
var utility = require('./utility');
var Model = require('../models/spell');

router
.get('/', (req,res) => {

  var search_queries = {}
  if (req.query.name !== undefined) {
    search_queries.name = req.query.name
  }

  Model.find(search_queries, (err,data) => {
    if (err) {
      res.send(err);
    }
  }).sort( { index: 'asc'} ).exec( (err, data) => {
    if (err) {
      res.send(err);
    }
    res.status(200).json(utility.NamedAPIResource(data));
  });
});



router
.get('/:index', (req,res) => {
  // search by class 

  if (utility.isClassName(req.params.index) === true) {
    Model.find( { 'classes.name': utility.upperFirst(req.params.index) }, (err,data) => {
      if (err) {
        res.send(err);
      }
    }).sort( {url: 'asc', level: 'asc'} ).exec((err,data) => {
      if (err) {
        res.send(err);
      }
      res.status(200).json(utility.NamedAPIResource(data));
    })
  }else if(utility.isSubclassName(req.params.index) === true) {
    Model.find( { 'subclasses.name': utility.upperFirst(req.params.index) }, (err,data) => {
      if (err) {
        res.send(err);
      }
    }).sort( {url: 'asc', level: 'asc'} ).exec((err,data) => {
      if (err) {
        res.send(err);
      }
      res.status(200).json(utility.NamedAPIResource(data));
    })
  }
  
  else { // return specific document
    Model.findOne( { index: parseInt(req.params.index) }, (err,data) => {
      if (err) {
        res.send(err);
      }
      res.status(200).json(data);
    })
  }
})

var levelRouter = express.Router({mergeParams: true});
router.use('/:index/level', levelRouter);
levelRouter
.get('/:level', (req, res) => {

  if (typeof(parseInt(req.params.level) == Number)) {
    if (utility.isClassName(req.params.index) === true) {
      Model.find( { 'classes.name': utility.upperFirst(req.params.index), level: parseInt(req.params.level)}, (err,data) => {
        if (err) {
          res.send(err);
        }
      }).sort( {url: 'asc', level: 'asc'} ).exec((err,data) => {
        if (err) {
          res.send(err);
        }
        res.status(200).json(utility.NamedAPIResource(data));
      })
    }else if(utility.isSubclassName(req.params.index) === true) {
      Model.find( { 'subclasses.name': utility.upperFirst(req.params.index), level: parseInt(req.params.level)},(err,data) => {
        if (err) {
          res.send(err);
        }
      }).sort( {url: 'asc', level: 'asc'} ).exec((err,data) => {
        if (err) {
          res.send(err);
        }
        res.status(200).json(utility.NamedAPIResource(data));
      })
    }
    
    else { // return specific document
      Model.findOne( { index: parseInt(req.params.index) }, (err,data) => {
        if (err) {
          res.send(err);
        }
        res.status(200).json(data);
      })
    }
  } else {
      res.status(404)
  }
})

module.exports = router;