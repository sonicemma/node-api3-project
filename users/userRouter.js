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

router.delete('/:id', validateUserId, validateUser, (req, res) => {
  db.remove(req.params.id)
  .then(user => {
    res.status(200).json(user)
  })
  .catch(err => {
    console.log(err.message, err);
    res.status(500).json({message: 'error'})
  })
});

router.put('/:id', validateUser, validateUserId, (req, res) => {
  db.update(req.params.id, req.body)
  .then(
    res.status(200).json(req.body))
  .catch(err => {
    console.log(err.message, err);
    res.status(500).json({message: 'error'})
  })
});

//custom middleware

function validateUserId(req, res, next) {
  const {id} = req.params;
  db.getById(id)
  .then(u => {
    if (u) {
      req.u = u;
      next();
    } else {
      res.status(404).json({message: 'error 404'})
    }
  })
  .catch(err => {
    console.log(err, err.message);
    res.status(500).json({message: 'error'})
  })
}

function validateUser(req, res, next) {
  const body = req.body;

  !body || body === {}

  ? res.status(400).json({message: 'error with user'})
  : !body.name
  ? res.status(400).json({message: 'error with name'})
  : next();
}

function validatePost(req, res, next) {
  const body = req.body
  
  !body || body === {}
  ? res.status(400).json({message: 'error with post' })
  : !body.text
  ? res.status(400).json({message: 'error with text'})
  :next();
}

module.exports = router;
