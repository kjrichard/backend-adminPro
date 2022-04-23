const { Router } = require('express');
const router = Router();
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const controlador = require('../controllers/Auth.Controller');

router.post( '/',
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'La password es obligatoria').not().isEmpty(),
        validarCampos

    ],
    controlador.login
);

router.post( '/google',
    [
        
        check('token', 'El token de google es obligatorio ').not().isEmpty(),
        validarCampos

    ],
    controlador.googleSignIn
 );

module.exports = router; 