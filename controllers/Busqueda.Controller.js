

const { response }   = require('express');

const Usuario        = require('../models/Usuario.Model');
const Medico         = require('../models/Medico.Model');
const Hospital       = require('../models/Hospital.Model');

const controller     = {};

controller.consult = async ( req, res = response  ) => {

    const todo  = req.params.todo;
    const regex = new RegExp( todo, 'i')
   
    const [ usuarios, medicos, hospitales ] = await Promise.all([
        Usuario.find ({ nombre: regex }),
        Medico.find  ({ nombre: regex }),
        Hospital.find({ nombre: regex })
    
    ]); 

   res.json({
       ok: true,
       usuarios,
       medicos,
       hospitales,
       uid  : req.uid
   })
}

controller.consultColeccion = async ( req, res = response  ) => {

    const tabla    = req.params.tabla;
    const busqueda = req.params.busqueda;
    const regex = new RegExp( busqueda, 'i')
    let data = [];

    switch ( tabla ) {
        case 'medicos':
            data = await Medico.find({ nombre: regex });
            break;

        case 'usuarios':
           data = await Usuario.find({ nombre: regex });
            break;

        case 'hospitales':
            data = await Hospital.find({ nombre: regex });
            break;
    
        default:
            return res.status( 400 ).json({
                ok   :  false,
                msg  :  'La tabla tiene que ser usuario/medicos/hospitales'
            })
            break;
    }

    res.json({
        ok         :  true,
        msg        :  '',
        resultado  :  data
    })
   

}


module.exports = controller; 

