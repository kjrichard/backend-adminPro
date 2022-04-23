
const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    nombre: {
        required  : true,
        type     : String
    },
    email: {
        required  : true,
        type     : String,
        unique   : true
    },
    password: {
        required  : true,
        type     : String
    },
    img: {
        type    :  String
    },
    role: {
        required  : true,
        type     : String,
        default  : 'USER_ROLE'
    },
    google: {
        type     : Boolean,
        default  : false
    },
    
});

UsuarioSchema.method('toJSON', function() {
    const { __v, _id, password, ...object } = this.toObject();

    object.uid = _id;
    return object;
})


module.exports = model( 'Usuario', UsuarioSchema );