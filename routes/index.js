
const { Router } = require('express');

const router = Router();

router.use('/usuarios', require('./Usuario.Route'));
router.use('/auth', require('./Auth.Router'));
router.use('/medicos', require('./Medico.Router'));
router.use('/hospitales', require('./Hospital.Router'));
router.use('/busquedas', require('./Busqueda.Router'));
router.use('/uploads', require('./Uploads.Router'));

module.exports = router;