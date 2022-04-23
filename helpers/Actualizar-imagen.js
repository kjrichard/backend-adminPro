
const fs = require('fs')

const Usuario        = require('../models/Usuario.Model');
const Medico         = require('../models/Medico.Model');
const Hospital       = require('../models/Hospital.Model');

const pathViejo = '';

const borrarImagen = async ( path ) => {

    if ( fs.existsSync( path )) {
        fs.unlinkSync( path );
    }
}


const actualizarImagen = async (  tipo, id, nombreArchivo ) => {
   
    switch (tipo) {
        case 'medicos':
            const medico = await Medico.findById( id );
            if ( !medico ) {
                console.log('No se encontro medico');
                return false;
            }

            const pathViejo = `./uploads/medicos/${ medico.img }`;
            borrarImagen( pathViejo );

            medico.img = nombreArchivo;
            await medico.save();
            return true;

        break;

        case 'hospitales':
            const hospital = await Hospital.findById( id );
            if ( !hospital ) {
                console.log('No se encontro el hospital');
                return false;
            }

            pathViejo = `./uploads/hospitales/${ hospital.img }`;
            borrarImagen( pathViejo );

            hospital.img = nombreArchivo;
            await hospital.save();
            return true;
        
            break;

        case 'usuarios':
            const usuario = await Usuario.findById( id );
            if ( !usuario ) {
                console.log('No se encontro el usuario');
                return false;
            }

            pathViejo = `./uploads/usuarios/${ usuario.img }`;
            borrarImagen( pathViejo );

            usuario.img = nombreArchivo;
            await usuario.save();
            return true;
            break;
    
        default:
            break;
    }
}

module.exports = { actualizarImagen }