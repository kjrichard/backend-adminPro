
const { Router }  = require('express');

const controlador = require('../controllers/Upload.Controller');
const fileUpload = require('express-fileupload');
const validarJWT = require('../middlewares/valida-jwt');


const router = Router();

router.use( fileUpload() );

router.put( '/:tipo/:id', validarJWT, controlador.upload);
router.get( '/:tipo/:foto', validarJWT, controlador.retornarImagen);



module.exports = router; 