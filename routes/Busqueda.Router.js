
const { Router }  = require('express');

const controlador = require('../controllers/Busqueda.Controller');

const validarJWT = require('../middlewares/valida-jwt');


const router = Router();

router.get( '/:todo', validarJWT, controlador.consult);
router.get( '/coleccion/:tabla/:todo', validarJWT, controlador.consultColeccion);



module.exports = router; 