const express = require('express');
const db = require('./userDb');

const router = express.Router();

router.post('/', validateUser, (req, res) => {
  
  db.insert(req.body)
  .then(() => {
    res.status(201).json(req.body);
  })
});

router.post('/:id/posts', validatePost, validateUserId, (req, res) => {
  // do your magic!
});

router.get('/', (req, res) => {
  db.get(req.query)
  .then((posts) => {
    res.status(200).json(posts);
  })
});

router.get('/:id', (req, res) => {
  // do your magic!
});

router.get('/:id/posts', (req, res) => {
  // do your magic!
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
}

function validateUser(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
