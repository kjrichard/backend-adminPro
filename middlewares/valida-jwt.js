const jwt = require('jsonwebtoken')

const validarJWT = ( req, res, next ) => {

    const token = req.header('x-token');

    if ( !token ) {
        return res.status( 401 ).json({
            ok   :  false,
            msg  :  'No hay token en la peticion'
        });
    }

    try {

        const { uid } = jwt.verify( token, process.env.JWT_SECRET );
        console.log( uid );
        
    } catch (error) {
        console.log( error );
        return res.status( 401 ).json({
            ok   :  false,
            msg  :  'Token no valido'
        });
    }

    console.log( token );

    next();
}

module.exports = validarJWT;