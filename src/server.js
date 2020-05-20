const express = require('express');
const morgan = require('morgan');
const app = express();


//configuraciones

app.set('port', process.env.PORT || 3000);


// Middlewares
app.use(express.json());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false })); //para recibir datos livianos, para imagenes es otro


//Routes
app.use('/api', require('./routes/rutas'));


//Iniciando el servidor
app.listen(app.get('port'),
    () => {
        console.log(`Servidor levantado en el puerto ${app.get('port')}`);
    }
);
