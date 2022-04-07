
const { response } = require('express');
const Usuario      = require('../models/Usuario.Model');
const bcrypt       = require('bcryptjs');
const { generarJWT } = require('../helpers/Jwt');

const controlador = {};

controlador.login = async ( req, res = responce ) => {
    
    const { email, password } = req.body;

    try {
        
        const usuarioDB = await Usuario.findOne({ email });
        
        if ( !usuarioDB ) {
            return res.status( 404 ).json({
                ok   :  false,
                msg  :  'Contraseña o email no es valido'
            });
        }

        const validPassword = bcrypt.compareSync( password, usuarioDB.password );
       
        if ( !validPassword ) {
            return res.status( 404 ).json({
                ok   :  false,
                msg  :  'Contraseña o email no es valido'
            });
        }

        const token = await generarJWT( usuarioDB.id );

        res.status( 200 ).json({
            ok   :  true,
            msg  :  'Usuario autenticado',
            token
        })


        
        
    } catch (error) {
        console.log( error );
        return res.status( 500 ).json({
            ok   :  false,
            msg  :  'Error inesperado'
        })
    }
}

module.exports = controlador;