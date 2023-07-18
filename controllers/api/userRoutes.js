const router = require('express').Router();
const { User } = require('../../models');

router.post('/', async (req, res) => {
    try {
        const userData = await User.create(req.body);
        // Set up sessions with a 'loggedIn' variable set to `true`
        req.session.save(() => {
        req.session.loggedIn = true;
        res.status(200).json(userData);
        });
    } catch (err) {
        res.status(400).json(err);
    }
    });

router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({ where: { email: req.body.email } });
        if (!userData) {
        res
            .status(400)
            .json({ message: 'Incorrect email or password, please try again' });
        return;
        }
        const validPassword = await userData.checkPassword(req.body.password);
        if (!validPassword) {
        res
            .status(400)
            .json({ message: 'Incorrect email or password, please try again' });
        return;
        }
        // Set up sessions with a 'loggedIn' variable set to `true`
        req.session.save(() => {
        req.session.loggedIn = true;
        res
            .status(200)
            .json({ user: userData, message: 'You are now logged in!' });
        });}
    catch (err) {
        res.status(400).json(err);
    }
    });
    router.post('/logout', (req, res) => {
        if (req.session.loggedIn) {
            // Remove the session variables
            req.session.destroy(() => {
                res.status(204).end();
            });
        }
    });
    
    module.exports = router;
 