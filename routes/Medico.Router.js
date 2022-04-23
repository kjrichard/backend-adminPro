
const { Router }  = require('express');
const { check  }  = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos');
const controlador = require('../controllers/Medico.Controller');
const validarJWT = require('../middlewares/valida-jwt');


const router = Router();

router.get( '/', validarJWT, controlador.consult);

router.post( '/', 
    [   
        validarJWT,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('hospital', 'El hospital es obligatorio').isMongoId(),
        validarCampos
    ], 
    controlador.create
);

router.put( '/:id', 
    [
        validarJWT,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        validarCampos 
    ],
    controlador.update
);

router.delete( '/:id', validarJWT, controlador.delete);

module.exports = router; 