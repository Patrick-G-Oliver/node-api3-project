const express = require('express');
const userDb = require('./userDb');
// Line 5 is a would-be import of the user.js file had
// its custom middleware functions not been moved to this file.
// const { validateUserID, validateUser } = require("../middleware/user")

// Line 12 allows for use of Express' Router object.
// The request methods (.get, .post, etc.), 
// available on the Router object, are
// then called on the 'router' variable here defined. 
// (purpose of 'mergeParams' as yet unknown)
const router = express.Router({
  mergeParams: true,
});

// add a new user to the database
router.post('/users', validateUser(), (req, res) => {
  userDb.insert(req.body)
		.then((user) => {
			res.status(201).json(user)
		})
		.catch((error) => {
			next(error)
		})
});

// ascribe a new post to a user specified by id
router.post('/users/:id/posts', validateUserID(), validatePost(), (req, res) => {
	userDb.addUserPost(req.params.id, req.body)
		.then((post) => {
			res.status(201).json(post)
		})
		.catch((error) => {
			next(error)
		})
});

// retrieve all users from the database
router.get('/users', (req, res) => {
  userDb.get()
    .then((users) => {
      return res.status(200).json(users)
    })
    .catch((error) => {
      next(error)
    })
   
});

// retrieve a specific user by id 
router.get('/users/:id', validateUserID(), (req, res) => {
  // 'user' gets attached to the request in  validateUserID'
	res.status(200).json(req.user)
});

// retrieve all post ascribed to a user specified by id
router.get('/users/:id/posts', validateUserID(), (req, res) => {
  userDb.getUserPosts(req.params.id)
		.then((posts) => {
			res.status(200).json(posts)
		})
		.catch((error) => {
			next(error)
		})
});

// delete a specific user by id 
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

// edit a specific user by id 
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
			// User the 'getById' function from the userDb.js file...
			userDb.getById(req.params.id)
					.then((user) => {
							// to check if a user with the ID specified in the request exists in the database.
							// If not, return a 400, etc.
							if (!user) {
								return res.status(400).json({
									message: "invalid user id",
								})
							// Otherwise, attach 'user' to the request.
							} else {
								req.user = user
									next()
							}
					})
	}
} 

function validateUser() {
	return (req, res, next) => {
			// Check if the request body itself is absent.
			if (Object.keys(req.body).length === 0) {
				// If so, return a 400, etc.
				return res.status(400).json({
					message: "missing user data",
				})
			// Check if the request name property is absent.
			} else if (!req.body.name) {
				// If so, return a 400, etc.
				return res.status(400).json({
					message: "missing required name field"
				})
			}

			next()
	}
}

function validatePost() {
	return (req, res, next) => {
			// Check if the request body itself is absent.
			if (Object.keys(req.body).length === 0) {
				// If so, return a 400, etc.
				return res.status(400).json({
					message: "missing post data",
				})
			// Check if the request text property is absent...
			} else if (!req.body.text) {
				// If so, return a 400, etc.
				return res.status(400).json({
					message: "missing required text field"
				})
			}

			next()
	}
}

module.exports = router;
