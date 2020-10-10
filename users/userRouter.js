const express = require('express');
const userDb = require('./userDb');
const { checkUserID, checkUserData } = require("../middleware/user")

const router = express.Router({
  mergeParams: true,
});

router.post('/users', checkUserData(), (req, res) => {
  userDb.insert(req.body)
		.then((user) => {
			res.status(201).json(user)
		})
		.catch((error) => {
			next(error)
		})
});

router.post('/users/:id/posts', checkUserID(), (req, res) => {
  if (!req.body.text) {
		return res.status(400).json({
			message: "Need a value for text",
		})
	}

	userDb.addUserPost(req.params.id, req.body)
		.then((post) => {
			res.status(201).json(post)
		})
		.catch((error) => {
			next(error)
		})
});

router.get('/users', (req, res) => {
  userDb.get()
    .then((users) => {
      return res.status(200).json(users)
    })
    .catch((error) => {
      next(error)
    })
   
});

router.get('/users/:id', checkUserID(), (req, res) => {
  // 'user' gets attached to the request in 'checkUserID'
	res.status(200).json(req.user)
});

router.get('/users/:id/posts', checkUserID(), (req, res) => {
  userDb.getUserPosts(req.params.id)
		.then((posts) => {
			res.status(200).json(posts)
		})
		.catch((error) => {
			next(error)
		})
});

router.delete('/users/:id', checkUserID(), (req, res) => {
  userDb.remove(req.params.id)
		.then((count) => {
			if (count > 0) {
				res.status(200).json({
					message: "The user has been removed.",
				})
			} else {
				res.status(404).json({
					message: "The user could not be found.",
				})
			}
		})
		.catch((error) => {
			next(error)
		})
});

router.put('/users/:id', checkUserData(), checkUserID(), (req, res) => {
  userDb.update(req.params.id, req.body)
		.then((user) => {
			if (user) {
				res.status(200).json(req.body)
			} else {
				res.status(404).json({
					message: "The user could not be found.",
				})
			}
		})
		.catch((error) => {
			next(error)
		})
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
