

const { response }   = require('express');
const bcrypt         = require('bcryptjs');

const { generarJWT } = require('../helpers/Jwt');
const Usuario        = require('../models/Usuario.Model'); 

const controller     = {};

controller.consult = async ( req, res = response  ) => {

    const desde = Number( req.query.desde ) || 0;

    const [ usuarios, total ] = await Promise.all([

        Usuario
            .find({}, 'nombre email role google img')
            .skip( desde )
            .limit( 5 ),

        Usuario.countDocuments()
    ]);

   res.json({
       ok: true,
       usuarios: usuarios,
       total,
       uid  : req.uid
   })
}

controller.create = async ( req, res ) => {

    try {

        const { nombre, password, email } = req.body;

        const existeEmail = await Usuario.findOne({ email });

        if ( existeEmail ) {
            return res.status( 400 ).json({
                ok   : false,
                msg  : 'El correo ya esta registrado'
            })
        }

        const usuario = new Usuario( req.body );

        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt );

        usuario.save();

        const token = await generarJWT( usuario.id );
        res.json({
            status: true,
            usuario,
            token
        })

    } catch (error) {
       console.log( error );
       res.status( 500 ).json({
           ok  : false,
           msg : 'Error inesperado... revisar los logs'
       });
    }

    
 }

 controller.update = async ( req, res = response ) => {
  
     try {

        const uid = req.params.id;
        const { password, google, email, ...campos } = req.body;

        const usuarioDB = Usuario.findById( uid );
        
        if ( !usuarioDB ) {
            return res.status( 404 ).json({
                ok  :  false,
                mesg:  'No existe el usuario',
                
            })
        }

        if ( usuarioDB.email !== email) {

            const existeEmail = await Usuario.findOne({ email: email });
            if ( existeEmail ) {
                return res.status( 400 ).json({
                    ok  :  false,
                    msg :  'Ya existe un usuario registrado con ese email'
                })
            }
            
        } 

        campos.email = email;

        const usuarioActualizado = await Usuario.findByIdAndUpdate( uid, campos, { new: true } );

        res.json({
            ok: true,
            usuarioActualizado
        })
    } catch (error) {
        console.log( error );
        res.status( 500 ).json({
            ok   : false,
            msg  :  'Error inesperado'
        })
    } 
  
 }

 controller.delete = async ( req, res ) => {
   

    try {

        const uid = req.params.id;
        const usuarioDB = await Usuario.findById( uid );

        if ( !usuarioDB ) {
            
            return res.status( 404 ).json({
                ok   :  false,
                msg  :  'El usuario no existe'
            });
        }

        await Usuario.findByIdAndDelete( uid );

        res.json({
            ok   :  false,
            msg  :  'Useario eliminado'
        })
        
    } catch (error) {
        console.log( error );
        res.staus( 500 ).json({
            ok   : false,
            msg  :  'Error inesperado'
        })
    }
  
 }



module.exports = controller; 

