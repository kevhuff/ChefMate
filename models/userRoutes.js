const router = require('express').Router();
const { User } = require('../../models');

// POST /api/users to sign up a new user
router.post('/', async (req, res) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.userId = newUser.id;
      req.session.loggedIn = true;
      res.json(newUser);
    });
  } catch (error) {
    res.status(400).json(error);
  }
});

// POST /api/users/login to log in a user
router.post('/login', async (req, res) => {
  // your login logic here
});

// POST /api/users/logout to log out a user
routr.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    }else {
        res.status(404).end();
    }
})

module.exports = router
