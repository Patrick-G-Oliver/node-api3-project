const express = require('express');
const userDb = require('./userDb');
// const { validateUserID, validateUser } = require("../middleware/user")

const router = express.Router({
  mergeParams: true,
});

router.post('/users', validateUser(), (req, res) => {
  userDb.insert(req.body)
		.then((user) => {
			res.status(201).json(user)
		})
		.catch((error) => {
			next(error)
		})
});

router.post('/users/:id/posts', validateUserID(), validatePost(), (req, res) => {
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

router.get('/users/:id', validateUserID(), (req, res) => {
  // 'user' gets attached to the request in  validateUserID'
	res.status(200).json(req.user)
});

router.get('/users/:id/posts', validateUserID(), (req, res) => {
  userDb.getUserPosts(req.params.id)
		.then((posts) => {
			res.status(200).json(posts)
		})
		.catch((error) => {
			next(error)
		})
});

router.delete('/users/:id', validateUserID(), (req, res) => {
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

router.put('/users/:id', validateUser(), validateUserID(), (req, res) => {
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

function validateUserID() {
	return (req, res, next) => {
			userDb.getById(req.params.id)
					.then((user) => {
							// to check if a user with the ID specified in the request exists in the database...
							if (!user) {
								return res.status(400).json({
									message: "invalid user id",
								})
							} else {
								req.user = user
									next()
							}
					})
	}
} 

function validateUser() {
	return (req, res, next) => {
			// to check if the request body itself is absent...
			if (Object.keys(req.body).length === 0) {
				return res.status(400).json({
					message: "missing user data",
				})
			// to check if the request name property is absent...
			} else if (!req.body.name) {
				return res.status(400).json({
					message: "missing required name field"
				})
			}

			next()
	}
}

function validatePost() {
	return (req, res, next) => {
			// to check if the request body itself is absent...
			if (Object.keys(req.body).length === 0) {
				return res.status(400).json({
					message: "missing post data",
				})
			// to check if the request name property is absent...
			} else if (!req.body.text) {
				return res.status(400).json({
					message: "missing required text field"
				})
			}

			next()
	}
}

module.exports = router;
