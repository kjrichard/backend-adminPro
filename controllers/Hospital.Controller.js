

const { response }   = require('express');

const Hospital       = require('../models/Hospital.Model'); 
const controller     = {};

controller.consult = async ( req, res = response  ) => {

   const hospitales = await Hospital.find({}, 'nombre img medico usuario');
   res.json({
       ok: true,
       hospitales,
       uid  : req.uid
   });
}

controller.create = async ( req, res ) => {

    const hospital = new Hospital({
        usuario: req.uid,
        ...req.body
    });

    try {
        const hospitalDB = await hospital.save();

        res.json({
            ok: true,
            hospitalDB
        });

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

        const hospitalDB = Hospital.findById( uid );
        
        if ( !hospitalDB ) {
            return res.status( 404 ).json({
                ok  :  false,
                mesg:  'No existe el hospital',
            });
        }

        const hospitalActualizado = await Hospital.findByIdAndUpdate( uid, ...req.body, { new: true } );

        res.json({
            ok: true,
            hospitalActualizado
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
        const hospitalDB = await Hospital.findById( uid );

        if ( !hospitalDB ) {
            
            return res.status( 404 ).json({
                ok   :  false,
                msg  :  'El hospital no existe'
            });
        }

        await Hospital.findByIdAndDelete( uid );

        res.json({
            ok   :  false,
            msg  :  'Hospital eliminado'
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

