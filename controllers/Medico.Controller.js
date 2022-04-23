

const { response }   = require('express');

const Medico        = require('../models/Medico.Model'); 
const controller     = {};

controller.consult = async ( req, res = response  ) => {

   const medicos = await Medico.find({}, 'nombre img hospital usuario')
                                    .populate('usuario', 'nombre img')
                                    .populate('hospital', 'nombre img ');
   res.json({
       ok: true,
       medicos,
       uid  : req.uid
   })
}

controller.create = async ( req, res ) => {

    const medico = new Medico({
        usuario: req.uid,
        ...req.body
    });

    try {

        const medicoDB = await medico.save();

        res.json({
            ok : true,
            medicoDB
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
        const campos = req.body;

        const medicoDB = Medico.findById( uid );
        
        if ( !medicoDB ) {
            return res.status( 404 ).json({
                ok  :  false,
                mesg:  'No existe el medico',
                
            })
        }

        const medicoActualizado = await Medico.findByIdAndUpdate( uid, campos, { new: true } );

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
        const medicoDB = await Medico.findById( uid );

        if ( !medicoDB ) {
            
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

