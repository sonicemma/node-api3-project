const express = require('express');
const db = require('./userDb');

const router = express.Router();

router.post('/', validateUser, (req, res) => {
  
  db.insert(req.body)
  .then(() => {
    res.status(201).json(req.body);
  })
  .catch(err => {
    console.log(err.message, err);
    res.status(500).json({message: 'error'})
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
  .catch(err => {
    console.log(err.message, err);
    res.status(500).json({message: 'error'})
  })
});

router.get('/:id', validateUserId, (req, res) => {
  res.status(200).json(req.u)
});

router.get('/:id/posts', validateUserId, (req, res) => {
  db.getUserPosts(req.params.id)
  .then(posts => {
    if (posts) {
      res.status(200);
    } else {
      res.status(404).json({message: 'error post not found'})
    }
  })
  .catch(err => {
    console.log(err.message, err);
    res.status(500).json({message: 'error'})
  })
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
