
const { response } = require('express');
const Usuario      = require('../models/Usuario.Model');
const bcrypt       = require('bcryptjs');
const { generarJWT } = require('../helpers/Jwt');
const { googleVerify } = require('../helpers/google-verify');

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

controlador.googleSignIn = async ( req, res = responce ) => {
    
        const googleToken = req.body.token; 

        try {

            const { email, name, picture } =  await googleVerify( googleToken );

            let usuario;
            const usuarioDB = await Usuario.findOne({ email });

            if ( !usuarioDB ) {
                usuario = new Usuario({
                    email   : email,
                    nombre  : name,
                    img     : picture,
                    password: '@@@',
                    google  : true
                });
            } else {
                usuario = usuarioDB;
                usuario.google = true
               // usuario.password = '@@@@@'  
            }

            await usuario.save();
            const token = await generarJWT( usuario.id );

            res.status( 200 ).json({
                ok   :  true,
               token
            })
         
        } catch (error) {
            console.log( error );
            res.status( 401 ).json({
                ok   :  false,
                msg  :  'token invalido'
            })
        }
  
       
    
}

controlador.renewToken = async ( req, res = responce ) => {
    
  
    try {

        const uid = req.uid;
        const token = await generarJWT( uid );
        
        res.status( 200 ).json({
            ok   :  true,
            uid
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