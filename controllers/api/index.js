const router = require('express').Router();

const apiRoutes = require('./userRoutes');
const homeRoutes = require('../homeRoutes');

router.use('/', homeRoutes);
router.use('/user', apiRoutes);

module.exports = router;
