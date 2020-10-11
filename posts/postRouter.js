const express = require('express');
const postDb = require('./postDb');

const router = express.Router({
  mergeParams: true,
});

// retrieve all posts from the database
router.get('/posts', (req, res) => {
  postDb.get()
    .then((posts) => {
      return res.status(200).json(posts)
    })
    .catch((error) => {
      next(error)
    })
});

// retrieve a specific post from the database by its id
router.get('/posts/:id', validatePostID(), (req, res) => {
  res.status(200).json(req.post)
});

// delete a specfic post by its id
router.delete('/posts/:id', validatePostID(), (req, res) => {
  postDb.remove(req.params.id)
		.then((count) => {
			if (count > 0) {
				res.status(200).json({
					message: "The post has been removed.",
				})
			} else {
				res.status(404).json({
					message: "The post could not be found.",
				})
			}
		})
		.catch((error) => {
			next(error)
		})
});

// edit a specifc post by its id
router.put('/posts/:id', validatePostID(), (req, res) => {
  postDb.update(req.params.id, req.body)
		.then((user) => {
			if (user) {
				res.status(200).json(req.body)
			} else {
				res.status(404).json({
					message: "The post could not be found.",
				})
			}
		})
		.catch((error) => {
			next(error)
		})
});

// custom middleware

function validatePostID() {
  return (req, res, next) => {
    postDb.getById(req.params.id)
      .then((post) => {
        if (!post) {
          return res.status(400).json({
            message: "invalid post id",
          })
        } else {
          req.post = post
          next()
        }
      })
  }
}

module.exports = router;
