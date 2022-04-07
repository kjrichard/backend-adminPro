
const { Router } = require('express');

const router = Router();

router.use('/usuarios', require('./Usuario.Route'));
router.use('/auth', require('./Auth.Router'));

module.exports = router;