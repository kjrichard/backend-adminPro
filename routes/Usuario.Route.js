
const { Router }  = require('express');
const { check  }  = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos');
const usuariosController = require('../controllers/Usuario.Controller');
const validarJWT = require('../middlewares/valida-jwt');


const router = Router();

router.get( '/', validarJWT, usuariosController.consult);

router.post( '/', 
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El oassword es obligatorio').not().isEmpty(),
        validarCampos
    ], 
    usuariosController.create
);

router.put( '/:id', 
    [
        validarJWT,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        validarCampos 
    ],
    usuariosController.update
);

router.delete( '/:id', validarJWT, usuariosController.delete);

module.exports = router;