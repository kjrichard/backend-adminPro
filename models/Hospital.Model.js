
const { Schema, model } = require('mongoose');

const HospitalSchema = Schema({
    nombre: {
        type     : String,
        requireed: true
    },
   
    img: {
        type    :  String
    },
    usuario: {
        type     : Schema.Types.ObjectId,
        ref      : 'Usuario',
        required  : true,
    },
   
    
}, { collection: 'hospitales' });

HospitalSchema.method('toJSON', function() {
    const { __v,  _id, ...object } = this.toObject();

    object.uid = _id;
    return object;
})


module.exports = model( 'Hospital', HospitalSchema );