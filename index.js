

const  express = require( 'express' );
const  cors = require('cors');

require('dotenv').config();


const { dbConnection } = require('./database/config');
const { populate } = require('./models/Usuario.Model');

// Crear el servidor de express
const app = express();

// Configurar CORS
app.use( cors() );

// Lectura y parseo del body
app.use( express.json() );

// Base de datos
dbConnection();

app.use( express.static('public') )

// rutas 
app.use( '/api', require('./routes/index'));


app.listen( process.env.PORT, () => {
    console.log( 'Servidor corriendo en el puerto ' + process.env.PORT );
});


