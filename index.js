

const express = require( 'express' );
const  cors = require('cors');
require('dotenv').config();


const { dbConnection } = require('./database/config')

// Crear el servidor de express

const app = express();

// configurar const 

app.use(cors());

// base de datos

dbConnection();


app.listen( process.env.PORT, () => {
    console.log( 'Servidor corriendo en el puerto ' + process.env.PORT );
});

app.get( '/', ( req, res ) => {
    res.json({
        ok: true
    })
})

console.log('index.js');