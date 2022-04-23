

const { response }   = require('express');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs');


const { actualizarImagen } = require('../helpers/Actualizar-imagen');

const controller     = {};

controller.upload = async ( req, res = response  ) => {

    const tipo  = req.params.tipo;
    const id    = req.params.id;

    tiposValidos = [ 'hospitales', 'medicos', 'usuarios' ];
    if ( !tiposValidos.includes( tipo ) ) {
        res.status( 400 ).json({
            ok   :  false,
            msg  :  'No es un medico, usuario u hospital ( tipo )'
        })
    }

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status( 400 ).json({
            ok   :  false,
            msg  :  'No hay ningun archivo'
        })
    }
    
    const files = req.files.imagen;
    const nombreCortado = files.name.split('.');
    const extensionArchivo = nombreCortado[ nombreCortado.length -1 ];

    extencionesValidas = [ 'jpg', 'png', 'jpeg', 'gif' ];
    if ( !extencionesValidas.includes( extensionArchivo ) ) {
        res.status( 400 ).json({
            ok   :  false,
            msg  :  'No es una extension permitida'
        })
    }

    const nombreArchivo = `${ uuidv4() }.${ extensionArchivo }`;

    const path = `./uploads/${ tipo }/${ nombreArchivo }`;

     // Use the mv() method to place the file somewhere on your server
    files.mv( path, (err) => {
        if ( err ) {
            console.log( err );
            return res.status( 500 ).json({
                ok   :  false,
                msg  :  'Error al mover la imagen'
            });
        }

        actualizarImagen( tipo, id, nombreArchivo );


        res.json({
            ok: true,
            nombreArchivo,
            uid  : req.uid
        })
    });

   

  
}

controller.retornarImagen = async ( req, res = response  ) => {

    const tipo  = req.params.tipo;
    const foto    = req.params.foto;

    const pathImg = path.join( __dirname, `../uploads/${ tipo }/${ foto }`);

    if ( fs.existsSync( pathImg )) {
        res.sendFile( pathImg );
    } else {
        const pathImg = path.join( __dirname, `../uploads/no-disponible.JPG`);
        res.sendFile( pathImg );
    }
    
  
}



module.exports = controller; 

